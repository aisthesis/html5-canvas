var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    "use strict";
    _cg.CheckboxView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants'
            );

            this.setConstants(options);
            this.render();
        },

        render: function() {
            this.CONTEXT.strokeStyle = 'yellow';
            this.CONTEXT.shadowColor = 'rgba(50, 50, 50, 1.0)';
            this.CONTEXT.shadowOffsetX = 2;
            this.CONTEXT.shadowOffsetY = 2;
            this.CONTEXT.shadowBlur = 4;
            this.CONTEXT.lineWidth = 20;
            this.CONTEXT.lineCap = 'round';
            
            this.CONTEXT.beginPath();
            this.CONTEXT.moveTo(this.START.x, this.START.y);
            this.CONTEXT.quadraticCurveTo(this.CONTROL1.x, this.CONTROL1.y,
                this.ANCHOR1.x, this.ANCHOR1.y);
            this.CONTEXT.quadraticCurveTo(this.CONTROL2.x, this.CONTROL2.y,
                this.ANCHOR2.x, this.ANCHOR2.y);
            this.CONTEXT.quadraticCurveTo(this.CONTROL3.x, this.CONTROL3.y,
                this.ANCHOR3.x, this.ANCHOR3.y);
            this.CONTEXT.stroke();
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
            this.START = new Point(120.5, 130);
            this.ANCHOR1 = new Point(160.6, 150.5);
            this.CONTROL1 = new Point(150.8, 130);
            this.ANCHOR2 = new Point(210.5, 160.5);
            this.CONTROL2 = new Point(190, 250.0);
            this.ANCHOR3 = new Point(290, 70.5);
            this.CONTROL3 = new Point(240, 100.5);
        }
    });
})(codeMelon.games);
