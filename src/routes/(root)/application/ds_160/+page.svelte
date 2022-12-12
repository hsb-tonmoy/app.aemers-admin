<script>
	import { CheckedCircle } from '$lib/components/Icons';
	import { Button } from '$lib/components/Form';
	import { application_status } from '$lib/data/stores';
	export let data;

	let completed = data.ds_160.submitted;

	async function handleComplete() {
		completed = !completed;

		if (completed === true) {
			$application_status.ds_160_filed = 2;
		} else {
			$application_status.ds_160_filed = 0;
		}

		const res = await fetch(`/application/ds_160`, {
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
	<title>app.aemers - DS-160 Submission</title>
</svelte:head>

<div
	class="flex flex-wrap-reverse xl:flex-nowrap gap-8 px-14 py-8 xl:px-20 xl:py-12 bg-white rounded-2xl w-full"
>
	<div class="flex flex-col w-full xl:w-3/5">
		<h2 class="text-secondary font-bold text-2xl mb-2">Have you submitted your DS-160?</h2>
		<span class="text-lighterText text-sm mb-4"
			>Confirm if you have filled up your DS-160: Online Nonimmigrant Visa Application. Watch the
			video to learn more about DS-160.</span
		>
		<div class="flex flex-col md:flex-row md:items-center gap-4 mt-6">
			<button
				on:click={handleComplete}
				class="inline-flex items-center gap-x-2 font-bold text-lg px-8 py-3 rounded-2xl border-2 {completed
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
				<a href="/application/sevis_payment"
					><Button type="button" classes="px-6 md:px-10 py-4" text="Next Step: SEVIS Payment" /></a
				>
			{/if}
		</div>
	</div>
	<div class="w-full xl:w-2/5 flex-shrink">
		<img src="/images/i20+upload.png" alt="I-20 Upload" />
	</div>
</div>
