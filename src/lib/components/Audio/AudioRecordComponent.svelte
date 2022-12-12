<script>
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { CheckMark, Microphone, Square } from '$lib/components/Icons';

	const dispatch = createEventDispatcher();
	let stream;
	let media = [];
	let mediaRecorder = null;
	export let blob;
	export let recording = false;
	export let recorded = false;
	export let timer;
	let startTime = 0;
	let stopTime = 0;

	onMount(async () => {
		const { MediaRecorder } = await import('extendable-media-recorder');

		stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });
		mediaRecorder.ondataavailable = (e) => media.push(e.data);
		mediaRecorder.onstop = function () {
			stopTime = Date.now();
			blob = new Blob(media, { type: 'audio/wav' });
			media = [];
			stream.getTracks().forEach((track) => track.stop());
			dispatch('finished', {
				duration: stopTime - startTime
			});
		};
	});

	onDestroy(() => {
		stream.getTracks().forEach((track) => track.stop());
	});

	function startRecording() {
		mediaRecorder.start();
		startTime = Date.now();
		recording = true;
		timer.resume();
	}

	function stopRecording() {
		mediaRecorder.stop();
		recording = false;
		recorded = true;

		if (timer.status === 'running') {
			timer.stop();
		}
	}

	$: timer &&
		timer.on('done', () => {
			stopRecording();
		});

	function handleClick() {
		if (recording) {
			stopRecording();
		} else {
			startRecording();
		}
	}
</script>

<button
	disabled={recorded}
	on:click={handleClick}
	class="{recording
		? 'recording'
		: ''} flex items-center bg-primary p-3 text-white w-12 h-12 md:w-14 md:h-14 rounded-full"
>
	<span class="block w-full">
		{#if recorded}
			<CheckMark />
		{:else if recording}
			<Square />
		{:else}
			<Microphone />
		{/if}
	</span>
</button>

<style global>
	.recording {
		animation: pulse 0.8s infinite;
		animation-timing-function: linear;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 #7543ff38;
		}
		70% {
			box-shadow: 0 0 0 10px #7543ff85;
		}
		100% {
			box-shadow: 0 0 0 0 #7543ff9c;
		}
	}
</style>
