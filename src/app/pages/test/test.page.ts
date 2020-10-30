import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-test',
    templateUrl: './test.page.html',
    styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

    1;

    constructor(
        private commonService: CommonService
    ) {
    }

    ngOnInit() {
        forkJoin([
            this.commonService.get('getUserConfig'),
            this.commonService.get('getConfigurationsListNew'),
            this.commonService.get('getOrganizationList'),
        ])
            .subscribe(data => console.log(data));
    }

}
