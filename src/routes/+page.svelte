
<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Send, LoaderCircle, Sparkles, Code, PenTool, MessageSquare } from '@lucide/svelte';
	import AppNavbar from '$lib/components/app-navbar.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let prompt = $state('');
	let isLoading = $state(false);

	const breadcrumb = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Nouvelle Conversation', href: null }
	];

	const suggestions = [
		{
			icon: Code,
			text: "Explique-moi ce code",
			prompt: "Peux-tu m'expliquer ce bout de code en détail ?"
		},
		{
			icon: PenTool,
			text: "Rédige un email",
			prompt: "Aide-moi à rédiger un email professionnel pour..."
		},
		{
			icon: Sparkles,
			text: "Idées créatives",
			prompt: "Donne-moi 5 idées créatives pour..."
		},
		{
			icon: MessageSquare,
			text: "Discussion simple",
			prompt: "Discutons de..."
		}
	];

	/**
	 * @param {any} suggestionPrompt
	 */
	function useSuggestion(suggestionPrompt) {
		prompt = suggestionPrompt;

		document.getElementById('prompt')?.focus();
	}
</script>

<div class="flex min-h-[calc(100vh-10rem)] flex-col bg-background">
	<AppNavbar breadcrumbs={breadcrumb} />
	
	<div class="flex flex-1 flex-col items-center justify-center p-4 sm:p-8">
		<div class="mx-auto flex w-full max-w-2xl flex-col gap-8">
			
			<div class="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
				<h1 class="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
					Comment puis-je vous aider ?
				</h1>
				<p class="text-muted-foreground text-lg">
					Posez-moi une question ou choisissez une suggestion ci-dessous.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
				{#each suggestions as suggestion}
					<button
						onclick={() => useSuggestion(suggestion.prompt)}
						class="group flex items-center gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:bg-accent/50"
					>
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
							<suggestion.icon class="h-5 w-5" />
						</div>
						<span class="font-medium text-sm text-card-foreground group-hover:text-primary transition-colors">
							{suggestion.text}
						</span>
					</button>
				{/each}
			</div>


			<div class="relative animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
				<form
					method='post'
					class="relative flex flex-col gap-2 rounded-2xl border bg-background p-2 shadow-lg ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-primary/20"
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
					<Input
						required
						placeholder='Envoyez un message...'
						name='prompt'
						id='prompt'
						bind:value={prompt}
						disabled={isLoading}
						class="min-h-[60px] w-full border-0 bg-transparent px-4 py-3 text-base shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50"
						autocomplete="off"
					/>
					
					<div class="flex items-center justify-between px-2 pb-2">
						<div class="text-xs text-muted-foreground px-2">
							IA Companion peut faire des erreurs.
						</div>
						<Button 
							type='submit' 
							size="icon"
							disabled={!prompt.trim() || isLoading}
							class="h-10 w-10 rounded-xl transition-all duration-200 {prompt.trim() ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}"
						>
							{#if isLoading}
								<LoaderCircle class="h-5 w-5 animate-spin" />
							{:else}
								<Send class="h-5 w-5" />
							{/if}
							<span class="sr-only">Envoyer</span>
						</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
