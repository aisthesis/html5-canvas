var Point = Base.extend({
    init: function(x, y) {
        this.x = x;
        this.y = y;
    },

    distanceTo: function(point) {
        var diffX = this.x - point.x,
            diffY = this.y - point.y;

        return Math.sqrt(diffX * diffX + diffY * diffY);
    }
});
