<script lang="ts">
	import { Badge, Radio } from 'flowbite-svelte';
	import type { SvelteComponentDev } from 'svelte/internal';
	import { CheckMark } from '../Icons';

	export let value: string;
	export let name: string;
	export let icon: SvelteComponentDev;
	export let iconClass: string = 'w-7 h-7';
</script>

<div class="relative">
	<Radio {value} {name} custom>
		<div
			class="inline-flex flex-col gap-y-2 justify-center items-center py-4 min-w-[12rem] w-full text-lighterText bg-white rounded-lg border border-borderColor cursor-pointer  peer-checked:border-primary peer-checked:text-primary hover:text-black hover:bg-gray-100 text-center font-bold"
		>
			<span style="display: block" class={iconClass}
				><span class=""><svelte:component this={icon} /></span>
			</span>
			<span class="w-full text-lg font-semibold"><slot /></span>
		</div>
		<div class="hidden peer-checked:block">
			<Badge rounded index baseClass="badge inline-flex items-center justify-center -mb-0.5"
				><span class="w-3 h-3 text-white"><CheckMark /></span></Badge
			>
		</div>
	</Radio>
</div>

<style lang="postcss" global>
	.badge {
		@apply bg-greenSignal;
	}
</style>
