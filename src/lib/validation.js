
export {imageExists, videoExists, getYoutubeVideoEmbed};

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

function getYoutubeVideoEmbed(youtubeURL) {
    const youtubeEmbedTemplate = 'https://www.youtube.com/embed/';
    const url = youtubeURL.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    const YId = undefined !== url[2] ? url[2].split(/[^0-9a-z_/\\-]/i)[0] : url[0];

    if (YId === url[0]) {
        return '';
    }
    return youtubeEmbedTemplate.concat(YId);
}
