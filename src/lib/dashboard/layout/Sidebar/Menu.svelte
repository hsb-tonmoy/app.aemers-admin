<script>
	import { page } from '$app/stores';
	import { Account, Folder, Home, Logout, UserGroup } from '$lib/components/Icons';

	let menuitems = [
		{
			name: 'Dashboard',
			icon: Home,
			link: '/',
			alternate_links: []
		},
		{
			name: 'Converted Clients',
			icon: Folder,
			link: '/welcome_application',
			alternate_links: []
		},
		{
			name: 'Student Info',
			icon: UserGroup,
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
