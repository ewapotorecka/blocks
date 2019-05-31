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
			}
		],
		exit: { x: 0, y: -1 },
		playerPosition: { x: 9, y: 9 }
	};

	document.addEventListener( 'keyup', event => {
		if ( event.key === 'ArrowUp' ) {
			movePlayer( { x: 0, y: -1 } );
		} else if ( event.key === 'ArrowDown' ) {
			movePlayer( { x: 0, y: 1 } );
		} else if ( event.key === 'ArrowLeft' ) {
			movePlayer( { x: -1, y: 0 } );
		} else if ( event.key === 'ArrowRight' ) {
			movePlayer( { x: 1, y: 0 } );
		}
	} );
}

function renderBoard() {
	drawBoard();
	drawBlocks();
	drawPlayer();
	drawExit();
}

function movePlayer( scene, moveVector ) {
	const newPosition = {
		x: scene.playerPosition.x + moveVector.x,
		y: scene.playerPosition.y + moveVector.y
	};

	if ( isExitAt( scene, newPosition ) ) {
		return 'Jupijajej';
	}

	if ( isEmptyAt( newPosition ) ) {
		scene.playerPosition = newPosition;
	} else if ( canBlockBeMoved() ) {
		scene.playerPosition = newPosition;
		updateBlockPosition();
	}
}

function isExitAt( scene, position ) {
	return position.x == scene.exit.x && position.y == scene.exit.y;
}

