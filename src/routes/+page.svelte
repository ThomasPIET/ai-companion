
<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

		let {data, form} = $props();

		let prompt = $state('');
</script>



<form method='post'>
	<input type='hidden' name='prompt' value={prompt}/>
	<Input required placeholder='Poser votre question' name='prompt' id='prompt' bind:value={prompt}/>
	<Button type='submit'>Click me</Button>
</form>




{#if form?.answer?.reply}
	<p>{form.prompt}</p>

	<p>{form.answer.reply}</p>
{/if}

<style>


</style>