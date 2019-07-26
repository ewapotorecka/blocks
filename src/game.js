
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
		this.levelInfo = document.getElementById( 'level' );
		this.levelList = document.getElementById( 'level-list' );

		this.renderer = new Renderer( this.ctx, this.scene );
		this.renderer.resizeBoard();
		this.renderer.renderBoard();
		this.handleKeyboard();

		this.scene.levelChangeEmitter.subscribe( () => this.loadNextLevel() );

		this.levelInfo.innerText = `Level ${ this.levelNum + 1 } `;
		for ( let i = levels.length - 1; i >= 0; i-- ) {
			const button = document.createElement( 'BUTTON' );
			this.levelList.appendChild( button );
			button.innerText = levels[ i ].id;
			button.setAttribute( 'id', levels[ i ].id );
		}

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
		this.levelInfo.innerText = `Level ${ this.levelNum + 1 } `;

	}

	handleKeyboard() {
		document.addEventListener( 'keyup', event => {
			if ( event.key === 'ArrowUp' ) {
				this.scene.move( { x: 0, y: -1 } );
			} else if ( event.key === 'ArrowDown' ) {
				this.scene.move( { x: 0, y: 1 } );
			} else if ( event.key === 'ArrowLeft' ) {
				this.scene.move( { x: -1, y: 0 } );
			} else if ( event.key === 'ArrowRight' ) {
				this.scene.move( { x: 1, y: 0 } );
			}
			this.renderer.renderBoard();
		} );
	}
}
