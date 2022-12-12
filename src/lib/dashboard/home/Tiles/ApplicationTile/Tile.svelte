<script>
	import ApplicationProgress from '$lib/dashboard/home/Tiles/ApplicationTile/ApplicationProgress.svelte';

	let applicationComplete = false;
</script>

<div class="flex flex-col rounded-2xl py-8 px-10 bg-primary ">
	<div class="2xl:w-3/4">
		<div class="flex gap-x-3 items-center">
			<h2 class="font-bold text-white text-xl md:text-2xl 2xl:text-3xl">My Application</h2>
			<span
				class={`${
					applicationComplete ? 'bg-greenSignal' : 'bg-primaryDarker'
				} text-white font-bold text-xs px-2 py-1 rounded`}
				>{applicationComplete ? 'Complete' : 'Incomplete'}</span
			>
		</div>
		<h6 class="text-xs md:text-sm text-white mt-1">
			Complete your US Admission Application with the help of Aemers!
		</h6>
	</div>
	<div class="flex justify-start flex-wrap gap-4 md:gap-0 items-center mt-4 md:mt-0">
		<div class="w-full md:w-2/4">
			<ApplicationProgress />
		</div>
		<div class="w-full md:w-2/4">
			<img
				src="/images/applicationPreview.png"
				alt="Application Preview"
				class="w-full object-cover"
			/>
		</div>
	</div>
</div>
