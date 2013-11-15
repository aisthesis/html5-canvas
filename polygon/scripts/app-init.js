var app = app || {};

(function(_cg) {
    "use strict";
    app.basicPolygonView = new _cg.BasicPolygonView({
        el: $('#basic-polygon')
    });
    app.draggablePolygonView = new _cg.DraggablePolygonView({
        el: $('#draggable-polygon')
    });
})(codeMelon.games);
