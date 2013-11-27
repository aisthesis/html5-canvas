var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    _cg.ArchOrigView = Backbone.View.extend({
        events: {
            'mousedown': 'handleMouseDown',
            'mousemove': 'handleMouseMove',
            'mouseup': 'handleMouseUp'
        },

        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'setImageData',
                'setTransparentImageData',
                'handleMouseDown',
                'handleMouseMove',
                'handleMouseUp'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
        },

        render: function() {
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
        },

        initMembers: function(options) {
            var _this = this;

            _this.image = new Image();
            _this.image.src = '../common/arch.png';
            _this.image.onload = function(event) {
                _this.CONTEXT.drawImage(_this.image, 0, 0);
                _this.setImageData();
                _this.setTransparentImageData();
                _this.archModifiedView = new _cg.ArchModifiedView({
                    el: '#arch-modified',
                    imageData: _this.transparentImageData
                });
                _this.deviceWidthOverCSSPixels = _this.imageData.width / _this.el.width;
                _this.deviceHeightOverCSSPixels = _this.imageData.height / _this.el.height;
            };
            _this.dragging = false;
        },

        setImageData: function() {
            this.imageData = this.CONTEXT.getImageData(0, 0, this.el.width, this.el.height);
        },

        setTransparentImageData: function() {
            var max = this.imageData.data.length - 3,
                i;

            this.transparentImageData = this.CONTEXT.createImageData(this.el.width, this.el.height);
            for (i = 0; i < max; i += 4) {
                this.transparentImageData.data[i] = this.imageData.data[i];
                this.transparentImageData.data[i + 1] = this.imageData.data[i + 1];
                this.transparentImageData.data[i + 2] = this.imageData.data[i + 2];
                this.transparentImageData.data[i + 3] = this.imageData.data[i + 3] / 2;
            }
        },

        handleMouseDown: function(event) {
            this.dragging = true;
            this.rectangle = new _c.draw.Rectangle({
                corner: _c.draw.windowToCanvas(this.el, event.clientX, event.clientY)
            });
        },

        handleMouseMove: function(event) {
            var loc = _c.draw.windowToCanvas(this.el, event.clientX, event.clientY);

            if (!this.dragging) { return; }
            this.rectangle.width = loc.x - this.rectangle.corner.x;
            this.rectangle.height = loc.y - this.rectangle.corner.y;
            this.CONTEXT.drawImage(this.image, 0, 0);
            this.CONTEXT.putImageData(this.transparentImageData, 0, 0, 
                this.rectangle.left() * this.deviceWidthOverCSSPixels, 
                this.rectangle.top() * this.deviceHeightOverCSSPixels,
                this.rectangle.absoluteWidth() * this.deviceWidthOverCSSPixels,
                this.rectangle.absoluteHeight() * this.deviceHeightOverCSSPixels);
            this.rectangle.stroke(this.CONTEXT);
        },

        handleMouseUp: function(event) {
            this.dragging = false;
            this.rectangle = null;
            this.CONTEXT.drawImage(this.image, 0, 0);
        }
    });
})(codeMelon.games);
