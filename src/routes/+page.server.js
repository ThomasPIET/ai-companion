import { callApi } from '$lib/server/api.js';
import { API_KEY } from '$env/static/private';


export function load() {

	return {
		'name': 'Thomas'
	}
}

export const actions = {

	default: async ({ request }) => {

		const data = await request.formData();
		const answer = await callApi(data.get('prompt'), API_KEY);

		return {
			'prompt': data.get('prompt'),
			answer

		};

	}
}