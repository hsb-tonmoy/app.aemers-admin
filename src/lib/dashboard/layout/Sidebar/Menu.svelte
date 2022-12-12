<script>
	import { page } from '$app/stores';
	import { Account, Application, Home, Logout, Video } from '$lib/components/Icons';

	let menuitems = [
		{
			name: 'Home',
			icon: Home,
			link: '/',
			alternate_links: []
		},
		{
			name: 'Application',
			icon: Application,
			link: '/welcome_application',
			alternate_links: []
		},
		{
			name: 'Mock Interview',
			icon: Video,
			link: '/mock_visa_interview',
			alternate_links: ['mock_visa_interview']
		},
		{
			name: 'Edit Profile',
			icon: Account,
			link: '/profile/edit',
			alternate_links: []
		},
		{
			name: 'Logout',
			icon: Logout,
			link: '/logout',
			alternate_links: []
		}
	];
</script>

<section id="menu" class="flex flex-col gap-y-10">
	{#each menuitems as item}
		<a
			href={item.link}
			class="menuItem {$page.url.pathname === item.link ||
			item.alternate_links.includes($page.url.pathname)
				? 'menuItem-active'
				: ''}"
			><span class="w-7 h-7">
				<svelte:component this={item.icon} />
			</span> <span class="">{item.name}</span></a
		>
	{/each}
</section>

<style lang="postcss">
	.menuItem {
		@apply flex items-center gap-x-4 text-lighterText hover:text-primary text-base font-normal;
	}

	.menuItem-active {
		@apply font-bold text-primary;
	}
</style>
