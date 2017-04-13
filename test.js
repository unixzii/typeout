const chalk = require('chalk');

const deferred = require('./deferred');
const typeout = require('./');

const cases = [
	{
		desc: 'test general use case',
		text: 'Welcome to use typeout, a fancy text printer.\n',
		opt: {}
	},

	{
		desc: 'test duration option',
		text: 'You can specific milliseconds in which text must print out.\n',
		opt: {duration: 300}
	},

	{
		desc: 'test delay option',
		text: 'You can specific the delay of every character.\n',
		opt: {delay: 100}
	},

	{
		desc: 'test interruptable option',
		text: 'Don\'t want to make users wait for this silly animation? Enable the `interruptable` option and we can skip it by pressing any key!\n',
		opt: {delay: 50, interruptable: true}
	}
];

async function test() {
	const tasks = [];

	for (const i in cases) {
		if (Object.prototype.hasOwnProperty.call(cases, i)) {
			tasks.push(async () => {
				if (Number(i) !== 0) {
					console.log('\n');
				}
				console.log(chalk.green(`[${1 + Number(i)}/${cases.length}] ${cases[i].desc}:`));
				await typeout(cases[i].text, cases[i].opt);
			});
		}
	}

	await tasks.reduce((promise, task) => {
		return promise.then(() => {
			return task();
		});
	}, deferred());

	console.log(chalk.green('\n\n🤘  All done!!'));
}

test();
