var _c = _c || {};
_c.path = _c.path || {};
_c.path.usr = '../usr/';
_c.path.images = '../common/';

require.config({
    baseUrl: '.',

    paths: {
        'SimpleView': 'scripts/views/simple-view',
        'ClockView': 'scripts/views/clock-view',
        'BombView': 'scripts/views/bomb-view',
        'jquery': '../lib/jquery-2.0.3.min',
        'bootstrap': '../lib/bootstrap-3.0.0/js/bootstrap.min',
        'underscore': '../lib/underscore-1.5.2.min',
        'Backbone': '../lib/backbone-1.1.0.min',
        'draw': '../usr/draw/main'
    },

    shim: {
        'SimpleView': ['Backbone'],
        'ClockView': ['Backbone'],
        'BombView': ['Backbone'],
        'Backbone': ['underscore', 'jquery'],
        'bootstrap': ['jquery']
    }
});

require(['jquery', 'bootstrap', 'underscore', 'Backbone', 'draw', 
    'SimpleView', 'ClockView', 'BombView'], 
    function($, bootstrap, _, Backbone, draw, 
        SimpleView, ClockView, BombView) {
        'use strict';
        _c.app.main = {};
        _c.app.main.simpleView = new _c.app.views.SimpleView({
            el: '#simple'
        }); 
        _c.app.main.clockView = new _c.app.views.ClockView({
            el: '#clock'
        }); 
        _c.app.main.bombView = new _c.app.views.BombView({
            el: '#bomb'
        }); 
    });
