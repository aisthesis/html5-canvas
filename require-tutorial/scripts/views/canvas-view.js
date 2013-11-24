var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    _cg.CanvasView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants'
            );

            this.setConstants(options);
            this.render();
        },

        render: function() {
            this.CONTEXT.moveTo(0, 0);
            this.CONTEXT.lineTo(this.el.width / 2, this.el.height);
            this.CONTEXT.stroke();
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
        }
    });
})(codeMelon.games);
