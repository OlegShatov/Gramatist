import {InMemoryDbService} from 'angular-in-memory-web-api';


export class FakeDbService implements InMemoryDbService {
    createDb() {
        const lessons = [
            {
                id: 0,
                name: '0. Граматист',
                phrases: [
                    {
                        ru: 'Учить английский теперь легко',
                        en: 'Now it\'s easy to learn English'

                    },
                    {
                        ru: 'Теперь Вы пишите и запоминаете всегда правильно',
                        en: 'Now you write and remember always properly'
                    },
                    {
                        ru: 'Через практику Вы поймёте все правила',
                        en: 'You will grasp all the rules via practice'
                    }]
            },
            {
                id: 1,
                name: '1.1. Present',
                phrases: [
                    {
                        ru: 'Ему нравится классическая музыка',
                        en: 'He likes classical music'
                    },
                    {
                        ru: 'Она поет очень красиво',
                        en: 'She sings very beautiful'
                    },
                    {
                        ru: 'Он играет на гитаре каждый день',
                        en: 'He plays the guitar every day'
                    }]
            },
            {
                id: 2,
                name: '1.2. Past',
                phrases: [
                    {
                        ru: 'Она сделала это наконец',
                        en: 'She did it at last'
                    },
                    {
                        ru: 'Кто открыл Америку?',
                        en: 'Who discovered America?'
                    },
                    {
                        ru: 'Я был действительно удивлен',
                        en: 'I was really surprised'
                    }]
            }
        ];

        return {
            lessons: lessons
        };
    }
}
