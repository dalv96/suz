block('input')(
    addJs()(function () {
        if(this.ctx.name) {
            return {
                name: this.ctx.name
            };
        }
    })
)
