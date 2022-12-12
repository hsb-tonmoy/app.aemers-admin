<script lang="ts">
	// Value prop exposed. Won't be picked up by Felte.

	export let type: string = 'text';
	export let name: string;
	export let id: string;
	export let value = '';
	export let classes: string = 'w-full';
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let touched: boolean = false;
	export let error: boolean = false;

	const setType = (node) => {
		node.type = type;
	};
</script>

<input
	use:setType
	{name}
	bind:value
	{id}
	{disabled}
	class={`form-input border border-borderColor focus:border-primary focus:ring focus:ring-primary disabled:bg-gray-300 ${
		error ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : ''
	} ${
		touched && !error ? 'border-2 border-greenSignal ring-greenSignal' : ''
	} text-sm rounded-xl block py-4 px-5 ${classes}`}
	{placeholder}
/>
