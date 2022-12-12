<script>
	import { header_bg } from '$lib/login/stores';
	$header_bg = '#F9F6FF';
</script>

<svelte:head>
	<title>app.aemers.com - Verification</title>
</svelte:head>

<section class="flex flex-1 justify-center items-center bg-bgColor">
	<div
		class="flex flex-col items-center justify-center p-12 md:px-40 md:py-32 lg:px-60 lg:py-52 bg-white rounded-3xl"
	>
		<img src="/images/mail_animation.gif" alt="Mail" class="max-w-[20%]" />
		<h2 class="text-3xl font-bold text-center">
			Please check your inbox for a verification email!
		</h2>
	</div>
</section>
