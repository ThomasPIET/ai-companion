<script>
    import AppNavbar from "$lib/components/app-navbar.svelte";
    import Message from "$lib/components/message.svelte";
    import { enhance } from '$app/forms';
    import { LoaderCircle } from '@lucide/svelte';

    let {data} = $props();

    let newMessage = $state('');
    let isLoading = $state(false);

    /** @type {Array<{question: string, answer: string | null}>} */
    let optimisticMessages = $state([]);

    let chatContainer;

    const breadcrumb = [
        { name: 'Acceuil', href: '/' },
        { name: data.chat?.title, href: null }
    ];

    let allMessages = $derived([
        ...(data.chat?.questions || []),
        ...optimisticMessages
    ]);


    $effect(()=> {
        if (chatContainer && allMessages.length) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    })
</script>

<div class="flex flex-col h-screen ">
    <AppNavbar  breadcrumbs={breadcrumb}/>

    <div class="flex-1 overflow-y-auto " bind:this={chatContainer}>
        <div class="p-4 space-y-4">
            {#each allMessages as item}
                <div class="flex justify-end">
                    <Message sender='user' message={item.question}/>
                </div>  
                <div class="flex justify-start">
                    {#if item.answer}
                        <Message sender='bot' message={item.answer}/>
                    {:else}
                        <div class="flex items-center gap-2 text-muted-foreground">
                            <LoaderCircle class="animate-spin w-4 h-4" />
                            <span>Réflexion en cours...</span>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <div class="border-t border-border bg-background p-4">
         <form
            method="POST"
            action="?"
            use:enhance={() => {
                const userMessage = newMessage;
                isLoading = true;

                //Si anwer est null, c'est un message en attente de réponse
                optimisticMessages = [...optimisticMessages, {
                    question: userMessage,
                    answer: null
                }];

                newMessage = '';

                return async ({ result, update }) => {
                    isLoading = false;

                    if (result.type === 'success') {
                        optimisticMessages = [];
                        await update();
                    } else {
                        optimisticMessages = [];
                        alert('Erreur lors de l\'envoi du message');
                    }
                };
            }}
        >
            <input type="hidden" name='chatID' value={data.chat?.id}/>
            <div class="flex gap-2">
                <textarea
                    bind:value={newMessage}
                    name="message"
                    id="message"
                    placeholder="Écrivez votre message..."
                    class="flex-1 resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    rows="3"
                    disabled={isLoading}
                ></textarea>
                <button
                    type="submit"
                    disabled={!newMessage.trim() || isLoading}
                    class="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {#if isLoading}
                        <LoaderCircle class="animate-spin" />
                    {:else}
                        Envoyer
                    {/if}
                </button>
            </div>
         </form>
    </div>
</div>

