import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    SERVE_URL = 'https://scloud.ru/api/api.php?Vapi=2.0&action=';

    constructor(
        private http: HttpClient
    ) {
    }

    getHttpParams<T extends object>(obj: T) {
        if (!obj) {
            return {params: new HttpParams()};
        }

        let params = new HttpParams();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                params = params.append(key, obj[key.toString()]);
            }
        }
        return params;
    }

    get<T>(url: string, options = null) {
        const params = this.getHttpParams(options);
        return this.http.get<T>(this.SERVE_URL + url);
    }

    post<T>(url: string, params, options = null) {
        const ob = this.getHttpParams(params);
        return this.http.post<T>(this.SERVE_URL + url, ob).pipe();
    }
}
