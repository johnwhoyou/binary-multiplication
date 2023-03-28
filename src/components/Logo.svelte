<script>
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
  
    let visible = false;
  
    onMount(() => {
      visible = true;
    });
</script>
  
<div class="flex justify-center items-center">
{#if visible}
    <img src="https://i.imgur.com/0QOMof6.png" alt="download" style="pointer-events: none;" transition:fly="{{ y: 200, duration: 2000 }}" />
{/if}
</div>