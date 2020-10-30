import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {CommonService} from './services/common.service';
import {HttpClientModule} from '@angular/common/http';
import {MainUserStore} from './store/main-user-store';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule
    ],
    declarations: [],
    providers: [
        CommonService
    ]
})
export class SharedModule {
}
