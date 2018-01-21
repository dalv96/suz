block('header').content()(function() {
    var user = this.data.user;
    var ret = [
        {
            block: 'link',
            url: '/',
            content: [
                {
                    block: 'image',
                    url: '/home.svg'
                }
            ],
            mix: 'header__link'
        },
        {
            block: 'link',
            url: '/search',
            content: 'Поиск заказов',
            mix: 'header__link'
        },
        {
            block: 'link',
            url: '/status',
            content: 'Статус',
            mix: 'header__link'
        }];

    if (user.department.type == 'admin')
        ret.push({
            block: 'dropdown',
            mods: {
                switcher: 'link',
                theme: 'islands',
                sime: 'l'
            },
            mix: 'header__link',
            switcher: 'Администрирование',
            popup: [
                {
                    block: 'link',
                    url: '/admin/users',
                    mods: {
                        theme: 'islands',
                        size: 'l'
                    },
                    content: 'Учетные записи',
                    mix: 'header__dropdown-link'
                },
                {
                    block: 'link',
                    url: '/admin/department',
                    mods: {
                        theme: 'islands',
                        size: 'l'
                    },
                    content: 'Отделы',
                    mix: 'header__dropdown-link'
                },
                {
                    block: 'link',
                    url: '/admin/cities',
                    mods: {
                        theme: 'islands',
                        size: 'l'
                    },
                    content: 'Города',
                    mix: 'header__dropdown-link'
                },
                {
                    block: 'link',
                    url: '/admin/streets',
                    mods: {
                        theme: 'islands',
                        size: 'l'
                    },
                    content: 'Улицы',
                    mix: 'header__dropdown-link'
                },
                {
                    block: 'link',
                    url: '/admin/clients',
                    mods: {
                        theme: 'islands',
                        size: 'l'
                    },
                    content: 'Клиенты',
                    mix: 'header__dropdown-link'
                },
                {
                    block: 'link',
                    url: '/admin/providers',
                    mods: {
                        theme: 'islands',
                        size: 'l'
                    },
                    content: 'Провайдеры',
                    mix: 'header__dropdown-link'
                },
                {
                    block: 'link',
                    url: '/admin/holidays',
                    mods: {
                        theme: 'islands',
                        size: 'l'
                    },
                    content: 'Выходные',
                    mix: 'header__dropdown-link'
                }
            ]
        });

    ret.push({
        block: 'link',
        url: '/',
        content: 'Выход',
        mix: 'header__link',
        float: 'right'
    })
    
    ret.push({
        block: 'link',
        url: '/',
        content: 'admin',
        mix: 'header__link',
        float: 'right'
    });

    return ret;

})
