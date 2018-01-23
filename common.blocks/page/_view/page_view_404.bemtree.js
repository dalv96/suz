block('page').mod('view', '404').content()(function() {
    return [
        {
            block: 'header'
        },
        'Такой страницы не существует!'
    ];
});
