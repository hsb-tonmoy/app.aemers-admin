<script>
	const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

	import { Google } from '$lib/components/Icons';

	const openGoogleLoginPage = () => {
		const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
		const redirectUri = 'login/google';

		const scope = [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile'
		].join(' ');

		const params = {
			response_type: 'code',
			client_id: GOOGLE_CLIENT_ID,
			redirect_uri: `${GOOGLE_REDIRECT_URI}/${redirectUri}`,
			prompt: 'select_account',
			access_type: 'offline',
			scope
		};

		const urlParams = new URLSearchParams(params).toString();

		window.location.href = `${googleAuthUrl}?${urlParams}`;
	};
</script>

<button
	on:click={openGoogleLoginPage}
	type="button"
	class="flex gap-x-2 items-center text-secondary text-lg font-bold border border-borderColor rounded-xl px-10 py-3"
	><span class="block w-4 h-4"><Google /></span>Google</button
>
