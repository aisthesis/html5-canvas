require.config({
    baseUrl: '.',

    paths: {
        'jquery': '../lib/jquery-2.0.3.min',
        'bootstrap': '../lib/bootstrap-3.0.0/js/bootstrap.min',
        'underscore': '../lib/underscore-1.5.2.min',
        'backbone': '../lib/backbone-1.1.0.min',
        'Rectangle': '../usr/draw/rectangle',
        'Circle': '../usr/draw/circle',
        'Shape': '../usr/draw/shape',
        'Point': '../usr/draw/point',
        'extend': '../usr/extend',
        'canvasUtils': '../usr/draw/canvas-utils',
        'countryRoadView': 'scripts/views/country-road-view',
        'rectanglesView': 'scripts/views/rectangles-view',
        'imageManipView': 'scripts/views/image-manip-view',
        'archOrigView': 'scripts/views/arch-orig-view',
        'archModifiedView': 'scripts/views/arch-modified-view',
        'sunglassesView': 'scripts/views/sunglasses-view'
    },

    shim: {
        'rectanglesView': ['Rectangle'],
        'Rectangle': ['Shape', 'Point'],
        'Circle': ['Shape', 'Point'],
        'Point': ['extend'],
        'Shape': ['extend'],
        'countryRoadView': ['backbone'],
        'backbone': ['underscore', 'jquery'],
        'bootstrap': ['jquery'],
        'imageManipView': ['backbone'],
        'archOrigView': ['backbone'],
        'archModifiedView': ['backbone'],
        'sunglassesView': ['backbone', 'Circle']
    }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'countryRoadView',
        'rectanglesView', 'Point', 'Shape', 'Rectangle', 'Circle', 'imageManipView',
        'archOrigView', 'archModifiedView', 'canvasUtils', 'sunglassesView'], 
    function($, bootstrap, _, Backbone, countryRoadView,
        rectanglesView, Point, Shape, Rectangle, Circle, imageManipView,
        archOrigView, archModifiedView, canvasUtils, sunglassesView) {
        var _countryRoadView = new codeMelon.games.CountryRoadView({
                el: '#country-road'
            }),
            _rectanglesView = new codeMelon.games.RectanglesView({
                el: '#rectangles'
            }),
            _imageManipView = new codeMelon.games.ImageManipView({
                el: '#image-manip'
            }),
            _sunglassesView = new codeMelon.games.SunglassesView({
                el: '#sunglasses'
            }); 
    });
