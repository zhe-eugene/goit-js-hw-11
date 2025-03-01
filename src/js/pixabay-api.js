import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://pixabay.com/api/',
	params: {
		key: '49094425-ee2da42b6a4a3e6a1c3a9f546',
		image_type: 'photo',
		orientation: 'horizontal',
		safesearch: true,
	},
});

export function getSearchResult(query) {
	return axiosInstance.get('', { params: { q: query } }).then(response => {
		if (response.data.hits.length === 0) {
			throw new Error('No images found');
		}
		return response.data;
	});
}
