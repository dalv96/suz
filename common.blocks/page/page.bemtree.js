block('page').content()(function() {
    return [
        {
            block: 'header'
        },
        {
            block: 'body',
            mods: {
                view: this.ctx.mods.view
            }
        },
        {
            block: 'footer'
        }
    ];
});
