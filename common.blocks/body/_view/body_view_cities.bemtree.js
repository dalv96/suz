block('body').mod('view', 'cities').content()(function () {
    return [
        {
            block: 'title',
            content: [
                {
                    block: 'title',
                    elem: 'cell',
                    content: [
                        {
                            block: 'title',
                            elem: 'name',
                            tag: 'h3',
                            content: 'Города'
                        }
                    ]
                },
                {
                    block: 'title',
                    elem: 'cell',
                    content: [{
                        block: 'button',
                        mix: {
                            block: 'title',
                            elem: 'action'
                        },
                        mods: {
                            theme: 'islands',
                            size: 'm'
                        },
                        text: 'Добавить город'
                    }]
                },
                {
                    block: 'title',
                    elem: 'cell',
                    mix: {
                        block: 'title',
                        elem: 'search'
                    },
                    content: [
                        {
                            block: 'input',
                            mods: {
                                theme: 'islands',
                                size: 'm',
                                'has-clear': true
                            },
                            placeholder: 'Поиск по справочнику'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'm'
                            },
                            text: 'Поиск'
                        }
                    ]
                }

            ]
        }
    ];
})
