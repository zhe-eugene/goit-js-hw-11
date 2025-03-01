import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getSearchResult } from './js/pixabay-api';
import { markupRender } from './js/render-functions';

const refs = {
	form: document.querySelector('form'),
	loader: document.querySelector('.loader'),
	gallery: document.querySelector('.gallery'),
};

let lightbox;

hideLoader();

refs.form.addEventListener('submit', getImgFromSearch);

function getImgFromSearch(e) {
	e.preventDefault();
	refs.gallery.innerHTML = '';
	showLoader();

	const querySearch = e.target.elements.search.value.trim();
	if (!querySearch) {
		showMessage('Please enter a search term!');
		hideLoader();
		return;
	}
	getSearchResult(querySearch)
		.then(data => {
			refs.gallery.innerHTML = markupRender(data.hits);
			if (lightbox) {
				lightbox.refresh();
			} else {
				lightbox = new SimpleLightbox('.gallery a', {
					captions: true,
					captionsData: 'alt',
					captionDelay: 250,
				});
			}
		})
		.catch(error => {
			showMessage(
				'Sorry, there are no images matching <br> your search query. Please, try again!'
			);
		})
		.finally(() => {
			hideLoader();
		});
	e.target.reset();
}

function showLoader() {
	refs.loader.style.display = 'block';
}

function hideLoader() {
	refs.loader.style.display = 'none';
}

function showMessage(message) {
	iziToast.warning({
		message: message,
		titleColor: '#fff',
		titleSize: '16px',
		titleLineHeight: '1.5',
		messageColor: '#fff',
		messageSize: '16px',
		messageLineHeight: '1.5',
		backgroundColor: '#ef4040',
		iconUrl: './img/octagon.svg',
		position: 'topRight',
	});
}
