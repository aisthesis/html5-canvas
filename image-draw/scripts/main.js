require.config({
    baseUrl: '.',

    paths: {
        'jquery': '../lib/jquery-2.0.3.min',
        'bootstrap': '../lib/bootstrap-3.0.0/js/bootstrap.min',
        'underscore': '../lib/underscore-1.5.2.min',
        'backbone': '../lib/backbone-1.1.0.min',
        'countryRoadView': 'scripts/views/country-road-view'
    },

    shim: {
        'countryRoadView': ['backbone'],
        'backbone': ['underscore', 'jquery'],
        'bootstrap': ['jquery']
    }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'countryRoadView'], 
    function($, bootstrap, _, Backbone, crv) {
        var countryRoadView = new codeMelon.games.CountryRoadView({
            el: '#country-road'
        }); 
    });
