require.config({
    baseUrl: '.',

    paths: {
        'canvas-view': 'scripts/views/canvas-view',
        'jquery': '../lib/jquery-2.0.3.min',
        'bootstrap': '../lib/bootstrap-3.0.0/js/bootstrap.min',
        'underscore': '../lib/underscore-1.5.2.min',
        'backbone': '../lib/backbone-1.1.0.min'
    },

    shim: {
        'canvas-view': ['backbone'],
        'backbone': ['underscore', 'jquery'],
        'bootstrap': ['jquery']
    }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'canvas-view'], 
    function($, bootstrap, _, Backbone, cv) {
        var canvasView = new codeMelon.games.CanvasView({
            el: '#game-canvas'
        }); 
    });
