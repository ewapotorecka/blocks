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

const levels = {
	1: {
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

	2: {
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
};

class Scene {
	constructor( board, blocks, exit, playerPosition ) {
		this.board = board;
		this.exit = exit;
		this.blocks = blocks;
		this.playerPosition = playerPosition;
	}

	change( levels ) {
		const levelNum = 2;
		this.board = levels.levelNum.board;
		this.blocks = levels.levelNum.bloks;
		this.exit = levels.levelNum.exit;
		this.playerPosition = levels.levelNum.playerPosition;
	}
}
main();

function main() {
	const scene = new Scene(
		{
			position: { x: 0, y: 0 },
			height: 10,
			width: 10 },
		[
			new RectangleBlock( { x: 3, y: 4 }, 3, 1 ),
			new CustomBlock( [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ] ),
			new CustomBlock( [ { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 4, y: 3 } ] ),
			new CustomBlock( [ { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 7, y: 7 }, { x: 7, y: 5 } ] ),
			new CustomBlock( [ { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 } ] ),
			new CustomBlock( [ { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 } ] ),
			new CustomBlock( [ { x: 1, y: 9 }, { x: 3, y: 9 } ] ) ],
		{ x: 0, y: 0 },
		{ x: 9, y: 9 } );

	const canvas = document.getElementById( 'blocksBoard' );
	const ctx = canvas.getContext( '2d' );
	canvas.height = scene.board.height * tileSize;
	canvas.width = scene.board.width * tileSize;

	renderBoard( scene, ctx );

	document.addEventListener( 'keyup', event => {
		if ( event.key === 'ArrowUp' ) {
			movePlayer( scene, { x: 0, y: -1 } );
			renderBoard( scene, ctx );
		} else if ( event.key === 'ArrowDown' ) {
			movePlayer( scene, { x: 0, y: 1 } );
			renderBoard( scene, ctx );
		} else if ( event.key === 'ArrowLeft' ) {
			movePlayer( scene, { x: -1, y: 0 } );
			renderBoard( scene, ctx );
		} else if ( event.key === 'ArrowRight' ) {
			movePlayer( scene, { x: 1, y: 0 } );
			renderBoard( scene, ctx );
		}
	} );
}

function renderBoard( scene, ctx ) {
	clearCanvas( ctx );
	drawBoard( scene, ctx );
	drawBlocks( scene, ctx );
	drawPlayer( scene, ctx );
	drawExit( scene, ctx );
}

function drawBoard( scene, ctx ) {
	const board = scene.board;

	ctx.strokeRect( board.position.x * tileSize, board.position.y * tileSize, board.width * tileSize, board.height * tileSize );
}

function drawBlocks( scene, ctx ) {
	const colorAdd = 255 / scene.blocks.length;
	let colorNum = 0;
	for ( const block of scene.blocks ) {
		const color = `rgb( ${ colorNum }, ${ colorNum }, ${ colorNum } )`;

		block.draw( ctx, color );
		colorNum = colorNum + colorAdd;
	}
}

function drawPlayer( scene, ctx ) {
	const player = scene.playerPosition;
	ctx.fillStyle = 'pink';
	ctx.beginPath();
	ctx.arc( player.x * tileSize + tileSize / 2, player.y * tileSize + tileSize / 2, tileSize / 2, 0, 2 * Math.PI );
	ctx.fill();
}

function drawExit( scene, ctx ) {
	const exit = scene.exit;
	ctx.strokeRect( exit.x * tileSize, exit.y * tileSize, tileSize, tileSize );
}

function clearCanvas( ctx ) {
	ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
}
function movePlayer( scene, moveVector ) {
	const newPosition = {
		x: scene.playerPosition.x + moveVector.x,
		y: scene.playerPosition.y + moveVector.y
	};

	if ( !isPositionOnBoard( scene, newPosition ) ) {
		return;
	}

	if ( isExitAt( scene, newPosition ) ) {
		console.log( 'Jupijajej' );
		scene.playerPosition = newPosition;
		scene.change( levels );
		return;
	}

	if ( isEmptyAt( scene, newPosition ) ) {
		scene.playerPosition = newPosition;
	} else {
		const block = findBlock( scene, newPosition );

		if ( canBlockBeMoved( scene, block, moveVector ) ) {
			scene.playerPosition = newPosition;
			block.updatePositon( moveVector );
		}
	}
}

function isExitAt( scene, position ) {
	return position.x == scene.exit.x && position.y == scene.exit.y;
}

function isEmptyAt( scene, position ) {
	for ( const block of scene.blocks ) {
		const blockPartialPositions = block.partialPosition;
		for ( const partialPosition of blockPartialPositions ) {
			if ( position.x == partialPosition.x && position.y == partialPosition.y ) {
				return false;
			}
		}
	}
	return true;
}

function canBlockBeMoved( scene, block, moveVector ) {
	const sceneWithoutMovedBlock = {
		...scene,
		blocks: scene.blocks.filter( blockInArr => block !== blockInArr )
	};
	const blockPartialPositions = block.partialPosition;

	for ( const partialPosition of blockPartialPositions ) {
		const newPosition = {
			x: partialPosition.x + moveVector.x,
			y: partialPosition.y + moveVector.y
		};

		if ( !isPositionOnBoard( scene, newPosition ) ) {
			return false;
		}

		if ( !isEmptyAt( sceneWithoutMovedBlock, newPosition ) ) {
			return false;
		}
	}

	return true;
}

function findBlock( scene, position ) {
	for ( const block of scene.blocks ) {
		for ( const partialPosition of block.partialPosition ) {
			if ( position.x == partialPosition.x && position.y == partialPosition.y ) {
				return block;
			}
		}
	}
}

function isPositionOnBoard( scene, position ) {
	return (
		position.x < scene.board.width &&
		position.y < scene.board.height &&
		position.x >= 0 &&
		position.y >= 0
	);
}
