const API_URL = import.meta.env.VITE_API_URL;

// import fetch from 'node-fetch';

async function send({ method, path, data, token = '', file = false }) {
	const opts = {
		method,
		headers: {}
	};

	if (data && !file) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (data && file) {
		opts.body = data;
		// opts.headers = {
		// 	Accept: 'application/json'
		// };
	}

	if (token) {
		opts.headers['Authorization'] = `JWT ${token}`;
	}

	return fetch(`${API_URL}/${path}`, opts);
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token, file) {
	return send({ method: 'POST', path, data, token, file });
}

export function put(path, data, token, file) {
	return send({ method: 'PUT', path, data, token, file });
}
export function patch(path, data, token, file) {
	return send({ method: 'PATCH', path, data, token, file });
}
