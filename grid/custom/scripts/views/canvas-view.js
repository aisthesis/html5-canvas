var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

codeMelon.games.CanvasView = Backbone.View.extend({
    initialize: function(options) {
        var _this = this;

        _.bindAll(_this,
            'render',
            'setConstants',
            'drawGrid'
        );

        _this.setConstants(options);
        _this.render();
    },

    render: function() {
        var _this = this;

        _this.drawGrid('#ddd', 16);
    },

    setConstants: function(options) {
        var _this = this;

        _this.CONTEXT = _this.el.getContext('2d');
    },

    drawGrid: function(color, stepx, stepy) {
        var _this = this,
            _stepy = stepy || stepx,
            _width = _this.el.width,
            _height = _this.el.height,
            i;

        _this.CONTEXT.save();
        _this.CONTEXT.strokeStyle = color;
        _this.CONTEXT.lineWidth = 1;

        for (i = stepx + 0.5; i < _width; i += stepx) {
            _this.CONTEXT.beginPath();
            _this.CONTEXT.moveTo(i, 0);
            _this.CONTEXT.lineTo(i, _height);
            _this.CONTEXT.stroke()
        }
        for (i = _stepy + 0.5; i < _height; i += _stepy) {
            _this.CONTEXT.beginPath();
            _this.CONTEXT.moveTo(0, i);
            _this.CONTEXT.lineTo(_width, i);
            _this.CONTEXT.stroke()
        }
        _this.CONTEXT.restore();
    }
});
