<script>
    import AppNavbar from "$lib/components/app-navbar.svelte";

    let {data} = $props();

    console.log(data.chat)

    const breadcrumb = [
        { name: 'Acceuil', href: '/' },
        { name: data.chat.title, href: null }
    ];
</script>



<AppNavbar breadcrumbs={breadcrumb}/>
<h1>{data.chat.title}</h1>
