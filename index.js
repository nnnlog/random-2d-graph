const mt_rand = (min, max) => {
	// discuss at: https://locutus.io/php/mt_rand/
	// original by: Onno Marsman (https://twitter.com/onnomarsman)
	// improved by: Brett Zamir (https://brett-zamir.me)
	const argc = arguments.length;
	if (argc === 0) {
		min = 0;
		max = 2147483647;
	} else if (argc === 1) {
		throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
	} else {
		min = parseInt(min, 10);
		max = parseInt(max, 10);
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

let arr = [];
const gen = (l, r, minY, maxY) => {
	if (l > r) {
		return 0;
	}
	let m = (l + r) >> 1;
	arr[m] = (minY + maxY) >> 1;
	let mid = arr[m] + mt_rand(-minY, minY);
	if (maxY - mid > mid - minY) minY = mid;
	else maxY = mid;
	let sum = gen(l, m - 1, minY, maxY) + gen(m + 1, r, minY, maxY);
	arr[m] = Math.floor((sum + arr[m]) / (r - l + 1));
	return sum + arr[m];
};

module.exports = (sz) => {
	arr = new Array(sz + 1);
	arr[1] = arr[sz] = 0;
	gen(1, sz, 0, sz);
	let minimum = 1e9;
	arr.slice(1).forEach(a => minimum = Math.min(minimum, a));
	minimum = Math.min(minimum, 0);
	for (let i = 0; i < arr.length; i++) arr[i] -= minimum;
	return arr.slice(1);
};
