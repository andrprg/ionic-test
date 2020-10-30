import {TestBed} from '@angular/core/testing';

import {CommonService} from './common.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('CommonService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpClientTestingModule);
    });

    it('should be created', () => {
        const service: CommonService = TestBed.get(CommonService);
        expect(service).toBeTruthy();
    });

    it('получение количества параметроа (HttpParams)', () => {
        const service: CommonService = TestBed.get(CommonService);
        const options = {key1: 1, key2: 2, key3: 3};
        expect(service.getHttpParams(options).params.keys().length).toEqual(3);
    });

    it('получение параметроа. Передаем пустой объект (HttpParams)', () => {
        const service: CommonService = TestBed.get(CommonService);
        const options = {};
        expect(service.getHttpParams(options).params.keys().length).toEqual(0);
    });


    it('получение параметроа. Передаем не объект (HttpParams)', () => {
        const service: CommonService = TestBed.get(CommonService);
        const options = null;
        expect(service.getHttpParams(options).params.keys().length).toEqual(0);
    });

});
