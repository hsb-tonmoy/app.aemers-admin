<script lang="ts">
	import { Badge, Radio } from 'flowbite-svelte';
	import { CheckMark } from '../Icons';

	export let value: string;
	export let name: string;
</script>

<div class="relative">
	<Radio {value} {name} custom>
		<div
			class="inline-flex justify-center items-center py-8 min-w-[12rem] w-full text-secondary bg-white rounded-lg border border-borderColor cursor-pointer  peer-checked:border-primary peer-checked:text-primary hover:text-black hover:bg-gray-100"
		>
			<span class="text-center w-full text-lg font-semibold"><slot /></span>
		</div>
		<div class="hidden peer-checked:block">
			<Badge rounded index baseClass="badge inline-flex items-center justify-center -mb-0.5"
				><span class="w-3 h-3 text-white"><CheckMark /></span></Badge
			>
		</div>
	</Radio>
</div>
