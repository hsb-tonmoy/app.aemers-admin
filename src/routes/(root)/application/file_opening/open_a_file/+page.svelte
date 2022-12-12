<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Form/Button.svelte';
	import { Priority } from '$lib/components/Icons';
	import { onMount } from 'svelte';

	const items = ['College Placement', 'Mentorship from experts.', 'Access to premium contents.'];

	onMount(() => {
		if (!localStorage.getItem('fileOpeningTour')) {
			localStorage.setItem('fileOpeningTour', 'true');
		}
	});
</script>

<div class="flex flex-col mx-auto px-10 py-6 xl:px-20 xl:py-12 bg-white rounded-2xl">
	<h3 class="text-secondary font-bold text-2xl mb-2">Make Payment</h3>
	<p class="text-lightText text-sm mb-10">
		You can also visit the regional office of Aemers in Bangladesh or call <a
			href="tel:+8801781373911">+880 178 137 3911</a
		> to discuss how to initiate the file opening process.
	</p>
	<div
		class="flex flex-wrap items-center gap-y-8 bg-[#FAF9FF] rounded-xl px-8 py-4 md:px-16 md:py-8 w-full"
	>
		<div class="flex flex-col w-full md:w-2/4">
			<h6 class="text-secondary text-lg font-medium">File Opening Fee</h6>
			<span class="text-primary font-bold text-3xl">BDT 15000</span>
		</div>
		<div class="w-full md:w-2/4">
			<ul class="flex flex-col gap-y-3">
				{#each items as item}
					<li class="inline-flex items-center gap-x-2 font-semibold text-sm md:text-lg">
						<span class="text-primary w-4 h-4 md:w-5 md:h-5">
							<Priority />
						</span>
						{item}
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div class="flex justify-between items-center">
		<Button
			on:click={() => goto('/application/file_opening')}
			type="button"
			text="Go Back"
			classes="px-4 py-3 md:px-12 md:py-4 text-sm md:text-base font-bold mt-8 self-start bg-lightText text-white"
		/>
		<Button
			on:click={() => goto('/application/file_opening/confirm_info')}
			type="button"
			text="Make Payment"
			classes="px-4 py-3 md:px-12 md:py-4 text-sm md:text-base font-bold mt-8 self-start hover:bg-primaryDarker"
		/>
	</div>
</div>
