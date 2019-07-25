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

// class Scene {
// 	constructor() {
// 		this.changeEmitter = new Emitter();
// 	}

// 	move() {
// 		this.changeEmitter.emit();
// 	}
// }

// class Game {
// 	constructor() {
// 		this.scene = new Scene();

// 		this.scene.changeEmitter.subscribe( () => {
// 			console.log( this.scene );
// 		} );

// 		this.scene.move();
// 	}
// }