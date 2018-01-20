block('header').content()(function() {
    var user = this.data.user;

    var navLinks = [
        {
            type: 'link',
            text: 'Главная',
            url: '/',
            access: !!user
        },
        {
            type: 'link',
            text: 'Поиск заявок',
            url: '/search',
            access: !!user
        },
        {
            type: 'link',
            text: 'Статус',
            url: '/status',
            access: !!user
        },
        {
            type: 'dropdown',
            text: 'Администрирование',
            // access: user && user.department.type == 'admin',
            access: !!user,
            popup: [
                {
                    type: 'link',
                    text: 'Учетные записи',
                    url: '/admin/users'
                },
                {
                    type: 'link',
                    text: 'Отделы',
                    url: '/admin/departments'
                },
                {
                    type: 'link',
                    text: 'Города',
                    url: '/admin/cities'
                },
                {
                    type: 'link',
                    text: 'Улицы',
                    url: '/admin/street'
                },
                {
                    type: 'link',
                    text: 'Клиенты',
                    url: '/admin/clients'
                },
                {
                    type: 'link',
                    text: 'Типы клиентов',
                    url: '/admin/client-types'
                },
                {
                    type: 'link',
                    text: 'Провайдеры',
                    url: '/admin/providers'
                },
                {
                    type: 'link',
                    text: 'Услуги',
                    url: '/admin/services'
                },
                {
                    type: 'link',
                    text: 'Выходные',
                    url: '/admin/holiday'
                }
            ]
        },
        {
            type: 'link',
            text: 'Выйти',
            float: 'right',
            url: '/logout',
            access: !!user
        },
        {
            type: 'link',
            // text: (user)?`${user.login} [${user.department.name}]`:'',
            text: (user)?user.login:'',
            float: 'right',
            url: '/profile',
            access: !!user
        }
        // {
        //     type: 'link',
        //     float: 'right',
        //     url: '/notifies',
        //     text: [
        //         (user && user.notifies>0)?`(${user.notifies})`:'',
        //         {
        //             block: 'icon',
        //             url: (user && user.notifies>0)?'/alarm.svg':'/alarm-empty.png',
        //             mix: (user && user.notifies>0)?'navigator__alarm':''
        //         }
        //     ],
        //     access: user
        // }
    ];

    var ret = [];

    navLinks.forEach( item => {
        if(item.access) {
            switch (item.type) {
                case 'link':
                    ret.push({
                        block: 'link',
                        mix: {
                            block: 'header',
                            elem: 'link'
                        },
                        float: item.float,
                        content: item.text,
                        url: item.url
                    })
                    break;
                case 'dropdown':
                    var links = [];
                    item.popup.forEach( it => {
                        links.push({
                            block: 'link',
                            mods: {
                                theme: 'islands',
                                size: 'l'
                            },
                            mix: 'header__dropdown-link',
                            url: it.url,
                            content: it.text
                        })
                    });
                    ret.push({
                        block: 'dropdown',
                        mods: {
                            switcher: 'link',
                            theme: 'islands',
                            sime: 'l'
                        },
                        mix: {
                            block: 'header',
                            elem: 'link',
                            float: item.float
                        },
                        switcher: item.text,
                        popup: links
                    })
                    break;
            }

        }
    });

    return ret;

})
