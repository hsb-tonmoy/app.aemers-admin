<script>
	import SingleCategory from './SingleCategory.svelte';

	export let user;
	export let categories;
</script>

<section class="flex flex-col gap-y-20">
	{#each categories as category}
		<SingleCategory {category} {user} />
	{/each}
</section>
