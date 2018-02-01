modules.define('table__user', ['i-bem-dom'], function(provide, bemDom) {

provide(bemDom.declElem('table', 'user',
    {
        onSetMod: {
            js: {
                inited: function () {
                    this._domEvents(this).on('click', this._onClick);
                }
            }
        },

        _onClick : function (e) {
            window.location = `/admin/users/${this.params.login}`
        }
    },
    {

    })
);

});
