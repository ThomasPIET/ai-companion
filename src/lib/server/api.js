/**
 * @param {*} prompt
 * @param {string} key
 * @returns
 */
export async function askAPI(prompt, key) {
	const res = await fetch('http://tco8ggoo88ssswosk8ckgoog.147.135.136.36.sslip.io/api/ask', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			prompt: prompt,
			apiKey: key
		})
	});

	if (!res.ok) {
		throw new Error(`API error lors de la génération de la réponse: ${res.status}`);
	}

	return await res.json();
}

/**
 * @param {*} prompt
 * @param {string} key
 */
export async function getTitleApi(prompt, key) {
	prompt = 'Génère un titre court (moins de 5 mots) pour la question suivante : ' + prompt;

	const res = await fetch('http://tco8ggoo88ssswosk8ckgoog.147.135.136.36.sslip.io/api/ask', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			prompt: prompt,
			apiKey: key
		})
	});

	if (!res.ok) {
		throw new Error(`API error lors de la génération du titre: ${res.status}`);
	}

	return await res.json();
}
