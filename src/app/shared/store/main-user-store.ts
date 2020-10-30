import {Injectable} from '@angular/core';
import {Store} from './store';
import {MainUser} from '../interfaces/main-user';

export class MainUserState {
    mainUser: MainUser = {} as MainUser;
}

@Injectable({
    providedIn: 'root'
})
export class MainUserStore extends Store<MainUserState> {

    constructor() {
        super(new MainUserState());
    }

    update(user: MainUser) {
        const newState = {...this.state, mainUser: user};
        this.setState(newState);
    }
}
