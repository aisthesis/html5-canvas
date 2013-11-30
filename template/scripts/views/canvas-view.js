var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.CanvasView = Backbone.View.extend({
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
            this.context.moveTo(0, 0);
            this.context.lineTo(this.el.width / 2, this.el.height);
            this.context.stroke();
        },

        setConstants: function(options) {
            // TODO
        },

        initMembers: function(options) {
            this.context = this.el.getContext('2d');
        }
    });
})(_c.app.views);
