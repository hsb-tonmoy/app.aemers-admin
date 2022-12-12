<script>
	import Success from '$lib/components/UI/Success.svelte';
	import { showNextToolTip } from '../../stores';

	$: showNextToolTip.set(true);
</script>

<div
	class="flex flex-col items-center justify-center mx-auto px-10 py-6 h-[50vh] bg-white rounded-2xl"
>
	<Success />
	<h3 class="text-secondary font-bold text-2xl mb-2">File is Opened</h3>
	<p class="text-lighterText text-sm mt-2">
		Congrats! You will get a call back from us for your orientation.
	</p>
</div>
