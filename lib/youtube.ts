import Parser from "rss-parser";
import { unstable_cache } from "next/cache";

const parser = new Parser();
const CHANNEL_ID = "UCkHl5r3hX8ogIxIqgtecLIA";

export interface YouTubeVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  link: string;
}

async function fetchVideos(limit = 6): Promise<YouTubeVideo[]> {
  try {
    const feed = await parser.parseURL(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
    );

    return (feed.items || []).slice(0, limit).map((item) => {
      const videoId = item.id?.replace("yt:video:", "") || "";
      return {
        videoId,
        title: item.title || "Без названия",
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        publishedAt: item.pubDate || "",
        link: item.link || `https://youtube.com/watch?v=${videoId}`,
      };
    });
  } catch (error) {
    console.error("YouTube RSS fetch error:", error);
    return [];
  }
}

export const getLatestVideos = unstable_cache(fetchVideos, ["youtube-videos"], {
  revalidate: 3600,
  tags: ["youtube"],
});
