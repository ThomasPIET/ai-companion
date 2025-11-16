
<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Send, Loader2 } from '@lucide/svelte';
	import AppNavbar from '$lib/components/app-navbar.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let prompt = $state('');
	let isLoading = $state(false);

	const breadcrumb = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Nouvelle Conversation', href: null }
	];

</script>



<AppNavbar breadcrumbs={breadcrumb} />
<div class=" w-full h-full border border-red-200">
	<div>
		<h1>Commencez une nouvelle conversation</h1>
		<p>Posez n'importe quelle question, je suis là pour vous aider</p>
	</div>

	<form
		method='post'
		class="chat-form"
		use:enhance={() => {
			isLoading = true;

			return async ({ result }) => {
				isLoading = false;

				if (result.type === 'success' && result.data?.chatID) {
					goto(`/chat/${result.data.chatID}`);
				}
			};
		}}
	>
		<div>
			<Input
				required
				placeholder='Posez votre question...'
				name='prompt'
				id='prompt'
				bind:value={prompt}
				disabled={isLoading}
			/>
			<Button type='submit' disabled={!prompt.trim() || isLoading}>
				{#if isLoading}
					<Loader2 class="animate-spin" />
					Traitement...
				{:else}
					<Send />
					Envoyer
				{/if}
			</Button>
		</div>
	</form>
</div>
