var app = app || {};

(function(_cg) {
    app.arcToView = new _cg.ArcToView({
        el: $('#arc-to')
    });
    app.checkboxView = new _cg.CheckboxView({
        el: $('#checkbox')
    });
})(codeMelon.games);
