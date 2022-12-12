<script>
	import { goto } from '$app/navigation';
	import { CheckedCircle, Circle } from '$lib/components/Icons';
	import { application_steps } from '$lib/data/stores';
</script>

<div class="flex flex-col gap-y-2 text-white">
	{#each $application_steps as item, index}
		<li
			class="flex items-center gap-x-2"
			class:hidden={index > 3}
			style="opacity: {100 - index * 30}%;"
		>
			<span class="w-4 h-4 md:w-6 md:h-6">
				{#if item.status === 2}
					<CheckedCircle />
				{:else}
					<Circle />
				{/if}
			</span>
			<span class={`text-sm md:text-base ${item.status === 2 ? 'line-through' : ''} `}
				>{item.text}</span
			>
		</li>
	{/each}
	<button
		on:click={() => goto('/welcome_application')}
		type="button"
		class="self-start text-primary bg-white hover:text-white hover:bg-primaryDarker rounded-xl px-20 py-3 font-bold text-sm md:text-base mt-3 transition-all ease-in-out duration-150"
		>Proceed</button
	>
</div>
