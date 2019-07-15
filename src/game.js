
import { Scene } from './scene';
import { levels } from './levels';

export class Game {
	start() {
		this.levelNum = 0;
		const levelData = levels[ this.levelNum ];
		this.scene = new Scene( levelData );
		this.sizeBoard();

		const canvas = document.getElementById( 'blocksBoard' );
		this.ctx = canvas.getContext( '2d' );
		canvas.height = this.scene.board.height * this.tileSize;
		canvas.width = this.scene.board.width * this.tileSize;

		this.renderBoard();
		this.helper();
	}

	// TODO: The `Renderer` class would be cool here. This class could render (draw) the current scene on the canvas.
	// TODO: So instead we could have the `this.renderer.render();` invocation.
	// TODO: The tile size could be calculated in the renderer.
	renderBoard() {
		this.clearCanvas();
		this.drawBoard();
		this.drawBlocks();
		this.drawPlayer();
		this.drawExit();
	}

	clearCanvas() {
		this.ctx.clearRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );
	}

	drawBoard() {
		const board = this.scene.board;

		this.ctx.strokeRect(
			0, 0, board.width * this.tileSize, board.height * this.tileSize
		);
	}

	drawBlocks() {
		const colorAdd = 255 / this.scene.blocks.length;
		let colorNum = 0;
		for ( const block of this.scene.blocks ) {
			const color = `rgb( ${ colorNum }, ${ colorNum }, ${ colorNum } )`;

			block.draw( this.ctx, color, this.tileSize );
			colorNum = colorNum + colorAdd;
		}
	}

	drawPlayer() {
		const player = this.scene.playerPosition;
		this.ctx.fillStyle = '#FAED26';
		this.ctx.beginPath();
		this.ctx.arc(
			player.x * this.tileSize + this.tileSize / 2, player.y * this.tileSize + this.tileSize / 2, this.tileSize / 2, 0, 2 * Math.PI
		);
		this.ctx.fill();
	}

	drawExit() {
		const exit = this.scene.exit;
		this.ctx.fillStyle = '#E64398';
		this.ctx.fillRect( exit.x * this.tileSize, exit.y * this.tileSize, this.tileSize, this.tileSize );
	}

	loadLevel( id ) {
		this.levelNum = id;
		const level = levels[ this.levelNum ];
		this.scene.setLevelData( level );
		this.tileSize = window.innerHeight / level.board.height;
		this.ctx.canvas.height = level.board.height * this.tileSize;
		this.ctx.canvas.width = level.board.width * this.tileSize;
		this.renderBoard();
	}
	loadNextLevel() {
		const num = this.levelNum + 1;
		this.loadLevel( num );
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

	sizeBoard() {
		if ( window.innerHeight / this.scene.board.height < ( window.innerWidth - 400 ) / this.scene.board.width ) {
			this.tileSize = window.innerHeight / this.scene.board.height;
		} else {
			this.tileSize = ( window.innerWidth - 400 ) / this.scene.board.width;
		}
	}

	helper() {
		document.addEventListener( 'keyup', event => {
			if ( event.key === 'ArrowUp' ) {
				this.move( { x: 0, y: -1 } );
				this.renderBoard( this.scene, this.ctx );
			} else if ( event.key === 'ArrowDown' ) {
				this.move( { x: 0, y: 1 } );
				this.renderBoard( this.ctx );
			} else if ( event.key === 'ArrowLeft' ) {
				this.move( { x: -1, y: 0 } );
				this.renderBoard( this.scene, this.ctx );
			} else if ( event.key === 'ArrowRight' ) {
				this.move( { x: 1, y: 0 } );
				this.renderBoard( this.scene, this.ctx );
			}
		} );
		window.addEventListener( 'resize', () => {
			this.sizeBoard();
			this.renderBoard();
		} );
	}
}
