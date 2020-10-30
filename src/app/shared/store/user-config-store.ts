import {Injectable} from '@angular/core';
import {Store} from './store';
import {UserConfig} from '../interfaces/user-config';

export class UserConfigState {
    userConfig: UserConfig = {} as UserConfig;
}

@Injectable({
    providedIn: 'root'
})
export class UserConfigStore extends Store<UserConfigState> {
    constructor() {
        super(new UserConfigState());
    }

    update(user: UserConfig) {
        const newState = {...this.state, userConfig: user};
        this.setState(newState);
    }

}
