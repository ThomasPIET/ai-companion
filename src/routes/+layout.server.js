import { getAllTitles } from '$lib/server/db';

export async function load() {
	const titles = await getAllTitles();

	return { titles };
}
