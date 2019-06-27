const tileSize = 50;

class CustomBlock {
	constructor( positions ) {
		this.positions = positions;
	}

	draw( ctx, color ) {
		for ( const position of this.positions ) {
			ctx.fillStyle = color;
			ctx.fillRect( position.x * tileSize, position.y * tileSize, tileSize, tileSize );
		}
	}

	get partialPosition() {
		return this.positions;
	}

	updatePositon( moveVector ) {
		for ( const position of this.positions ) {
			position.x += moveVector.x;
			position.y += moveVector.y;
		}
	}
}

class RectangleBlock {
	constructor( position, width, height ) {
		this.position = position;
		this.width = width;
		this.height = height;
	}

	draw( ctx ) {
		ctx.fillStyle = 'black';
		ctx.fillRect( this.position.x * tileSize, this.position.y * tileSize, this.width * tileSize, this.height * tileSize );
	}

	get partialPosition() {
		const blockPartialPositions = [];

		for ( let i = 0; i < this.height; i++ ) {
			for ( let j = 0; j < this.width; j++ ) {
				blockPartialPositions.push( {
					x: this.position.x + j,
					y: this.position.y + i
				} );
			}
		}

		return blockPartialPositions;
	}

	updatePositon( moveVector ) {
		this.position.x += moveVector.x;
		this.position.y += moveVector.y;
	}
}

class Scene {
	constructor( levelData ) {
		this.setLevelData( levelData );
	}

	setLevelData( level ) {
		this.board = level.board;
		this.blocks = level.blocks;
		this.exit = level.exit;
		this.playerPosition = level.playerPosition;
	}

	isExitAt( position ) {
		return position.x == this.exit.x && position.y == this.exit.y;
	}

	isEmptyAt( position ) {
		for ( const block of this.blocks ) {
			const blockPartialPositions = block.partialPosition;
			for ( const partialPosition of blockPartialPositions ) {
				if ( position.x == partialPosition.x && position.y == partialPosition.y ) {
					return false;
				}
			}
		}
		return true;
	}

	canBlockBeMoved( block, moveVector ) {
		const levelData = {
			board: this.board,
			blocks: this.blocks.filter( blockInArr => block !== blockInArr ),
			exit: this.exit,
			playerPosition: this.playerPosition,
		};

		const sceneWithoutMovedBlock = new Scene( levelData );
		const blockPartialPositions = block.partialPosition;

		for ( const partialPosition of blockPartialPositions ) {
			const newPosition = {
				x: partialPosition.x + moveVector.x,
				y: partialPosition.y + moveVector.y
			};

			if ( !sceneWithoutMovedBlock.isPositionOnBoard( newPosition ) ) {
				return false;
			}

			if ( !sceneWithoutMovedBlock.isEmptyAt( newPosition ) ) {
				return false;
			}
		}

		return true;
	}

	findBlock( position ) {
		for ( const block of this.blocks ) {
			for ( const partialPosition of block.partialPosition ) {
				if ( position.x == partialPosition.x && position.y == partialPosition.y ) {
					return block;
				}
			}
		}
	}

	isPositionOnBoard( position ) {
		return (
			position.x < this.board.width &&
			position.y < this.board.height &&
			position.x >= 0 &&
			position.y >= 0
		);
	}
}

const levels = [
	{
		board: {
			position: { x: 0, y: 0 },
			height: 10,
			width: 10 },
		exit: { x: 0, y: 0 },
		playerPosition: { x: 9, y: 9 },
		blocks: [
			new RectangleBlock( { x: 3, y: 4 }, 3, 1 ),
			new CustomBlock( [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ] ),
			new CustomBlock( [ { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 4, y: 3 } ] ),
			new CustomBlock( [ { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 7, y: 7 }, { x: 7, y: 5 } ] ),
			new CustomBlock( [ { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 } ] ),
			new CustomBlock( [ { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 } ] ),
			new CustomBlock( [ { x: 1, y: 9 }, { x: 3, y: 9 } ] ) ]
	},
	{
		board: {
			position: { x: 0, y: 0 },
			height: 15,
			width: 10 },
		exit: { x: 0, y: 0 },
		playerPosition: { x: 9, y: 9 },
		blocks: [
			new RectangleBlock( { x: 3, y: 4 }, 3, 1 ),
			new CustomBlock( [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ] ),
			new CustomBlock( [ { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 } ] ),
			new CustomBlock( [ { x: 1, y: 9 }, { x: 3, y: 9 } ] ) ]
	}
];

class Game {
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
		this.ctx.fillStyle = 'pink';
		this.ctx.beginPath();
		this.ctx.arc( player.x * tileSize + tileSize / 2, player.y * tileSize + tileSize / 2, tileSize / 2, 0, 2 * Math.PI );
		this.ctx.fill();
	}

	drawExit() {
		const exit = this.scene.exit;
		this.ctx.strokeRect( exit.x * tileSize, exit.y * tileSize, tileSize, tileSize );
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

const game = new Game();
game.start();
