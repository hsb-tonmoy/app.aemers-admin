<script>
	let klass = '';
	export { klass as class };
	export let indeterminate = false;
	export let rotate = 0;
	export let size = 32;
	export let value = 0;
	export let width = 4;
	export let underlayColor = '#5f27ff';
	export let progressWidth;
	export let style = '';

	const radius = 20;
	const circumference = 2 * 3.1416 * radius;
	const viewBoxSize = radius / (1 - Number(width) / +size);
	const strokeWidth = (Number(width) / +size) * viewBoxSize * 2;
	$: strokeDashOffset = ((100 - value) / 100) * circumference;

	const circleProps = {
		fill: 'transparent',
		cx: 2 * viewBoxSize,
		cy: 2 * viewBoxSize,
		r: radius,
		'stroke-width': strokeWidth,
		'stroke-dasharray': circumference
	};
</script>

<div
	role="progressbar"
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow={value}
	class="s-progress-circular {klass}"
	class:indeterminate
	style="width:{size}px;height:{size}px;z-index:1;{style}"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="{viewBoxSize}
    {viewBoxSize}
    {2 * viewBoxSize}
    {2 * viewBoxSize}"
		style="transform: rotate({rotate}deg)"
	>
		{#if !indeterminate}
			<circle
				class="underlay"
				style="stroke: {underlayColor}"
				{...circleProps}
				stroke-dashoffset="0"
			/>
		{/if}

		<circle
			class="overlay"
			style="stroke-width: {progressWidth}"
			{...circleProps}
			stroke-dashoffset={strokeDashOffset}
		/>
	</svg>

	<div class="s-progress-circular__content">
		<slot />
	</div>
</div>

<style>
	.underlay {
		z-index: 1;
	}
	.overlay {
		stroke: currentColor;
		z-index: 2;
		transition: all 0.6s ease-in-out;
	}
	svg {
		width: 100%;
		height: 100%;
		margin: auto;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 0;
	}
	.s-progress-circular {
		position: relative;
		display: inline-flex;
		vertical-align: middle;
		justify-content: center;
		align-items: center;
	}
	@keyframes progress-circular-dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 100, 200;
			stroke-dashoffset: -15px;
		}
		100% {
			stroke-dasharray: 100, 200;
			stroke-dashoffset: -125px;
		}
	}
	@keyframes progress-circular-rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	.s-progress-circular.indeterminate svg {
		animation: progress-circular-rotate 1.4s linear infinite;
		transform-origin: center center;
		transition: all 0.2s ease-in-out;
	}
	.s-progress-circular.indeterminate .overlay {
		animation: progress-circular-dash 1.4s ease-in-out infinite;
		stroke-linecap: round;
		stroke-dasharray: 80, 200;
		stroke-dashoffset: 0;
	}
	.s-progress-circular__content {
		align-items: center;
		display: flex;
		justify-content: center;
	}
</style>
