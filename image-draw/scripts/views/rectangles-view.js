var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    _cg.RectanglesView = Backbone.View.extend({
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
            var r1 = new _c.draw.Rectangle({
                    corner: new _c.draw.Point(4, 4), 
                    width: 64, 
                    height: 32
                }),
                r2 = new _c.draw.Rectangle({
                    corner: new _c.draw.Point(128, 128),
                    width: 64,
                    height: 128,
                    fillStyle: 'olive'
                }),
                r3 = new _c.draw.Rectangle({
                    corner: new _c.draw.Point(496, 496),
                    width: -256,
                    height: -128 * 3,
                    strokeStyle: 'red'
                });

            r1.draw(this.CONTEXT);
            r2.fill(this.CONTEXT);
            r3.stroke(this.CONTEXT);
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
        },

        initMembers: function(options) {
        }
    });
})(codeMelon.games);
