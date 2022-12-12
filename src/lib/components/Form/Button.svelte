<script lang="ts">
	import { Spinner } from 'flowbite-svelte';
	export let text: string = '';
	export let type: string = 'submit';
	export let defaultClass: string =
		'inline-flex items-center justify-center bg-primary disabled:bg-borderColor text-white font-bold text-base rounded-xl';
	export let classes: string = '';
	export let disabled: boolean = false;
	export let loading: boolean = false;
</script>

<button on:click disabled={loading || disabled} {type} class={`${defaultClass} ${classes}`}
	>{text}
	<slot />
	{#if loading}
		<Spinner class="ml-2" color="white" size="4" />
	{/if}
</button>
