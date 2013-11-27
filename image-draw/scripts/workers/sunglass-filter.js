onmessage = function(event) {
    "use strict";
    var imageData = event.data,
        max = imageData.data.length - 3,
        i;

    for (i = 0; i < max; i += 4) {
        imageData.data[i] = 255 - imageData.data[i];
        imageData.data[i + 1] = 255 - imageData.data[i + 1];
        imageData.data[i + 2] = 255 - imageData.data[i + 2];
    }
    postMessage(imageData);
};
