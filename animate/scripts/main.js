require.config({
    baseUrl: '.',

    paths: {
        'discsView': 'scripts/views/discs-view',
        'jquery': '../lib/jquery-2.0.3.min',
        'bootstrap': '../lib/bootstrap-3.0.0/js/bootstrap.min',
        'underscore': '../lib/underscore-1.5.2.min',
        'Backbone': '../lib/backbone-1.1.0.min',
        'draw': '../usr/draw/main'
    },

    shim: {
        'discsView': ['Backbone'],
        'Backbone': ['underscore', 'jquery'],
        'bootstrap': ['jquery']
    }
});

require(['jquery', 'bootstrap', 'underscore', 'Backbone', 'draw', 'discsView'], 
    function($, bootstrap, _, Backbone, draw, discsView) {
        'use strict';
        _c.app.main = {};
        _c.app.main.discsView = new _c.app.views.DiscsView({
            el: '#discs'
        }); 
    });