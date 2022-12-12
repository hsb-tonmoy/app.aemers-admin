<script>
	import Card from './Card.svelte';
	import Registered from './Registered.svelte';

	export let data;
</script>

<svelte:head>
	<title>app.aemers - Pre-Departure Session</title>
</svelte:head>

<div class="flex flex-col gap-8 px-14 py-8 xl:px-20 xl:py-12 bg-white rounded-2xl w-full">
	{#if data.participation}
		<Registered
			date={data.participation.pre_departure_session.date}
			time={data.participation.pre_departure_session.time}
			location={data.participation.pre_departure_session.location}
		/>
	{:else}
		<div class="flex flex-col w-full md:w-3/4 xl:w-2/4 2xl:w-1/3 mb-6">
			<h2 class="text-secondary font-bold text-2xl mb-2">RSVP for a Session</h2>
			<span class="text-lighterText text-sm"
				>Participate in a session to learn about pre-departure activites</span
			>
		</div>
		{#if data.pre_departure_sessions === null}
			<h6 class="text-primary font-bold text-3xl text-center">
				Sorry! We don't have any session scheduled right now
			</h6>
			<span class="text-lighterText text-base font-medium"
				>You will be sent an email when we have new sessions.</span
			>
		{:else}
			<div class="grid md:grid-cols-2 2xl:grid-cols-3 gap-6">
				{#each data.pre_departure_sessions as session}
					<Card
						id={session.id}
						img={session.image}
						img_alt={session.title}
						heading={session.title}
						date={session.date}
						time={session.time}
						location={session.location}
						user_id={data.user.pk}
					/>
				{/each}
			</div>
		{/if}
	{/if}
</div>
