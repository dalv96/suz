modules.define('form', ['i-bem-dom', 'jquery', 'location', 'input'],
    function(provide, bemDom, $, location, Input, Form) {

        provide(Form.declMod({ modName: 'type', modVal: 'login'},
            {
                onSetMod: {
                    status: {
                        incorrect: function () {
                            console.log('somedata');
                        }
                    }
                },

                _onSubmit: function (e) {
                    e.preventDefault();
                    var inputs = this.findChildBlocks(Input);
                    var form = this;
                    form.delMod('status', 'incorrect');

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
                            location.change({ url: res.url });
                            window.location = res.url;
                            return;
                        },
                        error: function (res) {
                            form.setMod('status', 'incorrect');
                        }
                    });
                }
            },
            {

            })
        );
});
