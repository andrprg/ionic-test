import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../shared/services/users.service';
import {concat, forkJoin, Subscription} from 'rxjs';
import {UserConfig} from '../../shared/interfaces/user-config';
import {MainUser} from '../../shared/interfaces/main-user';
import {MainUserStore} from '../../shared/store/main-user-store';
import {UserConfigStore} from '../../shared/store/user-config-store';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    userConfig: UserConfig;
    userInfo: MainUser;
    subscriptionUserInfo: Subscription;
    subscriptionUserConfig: Subscription;

    user: { login: string, password: string, deviceID: string } =
        {
            login: 'appletest',
            password: 'qW87654321',
            deviceID: '3ecedbe0-64be-392f-39e9-5c794f30eb73'
        };

    constructor(
        private userService: UsersService,
        private mainUserStore: MainUserStore,
        private userConfigStore: UserConfigStore,
    ) {
    }

    ngOnInit() {
        this.subscriptionUserConfig = this.userConfigStore.state$.subscribe(state => {
            this.userConfig = state.userConfig;
        });
        this.subscriptionUserInfo = this.mainUserStore.state$.subscribe(state => {
            this.userInfo = state.mainUser;
        });

        /**
         * Делаем запросы на сервер
         */        
        concat(
            this.userService.auth(this.user),
            forkJoin([
                    this.userService.getUserConfig(),
                    this.userService.getUserInfo()
                ]
            )
        ).subscribe(result => {
            console.log('result: ', result);
        });
    }

}
