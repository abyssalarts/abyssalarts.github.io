import type { PageServerLoad } from './$types';
import { getComments } from '$lib/server/comments';

export const load: PageServerLoad = async () => {
	const comments = await getComments('brain-dump');
	return { title: 'Brain Dump', comments };
};
