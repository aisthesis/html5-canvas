var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.ExplosionContainerView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
        },

        render: function() {
        },

        setConstants: function(options) {
            this.BOMB_WIDTH = 180;
            this.BOMB_HEIGHT = 130;
        },

        initMembers: function(options) {
            this.explosionView = new _c.app.views.ExplosionView({
                el: '#explosion'
            });
        }
    });
})(_c.app.views);
