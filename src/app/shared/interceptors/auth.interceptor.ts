import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            headers: req.headers
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Token', localStorage.getItem('Token') ? localStorage.getItem('Token') : '')
        });

        return next.handle(clonedRequest).pipe(
            tap(data => {
                if (data instanceof HttpResponse) {
                    if (data.body.data.token) {
                        localStorage.setItem('Token', data.body.data.token);
                    }
                }
            })
        );
    }

}
