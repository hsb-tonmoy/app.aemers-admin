<script>
	import {
		AemersCircular,
		CheckedCircle,
		OpenEnvelope,
		RedCircularCross
	} from '$lib/components/Icons';
	import { useMutation } from '@sveltestack/svelte-query';
	import { DropdownItem } from 'flowbite-svelte';

	export let notification;

	const markAsRead = useMutation(
		() => {
			return fetch(`/notifications?id=${notification.id}/`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ unread: false })
			});
		},
		{
			onSuccess: async (data, variables, context) => {
				notification.unread = false;
				if (!(data.status === 200)) {
					notificationToast('Something went wrong, please try again later');
					console.log(await data.json());
				}
			}
		}
	);
</script>

<DropdownItem
	class={`flex flex-col px-5 py-5 rounded-xl 
${notification.level === 'success' ? 'bg-[#E9FFF7]' : ''} ${
		notification.level === 'info' ? 'bg-[#F7F4FF]' : ''
	} ${notification.level === 'error' ? 'bg-[#FFEEEE]' : ''}`}
>
	<div class="flex justify-between items-center gap-x-8">
		<div class="flex items-center gap-x-4">
			{#if notification.level === 'success'}
				<span class="block w-8 h-8 md:w-10 md:h-10 text-greenSignal">
					<CheckedCircle />
				</span>
			{/if}
			{#if notification.level === 'info'}
				<span class="block w-8 h-8 md:w-10 md:h-10">
					<AemersCircular />
				</span>
			{/if}
			{#if notification.level === 'error'}
				<span class="block w-8 h-8 md:w-10 md:h-10">
					<RedCircularCross />
				</span>
			{/if}
			<div class="flex flex-col gap-y-1">
				<span
					class="text-base md:text-lg text-secondary {notification.unread
						? 'font-bold'
						: 'font-normal'}">{notification.description}</span
				>
				<time class="text-xs text-lighterText">{notification.timestamp}</time>
			</div>
		</div>

		<button
			on:click={() => {
				$markAsRead.mutate();
			}}
			class="w-5 h-5 block text-primary font-bold"><OpenEnvelope /></button
		>
	</div>
</DropdownItem>
