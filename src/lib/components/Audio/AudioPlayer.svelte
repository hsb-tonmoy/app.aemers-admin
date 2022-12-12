<script>
	import { Pause, Play } from '$lib/components/Icons';
	import { onDestroy } from 'svelte';
	import AudioWaveform from './AudioWaveform.svelte';

	export let audioBlob = false;
	export let audioSrc = '';
	export let many = false;
	export let autoPlay = false;

	export let dark = false;

	let wavesurfer;

	let isPlaying = false;

	$: if (wavesurfer) {
		wavesurfer.on('play', function () {
			isPlaying = true;
		});

		wavesurfer.on('pause', function () {
			isPlaying = false;
		});
	}

	function handlePlayPause() {
		wavesurfer.playPause();
	}

	$: if (wavesurfer && autoPlay) {
		wavesurfer.on('ready', wavesurfer.play.bind(wavesurfer));
	}

	onDestroy(() => {
		if (wavesurfer) wavesurfer.destroy();
	});
</script>

<div class="flex items-center gap-x-2">
	<button
		on:click={handlePlayPause}
		class="shrink-0 inline-flex items-center {dark
			? 'bg-white hover:bg-primaryDarker text-primary hover:text-white'
			: 'bg-primary hover:bg-primaryDarker text-white'} w-6 h-6 md:w-12 md:h-12 xl:w-14 xl:h-14 rounded-full p-1 md:p-3 xl:p-4"
	>
		<span class="block w-full">
			{#if isPlaying}
				<Pause />
			{:else}
				<Play />
			{/if}
		</span>
	</button>
	<AudioWaveform
		cursorColor={dark ? '#7443FF' : 'fff'}
		progressColor={dark ? '#fff' : '#7443FF'}
		{many}
		{audioBlob}
		bind:wavesurfer
		{audioSrc}
	/>
</div>
