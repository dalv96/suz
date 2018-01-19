modules.define('form', ['i-bem-dom', 'jquery', 'input'],
    function(provide, bemDom, $, Input, Form) {

        provide(Form.declMod({ modName: 'type', modVal: 'login'},
            {
                _onSubmit: function (e) {
                    e.preventDefault();
                }
            },
            {

            })
        );
});
