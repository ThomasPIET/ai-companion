import { askAPI, getTitleApi } from '$lib/server/api.js';
import { insertChat, insertQuestion } from '$lib/server/db/index.js';
import { API_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const title = await getTitleApi(data.get('prompt'), API_KEY);
		const answer = await askAPI(data.get('prompt'), API_KEY);

		const raw = (title.reply ?? '').trim();
		const cleanTitle =
			raw.startsWith('"') && raw.endsWith('"')
				? raw.slice(1, -1).replaceAll('\\"', '"')
				: raw.replaceAll('\\"', '"');

		const chatID = await insertChat(cleanTitle);
		await insertQuestion(data.get('prompt'), answer, chatID);

		redirect(303, '/chat/' + chatID);
	}
};
