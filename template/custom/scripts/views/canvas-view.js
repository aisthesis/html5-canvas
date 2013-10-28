var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

codeMelon.games.CanvasView = Backbone.View.extend({
    initialize: function(options) {
        var _this = this;

        _.bindAll(_this,
            'render',
            'setConstants'
        );

        _this.setConstants(options);
        _this.render();
    },

    render: function() {
        var _this = this;

        _this.CONTEXT.moveTo(0, 0);
        _this.CONTEXT.lineTo(_this.el.width / 2, _this.el.height);
        _this.CONTEXT.stroke();
    },

    setConstants: function(options) {
        var _this = this;

        _this.CONTEXT = _this.el.getContext('2d');
    }
});
