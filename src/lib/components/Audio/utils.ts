export function msToTime(s) {
	function pad(n, z) {
		z = z || 2;
		return ('00' + n).slice(-z);
	}

	let ms = s % 1000;
	s = (s - ms) / 1000;
	let secs = s % 60;
	s = (s - secs) / 60;
	let mins = s % 60;

	return pad(mins) + ':' + pad(secs);
}
