interface RedditPost {
  is_gallery?: boolean;
  data?: {
    media?: {
      reddit_video?: {
        fallback_url?: string;
      };
    };
    secure_media?: {
      reddit_video?: {
        fallback_url?: string;
      };
    };
    url?: string;
  };
}

interface RedditResponse {
  data: {
    children: RedditPost[];
  };
}

export async function getCuteUrl(): Promise<string> {
  const response = await fetch(redditUrl, {
    headers: {
      'User-Agent': 'justinbeckwith:awwbot:v1.0.0 (by /u/justinblat)',
    },
  });
  if (!response.ok) {
    let errorText = `Error fetching ${response.url}: ${response.status} ${response.statusText}`;
    try {
      const error = await response.text();
      if (error) {
        errorText = `${errorText} \n\n ${error}`;
      }
    } catch {
      // ignore
    }
    throw new Error(errorText);
  }
  const data: RedditResponse = await response.json();
  const posts = data.data.children
    .map((post) => {
      if (post.is_gallery) {
        return '';
      }
      return (
        post.data?.media?.reddit_video?.fallback_url ||
        post.data?.secure_media?.reddit_video?.fallback_url ||
        post.data?.url
      );
    })
    .filter((post): post is string => !!post);
  const randomIndex = Math.floor(Math.random() * posts.length);
  const randomPost = posts[randomIndex];
  return randomPost;
}

export const redditUrl = 'https://www.reddit.com/r/aww/hot.json';
