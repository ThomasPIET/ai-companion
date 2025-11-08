<script>
    import AppNavbar from "$lib/components/app-navbar.svelte";

    let {data} = $props();


    const breadcrumb = [
        { name: 'Acceuil', href: '/' },
        { name: data.chat?.title, href: null }
    ];
</script>



<AppNavbar breadcrumbs={breadcrumb}/>
<h1>Titre {data.chat?.title}</h1>

<h1>Question {data.chat?.questions[0].question}</h1>
<p>Réponse {data.chat?.questions[0].answer}</p>