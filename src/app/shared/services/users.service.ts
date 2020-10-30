import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {UserConfig} from '../interfaces/user-config';
import {ResposseData} from '../interceptors/response-data';
import {MainUser} from '../interfaces/main-user';
import {pluck, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MainUserStore} from '../store/main-user-store';
import {UserConfigStore} from '../store/user-config-store';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private commonService: CommonService,
        private mainUserStore: MainUserStore,
        private userConfigStore: UserConfigStore,
    ) {
    }

    auth(user) {
        return this.commonService.post<ResposseData<{ token: string }>>('getToken', user);
    }

    getUserConfig(): Observable<UserConfig> {
        return this.commonService.get<ResposseData<UserConfig>>('getUserConfig').pipe(
            pluck('data'),
            tap((data: UserConfig) => this.userConfigStore.update(data))
        );
    }

    getUserInfo(): Observable<MainUser> {
        return this.commonService.get<ResposseData<MainUser>>('getUserInfo').pipe(
            pluck('data'),
            tap((data: MainUser) => this.mainUserStore.update(data))
        );;
    }
}
