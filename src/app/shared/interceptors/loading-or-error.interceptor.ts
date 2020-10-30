import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {NEVER, Observable, of, throwError} from 'rxjs';
import {AlertController, LoadingController} from '@ionic/angular';
import {catchError, map, finalize, tap, timeout, delay, exhaustMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

export class LoadingOrErrorInceptor implements HttpInterceptor {
    private loadingCalls = 0;
    private LOADING_TEXT = 'Загрузка...';
    private loadingMask: Promise<HTMLIonLoadingElement>;
    private componentName: string;


    constructor(
        public loadingCtrl: LoadingController,
        public activateRoute: ActivatedRoute,
        public alertController: AlertController,
    ) {
        this.componentName = this.activateRoute.children[0].snapshot.routeConfig.path;
    }

    showLoading() {
        this.loadingCalls++;
        if (this.loadingCalls === 1) {
            this.loadingMask = this.loadingCtrl.create({
                message: this.LOADING_TEXT
            });
            this.loadingMask.then(res => res.present());
        }
    }

    hideLoading() {
        this.loadingCalls--;
        if (this.loadingCalls < 1) {
            this.loadingMask.then(res => res.dismiss());
        }
    }

    handleError(error) {
        if (error.name === 'TimeoutError') {
            // console.log('Ошибка: Сервер не отвечает. Повторите попытку позже ', 'Компонент: ', this.componentName);
            this.generateAlert('Ошибка', 'Сервер не отвечает. Повторите попытку позже');
        } else {
            // console.log('Ошибка. ', 'Компонент: ', this.componentName, ' ', error);
            this.generateAlert('Ошибка', error);
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showLoading();
        return next.handle(req).pipe(
            delay(3000),
            timeout(20000),
            exhaustMap((value: HttpResponse<any>) => {
                return (value.body && value.body.success === false) ? throwError(value.body.error.message) : of(value);
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // console.log('Ошибка. ', 'Компонент: ', this.componentName, ' ', error);
                    this.generateAlert('Ошибка', error.message);
                } else {
                    this.handleError(error);
                    return throwError(error);
                }
            }),
            finalize(() => {
                this.hideLoading();
            })
        );
    }

    /**
     * Отображение сообщения
     */
    private generateAlert(header: string, message: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.alertController
                .create({
                    header,
                    message,
                    buttons: [{
                        text: 'OK',
                        handler: () => resolve(true)
                    }
                    ]
                })
                .then(alert => {
                    alert.present();
                });
        });
    }
}
