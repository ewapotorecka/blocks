
import { Scene } from './scene';
import { levels } from './levels';
import { Renderer } from './renderer';
import { Emitter } from './emitter';
import { Level } from './common';
import { KeyboardController } from './keyboardcontroller';

export const enum levelStates {
	UNDONE = 0,
	DONE = 1,
	SKIPPED = 2
}

export class Game {
	public levelChangeEmitter = new Emitter();
	public endGameEmitter = new Emitter();
	public levelsInfo: levelStates[];
	public levelNum: number;
	public levels: Level[];
	private scene: Scene;
	private renderer: Renderer;
	private keyboardController: KeyboardController;

	constructor( canvas: HTMLCanvasElement, levels: Level[] ) {
		this.levelsInfo = levels.map( () => levelStates.UNDONE );
		this.levelNum = 0;
		const levelData = levels[ this.levelNum ];
		this.levels = levels;
		this.scene = new Scene( levelData );
		this.keyboardController = new KeyboardController();
		const ctx = canvas.getContext( '2d' );

		if ( ctx == null ) {
			throw new Error( 'Canvas is not supported' );
		}

		this.renderer = new Renderer( ctx, this.scene );
	}

	start() {
		this.renderer.resizeBoard();
		this.renderer.renderBoard();

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

		this.levelChangeEmitter.emit();
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

	public resetGame() {
		this.levelsInfo = levels.map( () => levelStates.UNDONE );
		this.levelNum = 0;
		this.loadLevel( this.levelNum );


	}

	public canLevelBeLoaded( index: number ) {
		if ( index === 0 && this.levelsInfo[ index ] == levelStates.UNDONE ) {
			return true;
		}

		if ( this.levelsInfo[ index ] == levelStates.SKIPPED ) {
			return true;
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

