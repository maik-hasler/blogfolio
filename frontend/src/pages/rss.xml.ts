import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: any; }) {
	const posts = await getCollection('blog', ({ data }) => {
		return data.published;
	});
	return rss({
		title: '',
		description: '',
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
