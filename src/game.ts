
import { Scene } from './scene';
import { levels } from './levels';
import { Renderer } from './renderer';
import { Emitter } from './emitter';
import { Level } from './common';
import { KeyboardController } from './keyboardcontroller';
import { ImageManager } from './imageManager';

export const enum levelStates {
	UNDONE = 0,
	DONE = 1,
	SKIPPED = 2
}

export class Game {
	public levelChangeEmitter = new Emitter();
	public endGameEmitter = new Emitter();
	public levelNum: number;
	private scene: Scene;
	private renderer: Renderer;
	private keyboardController: KeyboardController;

	constructor(
		canvas: HTMLCanvasElement,
		public levels: Level[],
		public levelsInfo = levels.map( () => levelStates.UNDONE ),
		public imageManager: ImageManager
	) {
		this.levelNum = -1;
		this.scene = new Scene();
		this.keyboardController = new KeyboardController();
		const ctx = canvas.getContext( '2d' );

		if ( !ctx ) {
			throw new Error( 'Canvas is not supported' );
		}

		this.renderer = new Renderer( ctx, this.scene, imageManager );
	}

	start() {
		this.keyboardController.moveEmitter.subscribe( moveVector => {
			this.scene.movePlayer( moveVector );
			this.renderer.animate();
		} );

		this.scene.levelChangeEmitter.subscribe( () => {
			this.levelsInfo[ this.levelNum ] = levelStates.DONE;
			this.loadNextLevel();
		} );

		window.addEventListener( 'resize', () => {
			this.renderer.resizeBoard();
			this.renderer.renderBoard();
		} );

		this.loadNextLevel();
	}

	public loadNextLevel() {
		let nextLevelIndex = this.levelNum + 1;

		if ( nextLevelIndex >= this.levels.length ) {
			if ( this.levelsInfo.every( state => state == levelStates.DONE ) ) {
				this.endGameEmitter.emit();
			}

			return;
		}

		if ( this.levelsInfo[ nextLevelIndex ] == levelStates.DONE ) {
			nextLevelIndex = this.levelsInfo.findIndex( state => state == levelStates.UNDONE || state == levelStates.SKIPPED );
		}

		this.loadLevel( nextLevelIndex );
	}

	public loadLevel( id: number ) {
		this.levelNum = id;
		const level = levels[ this.levelNum ];
		this.scene.setLevelData( level );
		this.renderer.resizeBoard();
		this.renderer.renderBoard();
		this.levelChangeEmitter.emit();
	}

	public skipCurrentLevel() {
		this.levelsInfo[ this.levelNum ] = levelStates.SKIPPED;
		this.loadNextLevel();
	}

	public resetLevel() {
		this.levelsInfo = levels.map( () => levelStates.UNDONE );
		this.levelNum = 0;
		this.loadLevel( this.levelNum );
	}

	public resetGame() {
		localStorage.clear();
		for ( let i = 0; i < this.levelsInfo.length; i++ ) {
			this.levelsInfo[ i ] = 0;
		}
		this.loadLevel( 0 );
	}

	public canLevelBeLoaded( index: number ) {
		if ( index === 0 && this.levelsInfo[ index ] == levelStates.UNDONE ) {
			return true;
		}

		if ( this.levelsInfo[ index ] == levelStates.SKIPPED ) {
			return true;
		}

		if ( this.levelsInfo[ index ] == levelStates.DONE ) {
			return false;
		}

		if (
			this.levelsInfo[ index - 1 ] == levelStates.DONE ||
			this.levelsInfo[ index - 1 ] == levelStates.SKIPPED
		) {
			return true;
		}

		return false;
	}
}

