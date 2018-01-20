block('header').elem('link')(
    mix()(function () {
        var ctx = this.ctx;
        
        if(ctx.float == 'right') {
            return ['header__link', 'header__link_float_right']
        } else return ['header__link'];
    })
)
