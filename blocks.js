function main() {
	const board = {
		position: { x: 0, y: 0 },
		height: 10,
		width: 10
	};
	const blocks = [
		{
			position: { x: 3, y: 4 },
			height: 3,
			width: 1
		}
	];
	const exit = { x: 0, y: -1 };
	let playerPosition = { x: 9, y: 9 };

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

function movePlayer( moveVector, playerPosition ) {
	const newPosition = {
		x: playerPosition.x + moveVector.x,
		y: playerPosition.y + moveVector.y
	};

	if ( isExitAt( newPosition ) ) {
		return 'Jupijajej';
	}

	if ( isEmptyAt( newPosition ) ) {
		updatePlayerPosition( playerPosition, moveVector );
	} else if ( canBlockBeMoved() ) {
		updatePlayerPosition( playerPosition, moveVector );
		updateBlockPosition();
	}
}

function isExitAt( position, exit ) {
	return position.x == exit.x && position.y == exit.y;
}

function updatePlayerPosition( playerPosition, moveVector ) {
	playerPosition.x += moveVector.x;
	playerPosition.y += moveVector.y;
}
