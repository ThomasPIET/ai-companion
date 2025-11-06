import { getChatById } from '$lib/server/db/index.js';

export async function load({ params }) {
	const data = params.slug;

	const chat = await getChatById(Number(data));

	return { chat };
}
