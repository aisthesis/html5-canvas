var codeMelon = codeMelon || {}; 
codeMelon.games = codeMelon.games || {}; 

codeMelon.games.AppView = Backbone.View.extend({
    initialize: function(options) {
        var _this = this;

        _.bindAll(_this,
            'render',
            'setConstants',
            'setListeners',
            'drawCircle',
            'drawNumerals',
            'drawCenter',
            'drawHand',
            'drawHands',
            'drawClock'
        );

        _this.setConstants(options);
        _this.setListeners(options);
        _this.render();
    },

    render: function() {
        var _this = this;

        _this.CONTEXT.font = _this.FONT_HEIGHT + 'px Arial';
        _this.drawClock();
        _this.loop = setInterval(_this.drawClock, 1000);
    },

    setConstants: function(options) {
        var _this = this;

        _this.CONTEXT = _this.el.getContext('2d');
        _this.FONT_HEIGHT = 15;
        _this.MARGIN = 35;
        _this.HAND_TRUNCATION = _this.el.width / 25;
        _this.HOUR_HAND_TRUNCATION = _this.el.width / 10;
        _this.NUMERAL_SPACING = 20;
        _this.RADIUS = _this.el.width / 2 - _this.MARGIN;
        _this.HAND_RADIUS = _this.RADIUS + _this.NUMERAL_SPACING;
        _this.SNAPSHOT_BTN_SELECTOR = "#snapshot-btn";
        _this.SNAPSHOT_IMAGE_SELECTOR = "#snapshot";
        _this.TAKE_SNAPSHOT_TEXT = "Take snapshot";
        _this.RETURN_TO_CANVAS_TEXT = "Return to canvas";
    },

    setListeners: function() {
        var _this = this,
            $snapShotBtn = $(_this.SNAPSHOT_BTN_SELECTOR),
            $snapShot = $(_this.SNAPSHOT_IMAGE_SELECTOR);

        $snapShotBtn.click(function(event) {
            var dataUrl;

            if ($snapShotBtn.text() === _this.TAKE_SNAPSHOT_TEXT) {
                dataUrl = _this.el.toDataURL();
                clearInterval(_this.loop);
                $snapShot.attr('src', dataUrl);
                _this.$el.hide();
                $snapShot.show();
                $snapShotBtn.text(_this.RETURN_TO_CANVAS_TEXT);
            }
            else {
                $snapShot.hide();
                _this.$el.show();
                _this.loop = setInterval(_this.drawClock, 1000);
                $snapShotBtn.text(_this.TAKE_SNAPSHOT_TEXT);
            }
        });
    },

    drawCircle: function() {
        var _this = this;

        _this.CONTEXT.beginPath();
        _this.CONTEXT.arc(_this.el.width / 2, _this.el.height / 2,
            _this.RADIUS, 0, Math.PI * 2, true);
        _this.CONTEXT.stroke();
    },

    drawNumerals: function() {
        var _this = this,
            numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
            angle = 0,
            numeralWidth = 0;

        numerals.forEach(function(numeral) {
            angle = Math.PI / 6 * (numeral - 3);
            numeralWidth = _this.CONTEXT.measureText(numeral).width;
            _this.CONTEXT.fillText(numeral,
                _this.el.width / 2 + Math.cos(angle) * _this.HAND_RADIUS - numeralWidth / 2,
                _this.el.height / 2 + Math.sin(angle) * _this.HAND_RADIUS + _this.FONT_HEIGHT / 3
            );
        });
    },

    drawCenter: function() {
        var _this = this;

        _this.CONTEXT.beginPath();
        _this.CONTEXT.arc(_this.el.width / 2, _this.el.height / 2, 5, 0, Math.PI * 2, true);
        _this.CONTEXT.fill();
    },

    drawHand: function(loc, isHour, lineWidth) {
        var _this = this,
            angle = Math.PI * 2 * loc / 60 - Math.PI / 2,
            handRadius = isHour ? _this.RADIUS - _this.HAND_TRUNCATION - _this.HOUR_HAND_TRUNCATION :
                _this.RADIUS - _this.HAND_TRUNCATION,
            currentLineWidth = _this.CONTEXT.lineWidth;

        _this.CONTEXT.lineWidth = lineWidth;
        _this.CONTEXT.moveTo(_this.el.width / 2, _this.el.height / 2);
        _this.CONTEXT.lineTo(_this.el.width / 2 + Math.cos(angle) * handRadius,
                _this.el.height / 2 + Math.sin(angle) * handRadius);
        _this.CONTEXT.stroke();
        _this.CONTEXT.lineWidth = currentLineWidth;
    },

    drawHands: function() {
        var _this = this,
            date = new Date(),
            hour = date.getHours() % 12;

         _this.drawHand(hour * 5 + 5 * date.getMinutes() / 60, true, 2);
         _this.drawHand(date.getMinutes(), false, 2);
         _this.drawHand(date.getSeconds(), false, 1);
    },

    drawClock: function() {
        var _this = this;

        _this.CONTEXT.clearRect(0, 0, _this.el.width, _this.el.height);
        _this.drawCircle();
        _this.drawCenter();
        _this.drawHands();
        _this.drawNumerals();
    }
});
