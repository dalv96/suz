modules.define('form', ['i-bem-dom', 'jquery', 'input'], function(provide, bemDom, $, Input) {

provide(bemDom.declBlock('form',
    {
        onSetMod: {
            js: {
                inited: function () {
                    this._domEvents(this).on('submit', function(e) {
                        console.log(e);
                        e.preventDefault();
                    })
                }
            }
        }
    },
    {

    })
);

});
