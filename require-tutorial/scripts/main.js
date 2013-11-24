require.config({
    baseUrl: '.',

    paths: {
        'jquery': '../lib/jquery-2.0.3.min',
        'bootstrap': '../lib/bootstrap-3.0.0/js/bootstrap.min',
        'jquery-ui': '../lib/jquery-ui-1.10.3.min',
        'underscore': '../lib/underscore-1.5.2.min',
        'backbone': '../lib/backbone-1.1.0.min',
        'canvas-view': 'scripts/views/canvas-view',
        'app-init': 'scripts/app-init'
       
    }
});

require(['jquery', 'bootstrap', 'jquery-ui', 'underscore', 'backbone', 'canvas-view', 'app-init'], 
    function() {
    });
