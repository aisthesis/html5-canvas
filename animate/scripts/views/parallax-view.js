var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.ParallaxView = Backbone.View.extend({
        initialize: function(options) {
            var _this = this;

            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers',
                'setFps',
                'draw',
                'animate'
            );

            this.setConstants(options);
            this.initMembers(options);
            //requestAnimationFrame(_this.animate);
        },

        render: function() {
            this.context.drawImage(this.sky, 0, 0);
            requestAnimationFrame(this.animate);
        },

        setConstants: function(options) {
            this.SKY_VELOCITY = 30; // 30 pixels / second
        },

        initMembers: function(options) {
            this.context = this.el.getContext('2d');
            this.lastTime = 0;
            this.fps = 0;
            this.bgOffset = 0;
            this.sky = new Image();
            this.sky.src = '../common/sky.png';
            this.sky.onload = this.render;
        },

        setFps: function(time) {
            this.fps = 1000 / (time - this.lastTime);
            this.lastTime = time;
        },

        draw: function() {
            this.bgOffset = this.bgOffset < this.el.width ? this.bgOffset + this.SKY_VELOCITY / this.fps : 0;
            this.context.save();
            this.context.translate(-this.bgOffset, 0);
            this.context.drawImage(this.sky, 0, 0);
            this.context.drawImage(this.sky, this.sky.width - 2, 0);
            this.context.restore();
        },

        animate: function(time) {
            if (time === undefined) time = new Date().getTime();
            this.setFps(time);
            this.context.clearRect(0, 0, this.el.width, this.el.height);
            this.draw();
            requestAnimationFrame(this.animate);
        }
    });
})(_c.app.views);
