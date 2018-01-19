modules.define('form', ['i-bem-dom', 'jquery', 'location', 'input'],
    function(provide, bemDom, $, location, Input, Form) {

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
