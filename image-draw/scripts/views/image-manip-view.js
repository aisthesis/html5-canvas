var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

(function(_cg) {
    _cg.ImageManipView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'render',
                'setConstants',
                'initMembers'
            );

            this.setConstants(options);
            this.initMembers(options);
            this.render();
        },

        render: function() {
        },

        setConstants: function(options) {
        },

        initMembers: function(options) {
            this.archOrigView = new _cg.ArchOrigView({
                el: '#arch-orig'
            });
        }
    });
})(codeMelon.games);
