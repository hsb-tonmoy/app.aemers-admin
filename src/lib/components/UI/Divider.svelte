<script>
	export let containerClass = '';
	export let slotClass = 'mx-4 text-secondary';
	export let dividerClass = 'border-secondary';
</script>

<div class="relative flex items-center w-full {containerClass}">
	<div class="flex-grow border-t {dividerClass}" />
	<div class="flex-shrink {slotClass}"><slot /></div>
	<div class="flex-grow border-t {dividerClass}" />
</div>
