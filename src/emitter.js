export class Emitter {
	constructor() {
		this.functions = [];
	}
	subscribe( fn ) {
		this.functions.push( fn );
	}
	emit() {
		for ( const fn of this.functions ) {
			fn();
		}
	}
}
