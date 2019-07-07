// musi sluchac na event jak sie zmienia szerokosc/wysokosc

import { Scene, levels } from './scene';

export class Game {
	start() {
		this.levelNum = 0;
		this.levelInfo = document.getElementById( 'level' );
		const skipLevelButton = document.getElementById( 'skip-level' );
		const levelData = levels[ this.levelNum ];
		this.scene = new Scene( levelData );
		if ( window.innerHeight / this.scene.board.height < ( window.innerWidth - 400 ) / this.scene.board.width ) {
			this.tileSize = window.innerHeight / this.scene.board.height;
		} else {
			this.tileSize = ( window.innerWidth - 400 ) / this.scene.board.width;
		}

		const canvas = document.getElementById( 'blocksBoard' );
		this.ctx = canvas.getContext( '2d' );
		canvas.height = this.scene.board.height * this.tileSize;
		canvas.width = this.scene.board.width * this.tileSize;

		this.levelInfo.innerText = 'Level ' + ( this.levelNum + 1 );
		this.renderBoard();

		skipLevelButton.addEventListener( 'click', () => this.loadNextLevel() );
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

		this.ctx.strokeRect(
			board.position.x * this.tileSize, board.position.y * this.tileSize, board.width * this.tileSize, board.height * this.tileSize
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

	loadNextLevel() {
		this.levelNum += 1;
		const level = levels[ this.levelNum ];
		this.scene.setLevelData( level );
		this.tileSize = window.innerHeight / level.board.height;
		this.ctx.canvas.height = level.board.height * this.tileSize;
		this.ctx.canvas.width = level.board.width * this.tileSize;
		this.levelInfo.innerText = 'Level ' + ( this.levelNum + 1 );
		this.renderBoard();
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
