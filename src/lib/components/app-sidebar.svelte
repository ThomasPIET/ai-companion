<script lang="ts">
	//@ts-nocheck
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
		import type { ComponentProps } from "svelte";
  import {Bot} from "@lucide/svelte"
  let { ref = $bindable(null), titles = [], ...restProps } = $props();

  let data = $derived({
        navMain: [
            {
                title: "Historique",
                url: "",
                items: titles.map(t => ({
                    title: t.title,
                    url: `/chat/${t.id}`,
                    id: t.id
                }))
            },
        ],
    });
</script>


<Sidebar.Root variant="floating" {...restProps}>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          {#snippet child({ props })}
            <a href="/" {...props}>
              <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Bot class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">AI Companion</span>
              </div>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
			  <Sidebar.MenuButton class="mb-8 hover:bg-transparent" size="lg">
				{#snippet child({ props })}
				  <a href="/" {...props}>
					<Button class="w-full hover:cursor-auto" variant="outline" size="lg">
					Nouveau chat
					</Button>
				  </a>
				{/snippet}
			  </Sidebar.MenuButton>
			</Sidebar.MenuItem>
		  </Sidebar.Menu>
      <Sidebar.Menu class="gap-2">
        {#each data.navMain as item (item.title)}
          <Sidebar.MenuItem>
            <Sidebar.GroupLabel class="text-md text-gray-500">
              {#snippet child({ props })}
                <span href={item.url} class="" {...props}>
                  {item.title}
                </span>
              {/snippet}
            </Sidebar.GroupLabel>
            {#if item.items?.length}
              <Sidebar.MenuSub class="ml-0 border-l-0 px-1.5">
                {#each item.items as subItem (subItem.title)}
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton  isActive={subItem.isActive}>
                      {#snippet child({ props })}
                        <a class="overflow-hidden text-ellipsis whitespace-nowrap block" href={subItem.url} {...props} title={subItem.title}>
                          {subItem.title}
                        </a>
                      {/snippet}
                    </Sidebar.MenuSubButton>
                  </Sidebar.MenuSubItem>
                {/each}
              </Sidebar.MenuSub>
            {/if}
          </Sidebar.MenuItem>
        {/each}
      </Sidebar.Menu>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>