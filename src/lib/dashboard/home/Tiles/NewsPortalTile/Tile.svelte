<script>
	import TileTemplate from '../TileTemplate.svelte';

	const heading = 'News Portal';
	const subheading =
		'We enlist the scholarship updates amd Embassy News here and show the apply process here!';
</script>

<TileTemplate {heading} {subheading}>
	<div class="flex gap-x-4">
		<button
			type="button"
			class="self-start text-white bg-primary hover:bg-primaryDarker rounded-xl px-4 py-2 md:py-3 font-bold text-sm md:text-base mt-3 transition-all ease-in-out duration-150"
			>News Portal</button
		>
	</div>
</TileTemplate>
