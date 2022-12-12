<script>
	import { Notification, RoundArrows } from '$lib/components/Icons';
	import { Dropdown } from 'flowbite-svelte';
	import NotificationItem from './NotificationItem.svelte';

	export let notifications;

	async function fetchNotifications() {
		const res = await fetch('notifications/');
		const data = await res.json();
		if (res.ok) {
			notifications = data;
		}
	}
	async function markAllAsRead() {
		const res = await fetch('/notifications/?markAsRead=true');
		if (res.status === 200) {
			notifications = notifications.map((notification) => ({ ...notification, unread: false }));
		} else {
			console.log(await res.json());
		}
	}
</script>

<Dropdown label="Notifications" class="min-w-[20rem] md:min-w-[30rem] w-full rounded-none">
	<div slot="trigger" class="relative inline-flex items-center">
		<button
			type="button"
			id="notification"
			class="text-secondary w-6 h-6 md:w-10 md:h-10 focus:ring-0 focus:outline-none"
		>
			<Notification />
		</button>
		<div
			class="inline-flex absolute -bottom-1 -right-1 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full border-2 border-white dark:border-gray-900"
		>
			{notifications.length}
		</div>
	</div>
	<ul slot="content" class="flex flex-col px-6 py-8">
		<div class="flex justify-between items-center">
			<div class="flex items-center gap-x-2">
				<h6 class="text-xl md:text-2xl text-secondary font-bold">Notifications</h6>
				<button
					on:click={fetchNotifications}
					class="block w-4 h-4 text-secondary hover:text-primary"><RoundArrows /></button
				>
			</div>
			{#if notifications.length > 0}
				<button
					on:click={markAllAsRead}
					class="text-primary font-bold underline hover:no-underline hover:text-primaryDarker"
					>Mark all as read</button
				>
			{/if}
		</div>
		<div class="h-px w-full bg-gray-200 mb-6 mt-2" />

		<div class="flex flex-col gap-y-4">
			{#if notifications.length > 0}
				{#each notifications as notification}
					<NotificationItem {notification} />
				{/each}
			{:else}
				<div class="text-center text-sm md:text-base text-lighterText">
					No new notifications to show
				</div>
			{/if}
		</div>
		{#if notifications.length > 0}
			<div class="h-px w-full bg-gray-200" />
		{/if}
		<button
			class="mt-6 self-center text-sm bg-primary hover:bg-primaryDarker text-white font-bold px-4 py-2 rounded-3xl"
			>View all notifications</button
		>
	</ul>
</Dropdown>
