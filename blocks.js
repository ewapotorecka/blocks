const tileSize = 50;

main();

function main() {
	const scene = {
		board: {
			position: { x: 0, y: 0 },
			height: 10,
			width: 10
		},
		blocks: [
			{
				position: { x: 3, y: 4 },
				height: 3,
				width: 1
			},
			{
				position: { x: 1, y: 2 },
				height: 3,
				width: 1
			},
			{
				position: { x: 6, y: 6 },
				height: 2,
				width: 2
			}
		],
		exit: { x: 0, y: 0 },
		playerPosition: { x: 9, y: 9 }
	};
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
	for ( const block of scene.blocks ) {
		ctx.fillRect( block.position.x * tileSize, block.position.y * tileSize, block.width * tileSize, block.height * tileSize );
	}
}

function drawPlayer( scene, ctx ) {
	const player = scene.playerPosition;
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
		return;
	}

	if ( isEmptyAt( scene, newPosition ) ) {
		scene.playerPosition = newPosition;
	} else {
		const block = findBlock( scene, newPosition );

		if ( canBlockBeMoved( scene, block, moveVector ) ) {
			scene.playerPosition = newPosition;
			updateBlockPosition( block, moveVector );
		}
	}
}

function isExitAt( scene, position ) {
	return position.x == scene.exit.x && position.y == scene.exit.y;
}

function isEmptyAt( scene, position ) {
	for ( const block of scene.blocks ) {
		const blockPartialPositions = getBlockPartialPositions( block );
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
	const blockPartialPositions = getBlockPartialPositions( block );

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
		for ( const partialPosition of getBlockPartialPositions( block ) ) {
			if ( position.x == partialPosition.x && position.y == partialPosition.y ) {
				return block;
			}
		}
	}
}

function updateBlockPosition( block, moveVector ) {
	block.position.x += moveVector.x;
	block.position.y += moveVector.y;
}

function isPositionOnBoard( scene, position ) {
	return (
		position.x < scene.board.width &&
		position.y < scene.board.height &&
		position.x >= 0 &&
		position.y >= 0
	);
}

function getBlockPartialPositions( block ) {
	const blockPartialPositions = [];

	for ( let i = 0; i < block.height; i++ ) {
		for ( let j = 0; j < block.width; j++ ) {
			blockPartialPositions.push( {
				x: block.position.x + j,
				y: block.position.y + i
			} );
		}
	}

	return blockPartialPositions;
}
