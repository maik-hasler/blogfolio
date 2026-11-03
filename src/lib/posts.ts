import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** All published posts, newest first. The one source for teasers, the index, search, RSS, and article neighbors. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => data.published);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function postUrl(post: Pick<Post, 'id'>): string {
  return `/blog/${post.id}/`;
}
