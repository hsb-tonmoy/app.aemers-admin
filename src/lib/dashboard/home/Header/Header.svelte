<script>
	export let first_name;
	export let notifications;
	import { Menu, Cross } from '$lib/components/Icons';
	import { sidebarState } from '../stores';
	import AccountDropdown from './AccountDropdown.svelte';
	import NotificationDropDown from './Notifications/NotificationDropDown.svelte';
</script>

<header class="flex justify-between items-center overflow-hidden">
	<div class="flex flex-col gap-y-2">
		<h2 class="text-2xl md:text-4xl 2xl:text-5xl font-bold">Hello {first_name}</h2>
		<h6 class="text-lighterText text-base md:text-lg 2xl:text-xl">Explore Aemers from here...</h6>
	</div>
	<div class="flex items-center gap-x-6">
		<button
			on:click={() => ($sidebarState = !$sidebarState)}
			class="xl:hidden w-6 h-6 md:w-10 md:h-10 text-secondary hover:text-primary cursor-pointer"
		>
			{#if $sidebarState}
				<Menu />
			{:else}
				<Cross />
			{/if}
		</button>

		<div id="notif-tour">
			<NotificationDropDown {notifications} />
		</div>
		<div id="acc-tour">
			<AccountDropdown />
		</div>
	</div>
</header>
