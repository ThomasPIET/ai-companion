

export async function callApi(prompt, key) {

	const res = await fetch('http://tco8ggoo88ssswosk8ckgoog.147.135.136.36.sslip.io/api/ask', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"prompt" : prompt,
			"apiKey" : key
		})
	});

	if (!res.ok) {
		throw new Error(`API error: ${res.status}`);
	}

	return await res.json();
}