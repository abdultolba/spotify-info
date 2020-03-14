export const millisToMinutesAndSeconds = millis => {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export const titleCase = str => {
	var splitStr = str.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] =
			splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(' ');
};

export const parseHashBangArgs = aURL => {
	aURL = aURL || window.location.href;

	var vars = {};
	var hashes = aURL.slice(aURL.indexOf('#') + 1).split('&');

	for (var i = 0; i < hashes.length; i++) {
		var hash = hashes[i].split('=');

		if (hash.length > 1) {
			vars[hash[0]] = hash[1];
		} else {
			vars[hash[0]] = null;
		}
	}

	return vars;
};

export const parseQueryParams = aURL => {
	const url = new URL(aURL);
	return url.searchParams;
};
