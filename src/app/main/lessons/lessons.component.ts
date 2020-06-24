import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Subject } from 'rxjs';
import {User} from '../../_models';
import {FuseTranslationLoaderService} from '../../../@fuse/services/translation-loader.service';
import {AuthenticationService, UserService} from '../../_services';
import {locale as english} from '../sample/i18n/en';
import {locale as turkish} from '../sample/i18n/tr';
import {first} from 'rxjs/operators';
import {Lesson} from '../../fake-db/Lessons';
import {LessonService} from './lesson.service';

@Component({
    selector   : 'lessons',
    templateUrl: './lessons.component.html',
    styleUrls  : ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit, OnDestroy
{
    form: FormGroup;
    lessons: any[];
    lessonphrases: any[];
    selectedLessonId: number;
    userTranslationAnswer: String;


    private _unsubscribeAll: Subject<any>;

    loading = false;
    currentUser: User;
    userFromApi: User;
    currentphrase = {textRus: '', textEng: ''};

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param lessonservice
     * @param _fuseTranslationLoaderService
     * @param userService
     * @param authenticationService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private lessonservice: LessonService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private userService: UserService,
        private authenticationService: AuthenticationService,

    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.currentUser = this.authenticationService.currentUserValue;

        // this.selectForm = new FormGroup({
        // idSelectedlesson: this.idSelectedLessonControl
        // });
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
        this.getAllLessons();
    }
    getAllLessons() {
        this.lessonservice.getLessons().subscribe((data: any[]) => {
            this.lessons = data;
        });
    }
    setNameLesson() {
        this.lessonservice.getPhrases(this.selectedLessonId).subscribe((data: any) => {
             this.lessonphrases = data;
        });
    }

    startLesson() {
        //for (let i = 0; i < this.lessonphrases.length; i++) {
            this.currentphrase = this.lessonphrases[0];
            console.log(this.currentphrase);
            this.userTranslationAnswer = '';
        //}
        
    }

    checkUserAnswer() {
        if (this.userTranslationAnswer == this.lessonphrases[0].textEng) {
            alert('Yes!');
        }
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