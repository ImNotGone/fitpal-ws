
export {imageExists, videoExists};

// Check if an image exists,
async function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

//Check if a video exists
async function videoExists(url) {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.onloadeddata = () => resolve(true);
        video.onerror = () => resolve(false);
        video.src = url;
    });
}
