
<script>

    let { message, sender } = $props();
</script>


<div class="max-w-xs sm:max-w-md lg:max-w-lg">
    <div class="rounded-2xl px-4 py-3 {sender === 'bot' ? 'bg-card text-card-foreground shadow-md border border-border' : 'bg-primary text-primary-foreground'} {sender === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}">
      <p class="text-sm leading-relaxed">{message}</p>
    </div>
</div>