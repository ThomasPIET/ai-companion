import { callApi } from '$lib/server/api.js';
import {insertQuestion} from '$lib/server/db/index.js';
import { API_KEY } from '$env/static/private';


export async function load() {

}

export const actions = {

	default: async ({ request }) => {

		const data = await request.formData();
		const answer = await callApi(data.get('prompt'), API_KEY);
		await insertQuestion(data.get('prompt'), answer);
		return {
			'prompt': data.get('prompt'),
			answer
		};
	}
}