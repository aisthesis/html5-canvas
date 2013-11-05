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

        _this.CONTEXT.fillStyle = ('rgba(100,140,230,0.5)');
        _this.CONTEXT.strokeStyle = _this.CONTEXT.fillStyle;

        _this.CONTEXT.shadowColor = 'rgba(0,0,0,0.8)';
        _this.CONTEXT.shadowOffsetX = 12;
        _this.CONTEXT.shadowOffsetY = 12;
        _this.CONTEXT.shadowBlur = 15;

        _this.CONTEXT.beginPath();
        _this.CONTEXT.arc(256, 256, 150, 0, Math.PI * 2, false);
        _this.CONTEXT.arc(256, 256, 100, 0, Math.PI * 2, true);
        _this.CONTEXT.fill();
        _this.CONTEXT.stroke();
    },

    setConstants: function(options) {
        var _this = this;

        _this.CONTEXT = _this.el.getContext('2d');
    }
});
