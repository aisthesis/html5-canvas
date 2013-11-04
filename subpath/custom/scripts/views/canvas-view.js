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

        _this.CONTEXT.beginPath();
        _this.CONTEXT.rect(10, 10, 100, 100);
        //_this.CONTEXT.stroke();


        //_this.CONTEXT.beginPath();
        _this.CONTEXT.rect(50, 50, 100, 100);
        _this.CONTEXT.stroke();
    },

    setConstants: function(options) {
        var _this = this;

        _this.CONTEXT = _this.el.getContext('2d');
    }
});
