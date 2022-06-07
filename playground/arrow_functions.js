const square = (x) => {
	try {
		const value = parseFloat(x);
		const result = parseFloat(x*x);
		const components = { value, result };
		return components;
	} catch {
		console.log('parameter is not a squareable integer of float');
		return 1;
	}
};

const difference = (x,y) => {
	const values = { x,y };
	const difference = parseFloat(x - y);
	return { values, difference }; 
};

const x = square(.1501);
const y = square(.1051);
const z = difference(x.value, y.value);
console.log(`${x.value}^2\t`, x.result);
console.log(`${y.value}^2\t`, y.result);
console.log(z);

const user = {
	name: 'jill',
	say_bye: () => {
		console.log(arguments);
		console.log(`bye ${this.name}`) 
	},
	say_hi(){ 
		console.log(arguments);
		const hi = `i am ${this.name}`;
		return hi; 
	}
};
console.log(user.name)
console.log(user.say_hi());
console.log(user.say_bye());
console.log(user.say_hi(1,2,3,4,5,6,7,8,9));