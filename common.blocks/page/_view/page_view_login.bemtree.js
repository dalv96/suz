block('page').mod('view', 'login').content()(function () {
    return [
        {
            block: 'header',
            mods: {
                type: 'login'
            }
        },
        {
            block: 'form',
            mods: {
                type: 'login'
            },
            js: {
                url: '/login',
                method: 'POST'
            },
            content: [
                {
                    block: 'input',
                    mods: {
                        theme: 'islands',
                        size: 'xl',
                        to: 'send'
                    },
                    name: 'login',
                    placeholder: 'Логин'
                },
                {
                    block: 'input',
                    mods: {
                        theme: 'islands',
                        size: 'xl',
                        to: 'send',
                        type: 'password'
                    },
                    name: 'password',
                    placeholder: 'Пароль'
                },
                {
                    block: 'button',
                    mods: {
                        theme: 'islands',
                        size: 'xl',
                        type: 'submit'
                    },
                    text: 'Войти'
                }
            ]
        }
    ]
})
