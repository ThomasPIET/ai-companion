
<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Send } from '@lucide/svelte';
	import AppNavbar from '$lib/components/app-navbar.svelte';
	import { Breadcrumb } from '$lib/components/ui/breadcrumb';
	let prompt = $state('');


	const breadcrumb = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Nouvelle Conversation', href: null }
	];
</script>


<AppNavbar breadcrumb={breadcrumb} />
<div class=" w-full h-full border border-red-200">
	<div>
		<h1>Commencez une nouvelle conversation</h1>
		<p>Posez n'importe quelle question, je suis là pour vous aider</p>
	</div>

	<form method='post' class="chat-form">
		<div>
			<Input
				required
				placeholder='Posez votre question...'
				name='prompt'
				id='prompt'
				bind:value={prompt}
			
			/>
			<Button type='submit' disabled={!prompt.trim()}>
				<Send />
				Envoyer
			</Button>
		</div>
	</form>
</div>
