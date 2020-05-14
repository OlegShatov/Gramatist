import {InMemoryDbService} from 'angular-in-memory-web-api';


export class FakeDbService implements InMemoryDbService {
    createDb(): {} {
        return {
            lessons: [
                {
                    name: '0. Граматист',
                    id: 0
                },
                {
                    name: '1. Времена - Tenses',
                    id: 1
                },
                {
                    name: '1.1. Актив - Active',
                    id: 2
                }
            ],

            phrases: [
                {
                    id: 0,
                    textRus: 'Учить английский теперь легко',
                    textEng: 'Now it\'s easy to learn English',
                },
                {
                    id: 1,
                    textRus: 'Теперь Вы пишите и запоминаете всегда правильно',
                    textEng: 'Now you write and remember always properly',
                },
                {
                    id: 2,
                    textRus: 'Через практику Вы поймёте все правила',
                    textEng: 'You will grasp all the rules via practice',
                },
                {
                    id: 3,
                    textRus: 'Ему нравится классическая музыка',
                    textEng: 'He likes classical music',
                },
                {
                    id: 4,
                    textRus: 'Она поет очень красиво',
                    textEng: 'She sings very beautiful',
                },
                {
                    id: 5,
                    textRus: 'Он играет на гитаре каждый день',
                    textEng: 'He plays the guitar every day',
                },
                {
                    id: 6,
                    textRus: 'Ему нравится классическая музыка',
                    textEng: 'He likes classical music',
                },
                {
                    id: 7,
                    textRus: 'Она поет очень красиво',
                    textEng: 'She sings very beautiful',
                },
                {
                    id: 8,
                    textRus: 'Он играет на гитаре каждый день',
                    textEng: 'He plays the guitar every day',
                }
            ],

            lessonPhrases: [
                {
                    id: 0,
                    lessonId: 0,
                    phraseId: 0
                },
                {
                    id: 1,
                    lessonId: 0,
                    phraseId: 1
                },
                {
                    id: 2,
                    lessonId: 0,
                    phraseId: 2
                },
                {
                    id: 3,
                    lessonId: 1,
                    phraseId: 3
                },
                {
                    id: 4,
                    lessonId: 1,
                    phraseId: 4
                },
                {
                    id: 5,
                    lessonId: 1,
                    phraseId: 5
                },
                {
                    id: 6,
                    lessonId: 2,
                    phraseId: 6
                },
                {
                    id: 7,
                    lessonId: 2,
                    phraseId: 7
                },
                {
                    id: 8,
                    lessonId: 2,
                    phraseId: 8
                }
            ]
        };
    }
}
