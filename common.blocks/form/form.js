modules.define('form', ['i-bem-dom'], function(provide, bemDom) {

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
            console.warn('_onSubmit() by default');
        }
    },
    {

    })
);

});
