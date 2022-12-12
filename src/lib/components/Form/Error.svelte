<script lang="ts">
	export let message: string;
	export let classes: string = '';
</script>

{#if message}
	{#each message as msg}
		<span class={`text-red-600 text-sm text-center font-medium mt-2 ${classes}`}>
			{msg}
		</span>
	{/each}
{/if}
