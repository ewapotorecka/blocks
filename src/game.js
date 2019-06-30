const tileSize = 50;

import { Scene, levels } from './scene';

export class Game {
	start() {
		this.levelNum = 0;
		const levelData = levels[ this.levelNum ];
		this.scene = new Scene( levelData );

		const canvas = document.getElementById( 'blocksBoard' );
		this.ctx = canvas.getContext( '2d' );
		canvas.height = this.scene.board.height * tileSize;
		canvas.width = this.scene.board.width * tileSize;

		this.renderBoard();

		document.addEventListener( 'keyup', event => {
			if ( event.key === 'ArrowUp' ) {
				this.movePlayer( { x: 0, y: -1 } );
				this.renderBoard( this.scene, this.ctx );
			} else if ( event.key === 'ArrowDown' ) {
				this.movePlayer( { x: 0, y: 1 } );
				this.renderBoard( this.ctx );
			} else if ( event.key === 'ArrowLeft' ) {
				this.movePlayer( { x: -1, y: 0 } );
				this.renderBoard( this.scene, this.ctx );
			} else if ( event.key === 'ArrowRight' ) {
				this.movePlayer( { x: 1, y: 0 } );
				this.renderBoard( this.scene, this.ctx );
			}
		} );
	}

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

		this.ctx.strokeRect( board.position.x * tileSize, board.position.y * tileSize, board.width * tileSize, board.height * tileSize );
	}

	drawBlocks() {
		const colorAdd = 255 / this.scene.blocks.length;
		let colorNum = 0;
		for ( const block of this.scene.blocks ) {
			const color = `rgb( ${ colorNum }, ${ colorNum }, ${ colorNum } )`;

			block.draw( this.ctx, color );
			colorNum = colorNum + colorAdd;
		}
	}

	drawPlayer() {
		const player = this.scene.playerPosition;
		this.ctx.fillStyle = '#FAED26';
		this.ctx.beginPath();
		this.ctx.arc( player.x * tileSize + tileSize / 2, player.y * tileSize + tileSize / 2, tileSize / 2, 0, 2 * Math.PI );
		this.ctx.fill();
	}

	drawExit() {
		const exit = this.scene.exit;
		this.ctx.fillStyle = '#E64398';
		this.ctx.fillRect( exit.x * tileSize, exit.y * tileSize, tileSize, tileSize );
	}

	loadNextLevel() {
		this.levelNum += 1;
		const level = levels[ this.levelNum ];
		this.scene.setLevelData( level );
	}

	movePlayer( moveVector ) {
		this.moveVector = moveVector;
		const newPosition = {
			x: this.scene.playerPosition.x + moveVector.x,
			y: this.scene.playerPosition.y + moveVector.y
		};

		if ( !this.scene.isPositionOnBoard( newPosition ) ) {
			return;
		}

		if ( this.scene.isExitAt( newPosition ) ) {
			console.log( 'Jupijajej' );
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
				block.updatePositon( moveVector );
			}
		}
	}
}
