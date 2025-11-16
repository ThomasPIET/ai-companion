<script>
	//@ts-nocheck
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import AppNavbar from '$lib/components/app-navbar.svelte';

	let { children, data } = $props();

	let Titles = $state([])

	$effect(() => {
		if (data?.titles) {
			Titles = data.titles; 
		}
	});

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Sidebar.Provider>
	<AppSidebar titles={Titles}/>
	<Sidebar.Inset>
		{@render children?.()}
	</Sidebar.Inset>
</Sidebar.Provider>