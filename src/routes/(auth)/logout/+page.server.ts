export async function load({ cookies }) {
	await cookies.delete('user');
	await cookies.delete('access');
	await cookies.delete('refresh');
	return { logout: true };
}
