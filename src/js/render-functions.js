function galeryTemplate(data) {
	const {
		webformatURL,
		largeImageURL,
		tags,
		likes,
		views,
		comments,
		downloads,
	} = data;

	return `<li class="gallery-item">
        <div>
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        </div>
        <ul class="gallery-sublist">
          <li class="gallery-subitem"><p class="sub-text">Likes</p><p class="sub-value">${likes}</p></li>
          <li class="gallery-subitem"><p class="sub-text">Views</p><p class="sub-value">${views}</p></li>
          <li class="gallery-subitem"><p class="sub-text">Comments</p><p class="sub-value">${comments}</p></li>
          <li class="gallery-subitem"><p class="sub-text">Downloads</p><p class="sub-value">${downloads}</p></li>
        </ul>
      </li>`;
}

export function markupRender(data) {
	return data.map(galeryTemplate).join('');
}
