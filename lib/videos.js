import videoData from "../data/videos.json";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

export const getCommonVideos = async (url) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    try {
        const BASE_URL = "youtube.googleapis.com/youtube/v3";

        const response = await fetch(
            `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
        );

        const data = await response.json();

        if (data?.error){
            console.log("youtube API error", error)
            return [];
        };

        console.log({items: data.items});

        return data.items.map((item) => {
            console.log({ id: item.id});
            const id = item.id?.videioId || item.id;
            return {
                title: item.snippet.title,
                imgUrl: item.snippet.thumbnails.high.url,
                id,
            };
        });
    } catch (error) {
        console.error("something went wrong in the video library", error);
        return [];
    }
}

export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&type=video&q=${searchQuery}&type=video`;
    return getCommonVideos(URL);
};

export const getPopularVideos = () => {
    const URL = "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
    return getCommonVideos(URL);
}