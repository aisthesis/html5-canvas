var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    "use strict";
    _cg.BasicPolygonView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants'
            );

            this.setConstants(options);
            this.render();
        },

        render: function() {
            var polygon = new Polygon({
                center: new Point(this.el.width / 2, this.el.height / 2),
                radius: this.el.width / 4,
                sides: 8,
                angle: Math.PI / 2,
                fillStyle: 'cornflowerblue',
                strokeStyle: 'goldenrod',
                lineWidth: 8
            });

            polygon.draw(this.CONTEXT);
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
        }
    });
})(codeMelon.games);
