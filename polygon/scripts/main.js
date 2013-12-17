var _c = _c || {};
_c.path = _c.path || {};
_c.path.usr = '../usr/';

require.config({
    baseUrl: '.',

    paths: {
        'basicPolygonView': 'scripts/views/basic-polygon-view',
        'draggablePolygonView': 'scripts/views/draggable-polygon-view',
        'concavePolygonView': 'scripts/views/concave-polygon-view',
        'jquery': '../lib/jquery-2.0.3.min',
        'bootstrap': '../lib/bootstrap-3.0.0/js/bootstrap.min',
        'underscore': '../lib/underscore-1.5.2.min',
        'Backbone': '../lib/backbone-1.1.0.min',
        'draw': '../usr/draw/main'
    },

    shim: {
        'basicPolygonView': ['Backbone', 'draw'],
        'draggablePolygonView': ['Backbone', 'draw'],
        'concavePolygonView': ['Backbone', 'draw'],
        'Backbone': ['underscore', 'jquery'],
        'bootstrap': ['jquery']
    }
});

require(['jquery', 'bootstrap', 'underscore', 'Backbone', 'draw', 
        'basicPolygonView', 'draggablePolygonView', 'concavePolygonView'], 
        function($, bootstrap, _, Backbone, draw, basicPolygonView, draggablePolygonView,
        concavePolygonView) {
    'use strict';
    _c.app.main = {};
    _c.app.main.basicPolygonView = new _c.app.views.BasicPolygonView({
        el: '#basic-polygon'
    }); 
    _c.app.main.draggablePolygonView = new _c.app.views.DraggablePolygonView({
        el: '#draggable-polygon'
    }); 
    _c.app.main.concavePolygonView = new _c.app.views.ConcavePolygonView({
        el: '#concave-polygon'
    }); 
});
