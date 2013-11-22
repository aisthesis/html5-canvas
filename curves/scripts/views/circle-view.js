var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    "use strict";
    _cg.CircleView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants'
            );

            this.setConstants(options);
            this.render();
        },

        render: function() {
            var circle = new _c.draw.Circle({
                    center: new _c.draw.Point(this.el.width / 2, this.el.height / 2),
                    radius: this.el.width / 4,
                    fillStyle: 'cornflowerblue',
                    strokeStyle: 'goldenrod',
                    lineWidth: 8
                });

            circle.draw(this.CONTEXT);
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
        }
    });
})(codeMelon.games);
