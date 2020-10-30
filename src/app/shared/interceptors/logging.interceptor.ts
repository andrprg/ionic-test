import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpResponse} from '@angular/common/http';
import {finalize, tap} from 'rxjs/operators';
import {AlertController, LoadingController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

    private componentName: string;

    constructor(
        public activateRoute: ActivatedRoute,
    ) {
        this.componentName = this.activateRoute.children[0].snapshot.routeConfig.path;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const startTime = Date.now();
        let status: string;

        return next.handle(req).pipe(
            tap(
                event => {
                    status = '';
                    if (event instanceof HttpResponse) {
                        status = 'succeeded';
                    }
                },
                error => status = 'failed: (' + error + ')'
            ),
            finalize(() => {
                const elapsedTime = Date.now() - startTime;
                const message = this.componentName + '=>' + req.method + ' ' + req.urlWithParams + ' ' + status
                    + ' in ' + elapsedTime + 'ms';

                this.logDetails(message);
            })
        );
    }

    private logDetails(msg: string) {
        console.log(msg);
    }
}
