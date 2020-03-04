import { Emitter } from "./emitter";
import { Position } from "./common";

const timeInterval = 100;

export class KeyboardController {
	public moveEmitter = new Emitter<Position>();
	private pressedKeys: string[] = [];
	private isIntervalRunning = false;
	private intervalId?: number;
	private movementKeys: readonly string[] = [ 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight' ];

	constructor() {
		this.handleKeyboard();
	}

	private handleKeyboard() {
		document.addEventListener( 'keydown', event => {
			if ( !this.movementKeys.includes( event.key ) ) {
				return;
			}

			if ( this.pressedKeys.includes( event.key ) ) {
				return;
			}

			this.pressedKeys.push( event.key );

			if ( this.isIntervalRunning ) {
				return;
			}

			this.emitLastMovementKey();

			this.intervalId = setInterval( () => {
				this.emitLastMovementKey();
			}, timeInterval );

			this.isIntervalRunning = true;
		} );

		document.addEventListener( 'keyup', event => {
			this.pressedKeys = this.pressedKeys.filter( key => key != event.key );

			if ( this.pressedKeys.length == 0 ) {
				clearInterval( this.intervalId );
				this.isIntervalRunning = false;
			}
		})
	}

	private emitLastMovementKey() {
		const lastPressedKey = this.pressedKeys[ this.pressedKeys.length - 1 ];

		if ( lastPressedKey === 'ArrowUp' ) {
			this.moveEmitter.emit( { x: 0, y: -1 } );
		} else if ( lastPressedKey === 'ArrowDown' ) {
			this.moveEmitter.emit( { x: 0, y: 1 } );
		} else if ( lastPressedKey === 'ArrowLeft' ) {
			this.moveEmitter.emit( { x: -1, y: 0 } );
		} else if ( lastPressedKey === 'ArrowRight' ) {
			this.moveEmitter.emit( { x: 1, y: 0 } );
		}
	}
}