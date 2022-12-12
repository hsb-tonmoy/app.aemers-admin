<script lang="ts">
	// A bootstrap step component
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	import { createEventDispatcher } from 'svelte';
	import Check from '../Icons/CheckMark.svelte';

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
	export let fontFamily = '';
	export let reverse = false;
	export let clickable = true;
	export let keepIcon = false;

	const minStepSize = '5rem';
	const stepLabelSpace = '1rem';

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
	let onClick = (i: number) => {
		if (clickable && i < current) {
			let last = current;
			current = i;
			// $progress = i
			dispatch('click', { current, last });
		}
	};
</script>

<div
	class="steps-container"
	style={`--size: ${size}; 
				--line-thickness: ${line};
				--primary: ${primary}; 
				--secondary: ${secondary};
				--light: ${light};
				--dark: ${dark};
				--border-radius: ${borderRadius};
				--line-color: ${lineColor};
				--icon-color: ${iconColor};
				--font-family: ${fontFamily || "'Helvetica Neue', Helvetica, Arial, sans-serif"};
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
								{i <= $progress ? `text-primary` : `icon-color`}
								"
						class:step-border__completed={i <= $progress}
						class:step-border={!(i <= $progress)}
						class:hover-highlight={clickable}
						class:shadow={i == current}
						on:click={() => {
							onClick(i);
						}}
					>
						{#if step.icon}
							{#if i < $progress && !keepIcon}
								<Check />
							{:else if step.iconProps}
								<span style="width: {iconSize}; height: {iconSize}">
									<svelte:component this={step.icon} {...step.iconProps} />
								</span>
							{:else}
								<span style="width: {iconSize}; height: {iconSize}">
									<svelte:component this={step.icon} />
								</span>
							{/if}
						{:else if i < $progress && !keepIcon}
							<Check />
						{:else}
							<span class="steps__number">{i + 1}</span>
						{/if}
					</div>
					<!-- text label -->
					<div
						class="steps__label"
						class:hover-highlight={clickable}
						style:margin-left={vertical ? (reverse ? null : stepLabelSpace) : null}
						style:margin-right={vertical ? (reverse ? stepLabelSpace : null) : null}
						style:margin-top={vertical ? null : stepLabelSpace}
						style:text-align={vertical ? (reverse ? 'right' : 'left') : 'center'}
					>
						{#if typeof step.text != 'undefined'}
							<div
								class:text-primary={i <= $progress}
								on:click={() => {
									onClick(i);
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

<style>
	.steps-container {
		font-family: var(--font-family);
	}

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
	.step-border__completed {
		border: 3px solid var(--primary);
	}
	.hover-highlight:hover {
		cursor: pointer;
		filter: brightness(85%);
	}
	.steps__label {
		font-size: larger;
	}

	.text-primary {
		color: var(--primary) !important;
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
