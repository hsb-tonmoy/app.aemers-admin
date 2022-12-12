<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { CheckMark as Check } from '../Icons';

	export let steps: any[];
	export let current = 0;
	export let vertical = false;
	export let size = vertical ? '2rem' : '3rem';
	export let line = vertical ? '0.15rem' : '0.3rem';
	export let lineHeight = undefined;
	export let iconSize = '1rem';
	export let iconColor = '#949494';
	export let primary = 'var(--bs-primary, #3a86ff)';
	export let secondary = 'var(--bs-secondary, #bbbbc0)';
	export let light = 'var(--bs-light, white)';
	export let dark = 'var(--bs-dark, black)';
	export let borderRadius = '50%';
	export let lineColor = '#d9d9d9';
	export let reverse = false;
	export let minStepSize = '5rem';

	export let stepLabelSpace = '0.75rem';

	// for backward compatible when using lineHeight instead of line
	if (lineHeight) {
		line = lineHeight;
	}

	// each segment is half of the step size
	let segmentSizes: { height: number; width: number }[] = [];
	for (let i = 0; i < steps.length; i++) {
		segmentSizes.push({ height: 0, width: 0 });
	}

	if (current > steps.length - 1) {
		current = steps.length - 1;
	}
	if (current < 0) {
		current = 0;
	}

	let progress = tweened(current, { duration: 400, easing: cubicOut });
	let total = 0;
	let key = vertical ? 'height' : 'width';

	function f(p: number) {
		// 0 - 1: $p * (0 + 1)/2
		// 1 - 2: 1 * (0 + 1)/2 + ($p-1) * (1 + 2)/2
		// 2 - 3: (0 + 1)/2 + (1 + 2)/2 + ($p-2) * (2+3)/2
		let ret = 0;
		let i = 0;
		while (p > 1) {
			p--;
			ret += (segmentSizes[i][key] + segmentSizes[i + 1][key]) / 2;
			i++;
		}
		if (i < segmentSizes.length - 1) {
			ret += (p * (segmentSizes[i][key] + segmentSizes[i + 1][key])) / 2;
		}
		return ret;
	}

	let fill = f(current);

	$: {
		total = 0;
		for (let i = 0; i < steps.length; i++) {
			total += segmentSizes[i][key];
		}
		total -= (segmentSizes[0][key] + segmentSizes[segmentSizes.length - 1][key]) / 2;

		fill = f($progress);
	}

	$: {
		$progress = current;
	}

	const dispatch = createEventDispatcher();
	let onClick = (step, i: number) => {
		if (step.status >= 1) {
			let last = current;
			current = i;
			// $progress = i
			goto(step.path);
			dispatch('click', { current, last });
		}
	};
</script>

<div
	style={`--size: ${size}; 
        --line-thickness: ${line};
        --primary: ${primary}; 
        --secondary: ${secondary};
        --light: ${light};
        --dark: ${dark};
        --border-radius: ${borderRadius};
        --line-color: ${lineColor};
        --icon-color: ${iconColor};
      display: flex; 
      `}
	style:flex-direction={vertical ? (reverse ? 'row-reverse' : 'row') : 'column'}
>
	<!-- progress line container -->
	<div
		style="display: flex; align-items: center;"
		style:flex-direction={vertical ? 'column' : 'row'}
		style:width={vertical ? size : '100%'}
		style:min-width={vertical ? size : null}
		style:height={vertical ? '100%' : size}
		style:min-height={vertical ? null : size}
	>
		<div
			style:width={vertical ? line : `${segmentSizes[0].width / 2}px`}
			style:height={vertical ? `${segmentSizes[0].height / 2}px` : line}
		/>
		<div
			style:width={vertical ? line : `${total}px`}
			style:height={vertical ? `${total}px` : line}
			class="line-color"
			style="display: flex; align-items:center;"
			style:flex-direction={vertical ? 'column' : reverse ? 'row-reverse' : 'row'}
		>
			<div
				class="bg-primary"
				style:width={vertical ? line : `${fill}px`}
				style:height={vertical ? `${fill}px` : line}
			/>
			{#if line != size}
				<!-- the progress indicator -->
				<div class="bg-primary" style="width:8px; height:8px; border-radius: 50%;" />
			{/if}
		</div>
	</div>
	<!--  progress line end -->
	<div
		style="display: flex; justify-content: space-between;"
		style:flex-direction={vertical ? 'column' : reverse ? 'row-reverse' : 'row'}
		style:margin-left={vertical ? (reverse ? null : '-' + size) : null}
		style:margin-right={vertical ? (reverse ? '-' + size : null) : null}
		style:margin-top={vertical ? null : '-' + size}
	>
		{#each steps as step, i}
			<!-- step container -->
			<div
				style="display: flex; align-items:center; flex-grow: 10; width: 100%"
				style:flex-direction={vertical ? (reverse ? 'row-reverse' : 'row') : 'column'}
				bind:clientWidth={segmentSizes[i].width}
				bind:clientHeight={segmentSizes[i].height}
			>
				<!-- circle and text label -->
				<div
					style="display: flex; align-items: center; "
					style:flex-direction={vertical ? (reverse ? 'row-reverse' : 'row') : 'column'}
					style:min-width={vertical ? 'var(--size)' : minStepSize}
					style:min-height={vertical ? minStepSize : 'var(--size)'}
				>
					<!-- circle -->
					<div
						class="step
						cursor-pointer 
                {i <= $progress ? `text-primary` : `text-white`}
                "
						class:step__completed={step.status >= 1}
						class:step-border={step.status >= 1}
						class:shadow={i == current}
						on:click={() => {
							onClick(step, i);
						}}
					>
						{#if step.status === 2}
							<div
								class="inline-flex justify-center items-center bg-primary rounded-full"
								style="width: {iconSize}; height: {iconSize}"
							>
								<span
									class="block text-white"
									style="width: calc({iconSize} - .5rem); height: calc({iconSize} - .5rem)"
								>
									<Check />
								</span>
							</div>
						{:else if step.status === 1}
							<div
								class="inline-flex justify-center items-center bg-primary rounded-full"
								style="width: {iconSize}; height: {iconSize}"
							>
								<span
									class="block text-white"
									style="width: calc({iconSize} - .5rem); height: calc({iconSize} - .5rem)"
								/>
							</div>
						{:else}
							<div
								class="inline-flex justify-center items-center bg-white border-2 border-borderColor rounded-full"
								style="width: {iconSize}; height: {iconSize}"
							/>
						{/if}
					</div>
					<!-- text label -->
					<div
						class="steps__label"
						class:hover-highlight={i < $progress}
						style:margin-left={vertical ? (reverse ? null : stepLabelSpace) : null}
						style:margin-right={vertical ? (reverse ? stepLabelSpace : null) : null}
						style:margin-top={vertical ? null : stepLabelSpace}
						style:text-align={vertical ? (reverse ? 'right' : 'left') : 'center'}
					>
						{#if typeof step.text != 'undefined'}
							<div
								class="cursor-pointer"
								class:text-primary={step.status >= 1}
								class:font-bold={i === $progress}
								on:click={() => {
									onClick(step, i);
								}}
							>
								{step.text}
							</div>
						{:else}
							<div />
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.step {
		background: white;
		border-radius: var(--border-radius);
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--size);
		min-width: var(--size);
		height: var(--size);
		min-height: var(--size);
		font-size: calc(var(--size) * 1);
	}
	.line-color {
		background-color: var(--line-color);
	}
	.icon-color {
		color: var(--icon-color);
	}
	.step-border {
		border: 3px solid var(--secondary);
	}
	.step__completed {
		background: var(--primary);
		border: 3px solid var(--primary);
	}

	.steps__label {
		@apply font-primary text-base;
	}

	.text-light {
		color: var(--light) !important;
	}
	.text-dark {
		color: var(--dark) !important;
	}
	.bg-secondary {
		background-color: var(--secondary) !important;
	}
	.bg-primary {
		background-color: var(--primary) !important;
	}
	.shadow {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
	}
</style>
