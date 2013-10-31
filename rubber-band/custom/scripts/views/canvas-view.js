var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

codeMelon.games.CanvasView = Backbone.View.extend({
    events: {
        "mousedown": "handleMouseDown"
    },

    initialize: function(options) {
        var _this = this;

        _.bindAll(_this,
            'render',
            'setConstants',
            'initVariables',
            'setListeners',
            'rubberBandStart',
            'rubberBandStretch',
            'rubberBandEnd',
            'moveRubberBand',
            'showRubberBand',
            'resizeRubberBand',
            'resetRubberBand',
            'handleMouseDown'
        );

        _this.setConstants(options);
        _this.initVariables(options);
        _this.setListeners(options);
        _this.render();
    },

    render: function() {
        var _this = this;

        _this.image.src = 'resources/images/arch.png';
        _this.CONTEXT.drawImage(_this.image, 0, 0, _this.el.width, _this.el.height);
    },

    setConstants: function(options) {
        var _this = this;

        _this.CONTEXT = _this.el.getContext('2d');
        _this.RUBBER_BAND_SELECTOR = '#rubber-band';
        _this.RESET_BTN_SELECTOR = '#reset-btn';
    },

    initVariables: function(options) {
        var _this = this;

        _this.image = new Image();
        _this.mousedown = {};
        _this.rubberBandRectangle = {};
        _this.dragging = false;
    },

    rubberBandStart: function(x, y) {
        var _this = this;

        _this.mousedown.x = x;
        _this.mousedown.y = y;
        _this.rubberBandRectangle.left = x;
        _this.rubberBandRectangle.right = y;

        _this.moveRubberBand();
        _this.showRubberBand();

        _this.dragging = true;
    },

    rubberBandStretch: function(x, y) {
        var _this = this;

        _this.rubberBandRectangle.left = x < _this.mousedown.x ? x : _this.mousedown.x;
        _this.rubberBandRectangle.top = y < _this.mousedown.y ? y : _this.mousedown.y;
        _this.rubberBandRectangle.width = Math.abs(x - _this.mousedown.x);
        _this.rubberBandRectangle.height = Math.abs(y - _this.mousedown.y);

        _this.moveRubberBand();
        _this.resizeRubberBand();
    },

    rubberBandEnd: function() {
        var _this = this,
            bbox = _this.el.getBoundingClientRect(),
            $rubberBand = $(_this.RUBBER_BAND_SELECTOR);

        try {
            _this.CONTEXT.drawImage(_this.el,
                                    _this.rubberBandRectangle.left - bbox.left,
                                    _this.rubberBandRectangle.top - bbox.top,
                                    _this.rubberBandRectangle.width,
                                    _this.rubberBandRectangle.height,
                                    0, 0, _this.el.width, _this.el.height);
        }
        catch (e) {
            console.log("an error occurred ending rubber band!");
        }
        _this.resetRubberBand();
        $rubberBand.css('width', 0);
        $rubberBand.css('height', 0);
        $rubberBand.hide();
    },

    moveRubberBand: function() {
        var _this = this,
            $rubberBand = $(_this.RUBBER_BAND_SELECTOR);

        $rubberBand.offset({
            top: _this.rubberBandRectangle.top,
            left: _this.rubberBandRectangle.left
        });
    },

    showRubberBand: function() {
        var _this = this,
            $rubberBand = $(_this.RUBBER_BAND_SELECTOR);

        $rubberBand.css("display", "inline");
    },

    resizeRubberBand: function() {
        var _this = this,
            $rubberBand = $(_this.RUBBER_BAND_SELECTOR);

        $rubberBand.height(_this.rubberBandRectangle.height);
        $rubberBand.width(_this.rubberBandRectangle.width);
    },

    resetRubberBand: function() {
        var _this = this;

        _this.rubberBandRectangle = {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        };
    },

    handleMouseDown: function(event) {
        var _this = this;

        event.preventDefault();
        _this.rubberBandStart(event.pageX, event.pageY);
    },

    setListeners: function(options) {
        var _this = this;

        $(_this.RESET_BTN_SELECTOR).click(function() {
            _this.CONTEXT.clearRect(0, 0, _this.CONTEXT.canvas.width, _this.CONTEXT.canvas.height);
            _this.CONTEXT.drawImage(_this.image, 0, 0, _this.el.width, _this.el.height);
        });
    }
});
