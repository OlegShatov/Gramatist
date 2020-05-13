import { FuseNavigation } from '@fuse/types';



const isAdmin = false;


export let navigation: FuseNavigation[];




if (isAdmin) {
    navigation = [
        {
            id: 'applications',
            title: 'Applications',
            translate: 'NAV.APPLICATIONS',
            type: 'group',
            icon: 'apps',
            children:
                [
                    {
                        id: 'dashboards',
                        title: 'Dashboards',
                        translate: 'NAV.DASHBOARDS',
                        type: 'collapsable',
                        icon: 'dashboard',
                        children: [
                            {
                                id: 'analytics',
                                title: 'Analytics',
                                type: 'item',
                                url: '/apps/dashboards/analytics'
                            },
                            {
                                id: 'project',
                                title: 'Project',
                                type: 'item',
                                url: '/apps/dashboards/project'
                            }
                        ]
                    },
                    {
                        id: 'calendar',
                        title: 'Calendar',
                        translate: 'NAV.CALENDAR',
                        type: 'item',
                        icon: 'today',
                        url: '/apps/calendar'
                    },
                    {
                        id: 'mail',
                        title: 'Mail',
                        translate: 'NAV.MAIL.TITLE',
                        type: 'item',
                        icon: 'email',
                        url: '/apps/mail',
                        badge: {
                            title: '25',
                            translate: 'NAV.MAIL.BADGE',
                            bg: '#F44336',
                            fg: '#FFFFFF'
                        }
                    },
                    {
                        id: 'chat',
                        title: 'Chat',
                        translate: 'NAV.CHAT',
                        type: 'item',
                        icon: 'chat',
                        url: '/apps/chat',
                        badge: {
                            title: '13',
                            bg: '#09d261',
                            fg: '#FFFFFF'
                        }
                    },
                    {
                        id: 'contacts',
                        title: 'Contacts',
                        translate: 'NAV.CONTACTS',
                        type: 'item',
                        icon: 'account_box',
                        url: '/apps/contacts'
                    },
                    {
                        id: 'to-do',
                        title: 'To-Do',
                        translate: 'NAV.TODO',
                        type: 'item',
                        icon: 'check_box',
                        url: '/apps/todo',
                        badge: {
                            title: '3',
                            bg: '#FF6F00',
                            fg: '#FFFFFF'
                        }
                    }
                ]
        }]
} else {
    navigation = [
        {
            id: 'lessons',
            title: 'Lessons',
            translate: 'NAV.LESSONS',
            type: 'item',
            icon: 'school',
            url: '/lessons'
        }
    ]
}
