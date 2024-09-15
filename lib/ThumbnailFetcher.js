import axios from 'axios';

const getVideoId = (link) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
};
export const fetchThumbnail = async (youtubeLink) => {
    const videoId = getVideoId(youtubeLink);
    if (videoId) {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=AIzaSyClTs-wBF_nhq1stpHFD4mxFO5XFnWWh1M`
            );

            const data = response.data;
            if (data.items && data.items.length > 0) {
                const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
                console.log('thumbnailUrl', thumbnailUrl);
                return thumbnailUrl;
            } else {
                console.error('Video not found or API key is invalid.');
            }
        } catch (error) {
            console.error('Error fetching YouTube data:', error);
        }
    } else {
        console.error('Invalid YouTube link.');
    }
    return;
};





