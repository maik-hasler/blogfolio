import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Alle veröffentlichten Beiträge, neuester zuerst. Die eine Quelle für Teaser, Index, Suche, RSS und Artikel-Nachbarn. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => data.published);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function postUrl(post: Pick<Post, 'id'>): string {
  return `/blog/${post.id}/`;
}
