var _c = _c || {}; 
_c.app = _c.app || {}; 
_c.app.views = _c.app.views || {};

(function(views) {
    "use strict";
    views.ParallaxView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'setConstants',
                'initMembers',
                'initBgImages',
                'setFps',
                'draw',
                'animate'
            );

            this.setConstants(options);
            this.initMembers(options);
        },

        setConstants: function(options) {
            this.SKY_VELOCITY = 30; // 30 pixels / second
            this.VELOCITIES = {
                sky: 8,
                grass: 75,
                tree: 20,
                nearTree: 40
            };
            this.GRASS2_OFFSET_FACTOR = 1.3;
        },

        initMembers: function(options) {
            this.context = this.el.getContext('2d');
            this.lastTime = 0;
            this.fps = 60;
            this.offsets = {
                sky: 0,
                grass: 0,
                tree: 0,
                nearTree: 0
            };
            this.initBgImages(options);
        },

        initBgImages: function(options) {
            var _this = this,
                images = {
                    sky: 'sky',
                    tree: 'smalltree',
                    nearTree: 'tree-twotrunks',
                    grass: 'grass',
                    grass2: 'grass2'
                },
                key;
            
            this.imagesLoaded = [];
            this.images = {};
            for (key in images) {
                this.images[key] = new Image();
                this.images[key].src = '../common/' + images[key] + '.png';
                this.imagesLoaded[key] = false;
                this.images[key].onload = function() {
                    _this.imagesLoaded[key] = true;
                    if (_.reduce(_this.imagesLoaded, 
                        function(memo, value) { return memo && value; }, true)) {
                        _this.draw();
                        requestAnimationFrame(_this.animate);
                    }
                };
            }
        },

        setFps: function(time) {
            this.fps = 1000 / (time - this.lastTime);
            this.lastTime = time;
        },

        draw: function() {
            // recalculate offsets
            this.offsets.sky = this.offsets.sky < this.el.width ? 
                this.offsets.sky + this.VELOCITIES.sky / this.fps : 0;
            this.offsets.grass = this.offsets.grass < this.el.width ? 
                this.offsets.grass + this.VELOCITIES.grass / this.fps : 0;
            this.offsets.tree = this.offsets.tree < this.el.width ? 
                this.offsets.tree + this.VELOCITIES.tree / this.fps : 0;
            this.offsets.nearTree = this.offsets.nearTree < this.el.width ? 
                this.offsets.nearTree + this.VELOCITIES.nearTree / this.fps : 0;

            // draw sky
            this.context.save();
            this.context.translate(-this.offsets.sky, 0);
            this.context.drawImage(this.images.sky, 0, 0);
            this.context.drawImage(this.images.sky, this.images.sky.width - 2, 0);
            this.context.restore();

            // draw far trees
            this.context.save();
            this.context.translate(-this.offsets.tree, 0);
            this.context.drawImage(this.images.tree, 100, 240);
            this.context.drawImage(this.images.tree, 1100, 240);
            this.context.drawImage(this.images.tree, 400, 240);
            this.context.drawImage(this.images.tree, 1400, 240);
            this.context.drawImage(this.images.tree, 700, 240);
            this.context.drawImage(this.images.tree, 1700, 240);
            this.context.restore();

            // draw near trees
            this.context.save();
            this.context.translate(-this.offsets.nearTree, 0);
            this.context.drawImage(this.images.nearTree, 250, 220);
            this.context.drawImage(this.images.nearTree, 1250, 220);
            this.context.drawImage(this.images.nearTree, 800, 220);
            this.context.drawImage(this.images.nearTree, 1700, 220);
            this.context.restore();

            // draw grass
            this.context.save();
            this.context.translate(-this.offsets.grass, 0);
            this.context.drawImage(this.images.grass2, 
                0, this.el.height - this.GRASS2_OFFSET_FACTOR * this.images.grass2.height);
            this.context.drawImage(this.images.grass2, 
                this.images.grass2.width, this.el.height - this.GRASS2_OFFSET_FACTOR * this.images.grass2.height);
            this.context.drawImage(this.images.grass, 
                0, this.el.height - this.images.grass.height);
            this.context.drawImage(this.images.grass, 
                this.images.grass.width - 5, this.el.height - this.images.grass.height);
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
