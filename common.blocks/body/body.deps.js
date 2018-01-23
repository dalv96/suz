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
            block: 'title',
            elems: ['search', 'name', 'action', 'cell']
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
