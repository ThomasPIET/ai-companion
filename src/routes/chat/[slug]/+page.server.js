import { getChatById } from '$lib/server/db/index.js';

export async function load({ params }) {

	const data = params.slug;
	return  await getChatById(Number(data));
		
}