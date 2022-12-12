<script>
	import TileTemplate from '../TileTemplate.svelte';

	import { CheckMark } from '$lib/components/Icons';

	const items = [
		{ title: 'Unlimited free sessions' },
		{ title: 'Authentic preparation questions' },
		{ title: 'Randomized unique questions' }
	];

	const heading = 'Free Visa Mock Interview';
	const subheading =
		'Practice for your visa interview for free! You can also book an interview with real interviewer!';
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
		<div class="flex gap-x-4">
			<a href="/mock_visa_interview/free/new">
				<button
					type="button"
					class="self-start text-white bg-primary hover:bg-primaryDarker rounded-xl px-4 py-2 md:py-3 font-bold text-sm md:text-base mt-3 transition-all ease-in-out duration-150"
					>Start a Free Session</button
				>
			</a>
			<button
				type="button"
				class="self-start text-primary bg-white border border-primary hover:text-white hover:bg-primaryDarker hover:border-primaryDarker rounded-xl px-4 py-2 md:py-3 font-bold text-sm md:text-base mt-3 transition-all ease-in-out duration-150"
				>Go Premium</button
			>
		</div>
	</div>
</TileTemplate>
