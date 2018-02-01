({
    shouldDeps: [
        {
            block: 'body',
            mods: {
                view: [
                    'users',
                    'clients',
                    'providers',
                    'cities',
                    'streets',
                    'departments'
                ]
            }
        },
        {
            block: 'wrap',
            mods: {
                type: 'handbook'
            }
        },
        {
            block: 'title',
            elems: ['search', 'name', 'action', 'cell']
        },
        {
            block: 'table',
            mods: {
                type: ['users']
            }
        },
        {
            block: 'input',
            mods: {
                theme: 'islands',
                'has-clear': true,
                width: 'available'
            }
        }
    ]
})
