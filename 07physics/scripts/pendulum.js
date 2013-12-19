var _c = _c || {};
_c.path = _c.path || {};
_c.path.usr = '../usr/';
_c.path.images = '../common/';

require.config({
    baseUrl: '.',

    paths: {
        'pendulumView': 'scripts/views/pendulum-view',
        'jquery': '../lib/jquery-2.0.3.min',
        'bootstrap': '../lib/bootstrap-3.0.0/js/bootstrap.min',
        'underscore': '../lib/underscore-1.5.2.min',
        'Backbone': '../lib/backbone-1.1.0.min',
        'draw': '../usr/draw/main'
    },

    shim: {
        'pendulumView': ['Backbone'],
        'Backbone': ['underscore', 'jquery'],
        'bootstrap': ['jquery']
    }
});

require(['jquery', 'bootstrap', 'underscore', 'Backbone', 'draw', 'pendulumView'], 
    function($, bootstrap, _, Backbone, draw, pendulumView) {
        'use strict';
        _c.app.main = {};
        _c.app.main.pendulumView = new _c.app.views.PendulumView({
            el: '#pendulum'
        }); 
    });
