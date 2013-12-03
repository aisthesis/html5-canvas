var _c = _c || {};
_c.path = _c.path || {};
_c.path.usr = '../usr/';

require.config({
    baseUrl: '.',

    paths: {
        'discsView': 'scripts/views/discs-view',
        'scrollBgView': 'scripts/views/scroll-bg-view',
        'jquery': '../lib/jquery-2.0.3.min',
        'bootstrap': '../lib/bootstrap-3.0.0/js/bootstrap.min',
        'underscore': '../lib/underscore-1.5.2.min',
        'Backbone': '../lib/backbone-1.1.0.min',
        'draw': '../usr/draw/main'
    },

    shim: {
        'discsView': ['Backbone', 'draw'],
        'scrollBgView': ['Backbone', 'draw'],
        'Backbone': ['underscore', 'jquery'],
        'bootstrap': ['jquery']
    }
});

require(['jquery', 'bootstrap', 'underscore', 'Backbone', 'draw', 
    'discsView', 'scrollBgView'], 
    function($, bootstrap, _, Backbone, draw, discsView, scrollBgView) {
        'use strict';
        _c.app.main = {};
        _c.app.main.discsView = new _c.app.views.DiscsView({
            el: '#discs'
        }); 
        _c.app.main.scrollBgView = new _c.app.views.ScrollBgView({
            el: '#scroll-bg'
        }); 
    });
