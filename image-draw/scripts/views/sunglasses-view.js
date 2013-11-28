var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    _cg.SunglassesView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'handleFilterMessage'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
        },

        render: function() {
            //this.CONTEXT.drawImage(this.image, 0, 0, this.$el.width, this.$el.height);
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
            this.CIRCLE_RADIUS = 128;
            this.CLIPPING_CIRCLE = new _c.draw.Circle({
                center: new _c.draw.Point(this.el.width / 2, this.el.height / 2),
                radius: this.CIRCLE_RADIUS
            });
        },

        initMembers: function(options) {
            var _this = this;

            this.offscreenCanvas = document.createElement('canvas');
            this.offscreenCanvas.width = this.el.width;
            this.offscreenCanvas.height = this.el.height;
            this.offscreenContext = this.offscreenCanvas.getContext('2d');
            this.sunglassFilter = new Worker('scripts/workers/sunglass-filter.js');
            this.sunglassFilter.onmessage = this.handleFilterMessage;
            this.image = new Image();
            this.image.src = '../common/curved-road.png';
            this.image.onload = function(event) {
                _this.CONTEXT.drawImage(_this.image, 0, 0);
                _this.sunglassFilter.postMessage(_this.CONTEXT.getImageData(0, 0, 
                        _this.el.width, _this.el.height));
            };
        },

        handleFilterMessage: function(event) {
            var _this = this;

            this.offscreenContext.putImageData(event.data, 0, 0);
            this.CLIPPING_CIRCLE.clip(_this.CONTEXT, function() {
                _this.CONTEXT.drawImage(_this.offscreenCanvas, 0, 0, _this.el.width, _this.el.height);
            });
        }
    });
})(codeMelon.games);
