<script>
	import TileTemplate from '../TileTemplate.svelte';

	import { CheckMark } from '$lib/components/Icons';

	const heading = 'Free Knowledge Base';
	const subheading =
		'Practice for your visa interview for free! You can also book an interview with real interviewer!';

	const items = [
		{ title: 'Blogs and Articles' },
		{ title: 'Admission Guidance' },
		{ title: 'University Info' }
	];
</script>

<TileTemplate {heading} {subheading}>
	<div class="flex flex-col gap-y-2">
		{#each items as item}
			<li class="flex items-center gap-x-5">
				<span class="w-4 h-4 md:w-8 md:h-8 text-primary">
					<CheckMark />
				</span>
				<span class="text-sm md:text-base">{item.title}</span>
			</li>
		{/each}
		<a
			href="https://kb.aemers.com/"
			target="_blank"
			rel="noreferrer"
			class="self-start text-white bg-primary hover:bg-primaryDarker rounded-xl px-4 py-2 md:py-3 font-bold text-sm md:text-base mt-3 transition-all ease-in-out duration-150"
			>Explore Now</a
		>
	</div>
</TileTemplate>
