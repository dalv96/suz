block('table').mod('type', 'users').content()(function () {
    var users = this.ctx.users;

    var tbody = users.map( item => {
        return {
            block: 'table',
            elem: 'user',
            tag: 'tr',
            js: {
                login: item.login
            },
            content: [
                {
                    tag: 'td',
                    content: item.login
                },
                {
                    tag: 'td',
                    content: item.name
                },
                {
                    tag: 'td',
                    content: item.department.name
                }
            ]
        }
    });

    return [
        {
            tag: 'tr',
            content: [
                {
                    tag: 'th',
                    content: 'Логин'
                },
                {
                    tag: 'th',
                    content: 'Ф.И.О.'
                },
                {
                    tag: 'th',
                    content: 'Отдел'
                }
            ]
        },
        tbody
    ]
})
