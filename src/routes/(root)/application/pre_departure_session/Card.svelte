<script lang="ts">
	import { CalendarDays, Clock, Map } from '$lib/components/Icons';
	import { Button } from '$lib/components/Form';
	import { notificationSuccessToast, notificationToast } from '$lib/NotificationToast';
	import { useMutation } from '@sveltestack/svelte-query';
	import { invalidateAll } from '$app/navigation';
	export let id: string;
	export let user_id: string;
	export let img: string;
	export let img_alt: string;
	export let heading: string;
	export let date: string;
	export let time: string;
	export let location: string;

	const registerSession = useMutation(
		() => {
			return fetch(`/application/pre_departure_session`, {
				method: 'POST',
				body: JSON.stringify({
					pre_departure_session: id,
					user: user_id
				})
			});
		},
		{
			onSettled: async (data, error, variables, context) => {
				if (!data.ok || error) {
					notificationToast('Something went wrong, please try again later');
					console.log(await data.json(), error);
				} else {
					notificationSuccessToast(`You have successfully registered for the session!`);
					invalidateAll();
				}
			}
		}
	);
</script>

<div class="border border-borderColor rounded-2xl p-6">
	<div class="flex flex-col w-3/4">
		<img src={img} class="w-20 h-20 rounded-full" alt={img_alt} />
		<h6 class="text-secondary font-bold text-lg md:text-xl my-4">
			{heading}
		</h6>
		<div class="flex flex-wrap gap-y-2 gap-x-6">
			<div class="inline-flex items-center gap-x-1 text-secondary text-base">
				<span class="text-primary block w-4 h-4"><CalendarDays /></span>{date}
			</div>
			<div class="inline-flex items-center gap-x-1 text-secondary text-base">
				<span class="text-primary block w-4 h-4"><Clock /></span>{time}
			</div>
			<div class="inline-flex items-center gap-x-1 text-secondary text-base">
				<span class="text-primary block w-4 h-4"><Map /></span>{location}
			</div>
		</div>
		<Button
			on:click={() => $registerSession.mutate()}
			loading={$registerSession.isLoading}
			classes="self-start px-4 py-2 mt-4"
			text="Register"
		/>
	</div>
</div>
