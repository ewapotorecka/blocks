
import { Scene } from './scene';
import { levels } from './levels';
import { Renderer } from './renderer';

export class Game {
	start() {
		this.levelNum = 0;
		const levelData = levels[ this.levelNum ];
		this.scene = new Scene( levelData );

		const canvas = document.getElementById( 'blocksBoard' );
		this.ctx = canvas.getContext( '2d' );

		this.renderer = new Renderer( this.ctx, this.scene );
		this.renderer.resizeBoard();
		this.renderer.renderBoard();
		this.handleKeyboard();

		window.addEventListener( 'resize', () => {
			this.renderer.resizeBoard();
			this.renderer.renderBoard();
		} );
	}

	loadNextLevel() {
		const num = this.levelNum + 1;

		this.loadLevel( num );
	}

	loadLevel( id ) {
		this.levelNum = id;
		const level = levels[ this.levelNum ];
		this.scene.setLevelData( level );
		this.renderer.resizeBoard();
		this.renderer.renderBoard();
	}

	move( moveVector ) {
		const newPosition = {
			x: this.scene.playerPosition.x + moveVector.x,
			y: this.scene.playerPosition.y + moveVector.y
		};

		if ( !this.scene.isPositionOnBoard( newPosition ) ) {
			return;
		}

		if ( this.scene.isExitAt( newPosition ) ) {
			this.scene.playerPosition = newPosition;
			this.loadNextLevel();
			return;
		}

		if ( this.scene.isEmptyAt( newPosition ) ) {
			this.scene.playerPosition = newPosition;
		} else {
			const block = this.scene.findBlock( newPosition );

			if ( this.scene.canBlockBeMoved( block, moveVector ) ) {
				this.scene.playerPosition = newPosition;
				block.updatePosition( moveVector );
			}
		}
	}

	handleKeyboard() {
		document.addEventListener( 'keyup', event => {
			if ( event.key === 'ArrowUp' ) {
				this.move( { x: 0, y: -1 } );
				this.renderer.renderBoard();
			} else if ( event.key === 'ArrowDown' ) {
				this.move( { x: 0, y: 1 } );
				this.renderer.renderBoard();
			} else if ( event.key === 'ArrowLeft' ) {
				this.move( { x: -1, y: 0 } );
				this.renderer.renderBoard();
			} else if ( event.key === 'ArrowRight' ) {
				this.move( { x: 1, y: 0 } );
				this.renderer.renderBoard();
			}
		} );
	}
}
