<script>
	import { onMount } from 'svelte';

	let containerID = (Math.random() + 1).toString(36).substring(7);

	let container = `#waveform-${containerID}`;

	let waveSurfer;

	export let many = false;

	export let audioBlob = false;

	export let audioSrc;

	export let wavesurfer;

	export let waveColor = '#BEBEBE';

	export let progressColor = '#7443FF';

	export let cursorColor = '#fff';

	export let barWidth = 3;

	export let barRadius = 3;

	export let barGap = 2;

	const initProgress = async () => {
		try {
			waveSurfer = (await import('wavesurfer.js')).default;
			wavesurfer = waveSurfer.create({
				container: many ? container : '#waveform',
				backend: audioBlob ? 'MediaElement' : 'WebAudio',
				waveColor: waveColor,
				progressColor: progressColor,
				cursorColor: cursorColor,
				barWidth: barWidth,
				barRadius: barRadius,
				barGap: barGap
			});
			if (audioBlob) {
				let audio = new Audio();
				try {
					audio.srcObject = audioSrc;
				} catch (error) {
					audio.src = URL.createObjectURL(audioSrc);
				}
				wavesurfer.load(audio);
			} else {
				wavesurfer.load(audioSrc);
			}
		} catch (error) {
			console.error(error);
		}
	};

	onMount(() => {
		initProgress();
	});
</script>

{#if many}
	<div id="waveform-{containerID}" class="w-full" />
{:else}
	<div id="waveform" class="w-full" />
{/if}
