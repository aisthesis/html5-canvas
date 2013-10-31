var canvasView = new codeMelon.games.CanvasView({
        el: $('#game-canvas')
    }); 

window.onmousemove = function(event) {
    event.preventDefault();
    if (canvasView.dragging) {
        canvasView.rubberBandStretch(event.pageX, event.pageY);
    }
};

window.onmouseup = function(event) {
    event.preventDefault();
    canvasView.rubberBandEnd();
}
