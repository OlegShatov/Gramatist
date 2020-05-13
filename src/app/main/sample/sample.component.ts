import {Component, OnInit} from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import {User} from '../../_models';
import {AuthenticationService, UserService} from '../../_services';
import {first} from 'rxjs/operators';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{
    loading = false;
    currentUser: User;
    userFromApi: User;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param userService
     * @param authenticationService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private userService: UserService,
        private authenticationService: AuthenticationService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.currentUser = this.authenticationService.currentUserValue;
    }
    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
}
