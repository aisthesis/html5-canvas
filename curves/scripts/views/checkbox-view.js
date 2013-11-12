var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
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
            var startX = 32,
                startY = 32,
                width = 128,
                radius = 32;

            this.CONTEXT.strokeStyle = "#575";
            this.CONTEXT.moveTo(startX, startY);
            this.CONTEXT.lineTo(startX + width - radius, startY); 
            this.CONTEXT.arcTo(startX + width, startY, startX + width, startY + radius, radius);
            this.CONTEXT.lineTo(startX + width, startY + width);
            this.CONTEXT.stroke();
        },

        setConstants: function(options) {
            this.CONTEXT = this.el.getContext('2d');
        }
    });
})(codeMelon.games);
