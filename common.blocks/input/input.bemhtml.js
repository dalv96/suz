block('input')(
    js()(function () {
        if(this.ctx.name) {
            if(this.ctx.js) {
                this.ctx.js.name = this.ctx.name;
            } else {
                this.ctx.js = {
                    name: this.ctx.name
                };
            }
        }
        return this.ctx.js;
    })
)
