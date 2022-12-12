<script lang="ts">
	export let iconAlign: string = 'right';
	export let iconClass: string = 'block w-7 h-7 text-primary mr-6';
	export let type: string = 'text';
	export let name: string;
	export let id: string;
	export let classes: string = 'w-full';
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let touched: boolean = false;
	export let error: boolean = false;
</script>

<div class="relative">
	{#if iconAlign === 'left'}
		<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
			<span class={iconClass}>
				<slot />
			</span>
		</div>
	{/if}
	<input
		{type}
		{id}
		{name}
		{disabled}
		class={`form-input border border-borderColor focus:border-primary focus:ring focus:ring-primary disabled:bg-gray-300 ${
			error ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : ''
		} ${
			touched && !error ? 'border-2 border-greenSignal ring-greenSignal' : ''
		} text-sm rounded-xl block py-4 px-5 ${classes}`}
		{placeholder}
	/>
	{#if iconAlign === 'right'}
		<div class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
			<span class={iconClass}>
				<slot />
			</span>
		</div>
	{/if}
</div>
