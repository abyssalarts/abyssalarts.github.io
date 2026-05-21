import type { PageServerLoad } from './$types';
import { getComments } from '$lib/server/comments';

export const load: PageServerLoad = async () => {
	const comments = await getComments('brain-dump');
	return {
		title: 'Brain Dump',
		description: 'Voice-first thought capture with AI-powered categorization and a visual Brain Web. Offline-first. Privacy-first. Your thoughts belong to you.',
		comments
	};
};
