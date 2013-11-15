var app = app || {};

(function(_cg) {
    "use strict";
    app.arcToView = new _cg.ArcToView({
        el: $('#arc-to')
    });
    app.checkboxView = new _cg.CheckboxView({
        el: $('#checkbox')
    });
    app.arrowView = new _cg.ArrowView({
        el: $('#arrow')
    });
    app.cubicView = new _cg.CubicView({
        el: $('#cubic')
    });
    app.circleView = new _cg.CircleView({
        el: $('#circle')
    });
})(codeMelon.games);
