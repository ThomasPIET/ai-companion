import { askAPI } from '$lib/server/api.js';
import { getChatById, insertQuestion } from '$lib/server/db/index.js';
import { API_KEY } from '$env/static/private';

export async function load({ params }) {
	const data = params.slug;

	const chat = await getChatById(Number(data));

	return { chat };
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// FormData {
		// 	chatID: '10',
		// 	message: 'Est ce que tu as une question à me poser ?'
		// }

		let response = await askAPI(data.get('message'), API_KEY);

		console.log('Response from askAPI:', response);

		await insertQuestion(data.get('message'), response, Number(data.get('chatID')));

		return {
			success: true
		};
	}
};
