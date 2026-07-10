import { NextResponse } from "next/server";

// Кэшируем результат на 1 час
export const revalidate = 3600;

export async function GET() {
  const CHANNEL_ID = "UC..."; // ЗАМЕНИ НА ID КАНАЛА NEXTON LIFE

  // Если нет API ключа — возвращаем демо-данные
  if (!process.env.YOUTUBE_API_KEY) {
    return NextResponse.json({
      items: [
        {
          id: { videoId: "demo1" },
          snippet: {
            title: "Ремонт автокондиционера",
            thumbnails: { high: { url: "/images/youtube-placeholder.jpg" } },
            publishedAt: new Date().toISOString(),
          },
        },
      ],
    });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`,
    );

    if (!response.ok) {
      throw new Error("YouTube API error");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    // При ошибке возвращаем демо-данные
    return NextResponse.json({
      items: [
        {
          id: { videoId: "demo1" },
          snippet: {
            title: "Ремонт автокондиционера",
            thumbnails: { high: { url: "/images/youtube-placeholder.jpg" } },
            publishedAt: new Date().toISOString(),
          },
        },
      ],
    });
  }
}
