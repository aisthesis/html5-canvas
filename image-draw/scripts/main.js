require.config({
    baseUrl: '.',

    paths: {
        'jquery': '../lib/jquery-2.0.3.min',
        'bootstrap': '../lib/bootstrap-3.0.0/js/bootstrap.min',
        'underscore': '../lib/underscore-1.5.2.min',
        'backbone': '../lib/backbone-1.1.0.min',
        'Rectangle': '../usr/draw/rectangle',
        'Shape': '../usr/draw/shape',
        'Point': '../usr/draw/point',
        'extend': '../usr/extend',
        'canvasUtils': '../usr/draw/canvas-utils',
        'countryRoadView': 'scripts/views/country-road-view',
        'rectanglesView': 'scripts/views/rectangles-view',
        'imageManipView': 'scripts/views/image-manip-view',
        'archOrigView': 'scripts/views/arch-orig-view',
        'archModifiedView': 'scripts/views/arch-modified-view'
    },

    shim: {
        'rectanglesView': ['Rectangle'],
        'Rectangle': ['Shape', 'Point'],
        'Point': ['extend'],
        'Shape': ['extend'],
        'countryRoadView': ['backbone'],
        'backbone': ['underscore', 'jquery'],
        'bootstrap': ['jquery'],
        'imageManipView': ['backbone'],
        'archOrigView': ['backbone'],
        'archModifiedView': ['backbone']
    }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'countryRoadView',
        'rectanglesView', 'Point', 'Shape', 'Rectangle', 'imageManipView',
        'archOrigView', 'archModifiedView', 'canvasUtils'], 
    function($, bootstrap, _, Backbone, countryRoadView,
        rectanglesView, Point, Shape, Rectangle, imageManipView,
        archOrigView, archModifiedView, canvasUtils) {
        var _countryRoadView = new codeMelon.games.CountryRoadView({
                el: '#country-road'
            }),
            _rectanglesView = new codeMelon.games.RectanglesView({
                el: '#rectangles'
            }),
            _imageManipView = new codeMelon.games.ImageManipView({
                el: '#image-manip'
            }); 
    });
