<script>
	import { CheckedCircle } from '$lib/components/Icons';
	import { Button } from '$lib/components/Form';
	import { application_status } from '$lib/data/stores';
	export let data;

	let completed = data.visa_fee_payment.submitted;

	async function handleComplete() {
		completed = !completed;

		if (completed === true) {
			$application_status.visa_fee_payment = 2;
		} else {
			$application_status.visa_fee_payment = 0;
		}

		const res = await fetch(`/application/visa_fee_payment`, {
			method: 'PATCH',
			body: JSON.stringify({ submitted: completed })
		});

		if (res.ok) {
			return;
		} else {
			completed = !completed;
			console.log(res);
			console.log(await res.json());
		}
	}
</script>

<svelte:head>
	<title>app.aemers - Visa Fee Payment</title>
</svelte:head>

<div
	class="flex flex-wrap xl:flex-nowrap gap-8 px-14 py-8 xl:px-20 xl:py-12 bg-white rounded-2xl w-full"
>
	<div class="flex flex-col w-full xl:w-3/5">
		<h2 class="text-secondary font-bold text-2xl mb-2">Have you paid your Visa Fee?</h2>
		<span class="text-lighterText text-sm mb-4"
			>Confirm if you have paid your Visa Fee. Watch the video to learn more about Visa Fee Payment.</span
		>
		<div class="flex flex-col md:flex-row md:items-center gap-4 mt-6">
			<button
				on:click={handleComplete}
				class="inline-flex items-center gap-x-2 font-bold text-sm md:text-base xl:text-lg px-8 py-3 rounded-2xl border-2 {completed
					? 'bg-white text-greenSignal border-greenSignal'
					: 'bg-primary text-white border-primary'}"
			>
				{#if completed}
					<span class="w-5 h-5"><CheckedCircle /></span>Completed
				{:else}
					Mark as Completed
				{/if}
			</button>
			{#if completed}
				<a href="/application/visa_interview"
					><Button type="button" classes="px-6 md:px-10 py-4" text="Next Step: Visa Interview" /></a
				>
			{/if}
		</div>
	</div>
	<div class="w-full xl:w-2/5 flex-shrink">
		<img src="/images/i20+upload.png" alt="I-20 Upload" />
	</div>
</div>
