<script lang="ts">
	import Success from '$lib/components/UI/Success.svelte';
	import { CalendarDays, Clock, Map } from '$lib/components/Icons';
	import { Button } from '$lib/components/Form';

	export let date: string;
	export let time: string;
	export let location: string;
</script>

<div class="flex flex-col items-center">
	<Success />
	<h3 class="font-bold text-secondary text-xl md:text-3xl text-center my-4">
		Your Pre-Departure session is successfully booked.
	</h3>
	<div class="flex flex-col md:flex-row items-center gap-4">
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
	<span class="text-lighterText text-sm my-4">Check your email for more details...</span>
	<a href="/application/welcome_to_usa"
		><Button text="Next Step" classes="px-6 py-3 md:px-10 md:py-4" /></a
	>
</div>
