<script>
    //@ts-nocheck
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";


    let { breadcrumb = []} = $props();

</script>
  <header class="flex h-16 shrink-0 items-center gap-2 px-4">
    <Sidebar.Trigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {#each breadcrumb as item }
          <Breadcrumb.Item class="hidden md:block">
              <Breadcrumb.Link href={item.href}>{item.name}</Breadcrumb.Link>
          </Breadcrumb.Item>
          {#if item.href !== null}
            <Breadcrumb.Separator class="hidden md:block" />
          {/if}
        {/each}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </header>