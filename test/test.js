const generator = require("../index");
const SZ = 10000;
let y = generator(SZ);

const {plot} = require("nodeplotlib");
let x = [];
for (let i = 1; i <= SZ; i++) x.push(i);
let data = [{
	x, y,
	type: 'line',
}];
plot(data);
