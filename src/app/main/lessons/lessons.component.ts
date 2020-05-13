import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Subject } from 'rxjs';
import {User} from '../../_models';
import {FuseTranslationLoaderService} from '../../../@fuse/services/translation-loader.service';
import {AuthenticationService, UserService} from '../../_services';
import {locale as english} from '../sample/i18n/en';
import {locale as turkish} from '../sample/i18n/tr';
import {first} from 'rxjs/operators';
import {SelectLessonService} from './select-lesson/select-lesson.service';

@Component({
    selector   : 'lessons',
    templateUrl: './lessons.component.html',
    styleUrls  : ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit, OnDestroy
{
    form: FormGroup;


    // Private
    private _unsubscribeAll: Subject<any>;

    loading = false;
    currentUser: User;
    userFromApi: User;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param _fuseTranslationLoaderService
     * @param userService
     * @param authenticationService
     */
    constructor(
        private _formBuilder: FormBuilder,

        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private userService: UserService,
        private authenticationService: AuthenticationService,

    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.currentUser = this.authenticationService.currentUserValue;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });

        // Reactive Form
        this.form = this._formBuilder.group({
            PhraseRepeat   : [
                {
                    value   : '0',
                    disabled: true
                }
            ],
            Learned   : [
                {
                    value   : '0',
                    disabled: true
                }
            ],
            PhraseErrors   : [
                {
                    value   : '0',
                    disabled: true
                }
            ],
            TotalErrors   : [
                {
                    value   : '0',
                    disabled: true
                }
            ],
            translation : ['']
        });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


}