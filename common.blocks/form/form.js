modules.define('form', ['i-bem-dom', 'location', 'input'], function(provide, bemDom, location, Input) {

provide(bemDom.declBlock('form',
    {
        onSetMod: {
            js: {
                inited: function () {
                    this._domEvents(this).on('submit', this._onSubmit);
                }
            }
        },

        _onSubmit : function (e) {
            e.preventDefault();

            var inputs = this.findChildBlocks(Input);

            var data = {};

            inputs.forEach( item => {
                if(!item.params.name)
                    console.warn(`Отсутствует парметр name для следующих данных: "${item.getVal()}"`);
                else
                    data[item.params.name] = item.getVal();
            });

            $.ajax({
                url: this.params.url,
                type: "POST",
                data: data,
                success: function (res) {
                    if(res.url) location.change({ url: res.url });
                    return;
                },
                error: function (res) {
                    console.warn('error');
                }
            });
        }
    },
    {

    })
);

});
