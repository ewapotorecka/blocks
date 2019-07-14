// TODO: The board position does not make sense. It will be always the (0, 0) point.

export class Scene {
	constructor( levelData ) {
		this.setLevelData( levelData );
	}

	setLevelData( level ) {
		// level = JSON.parse( JSON.stringify( level ) );
		// TODO: All these things should be private and be available only from this class.
		// TODO: All these things should be cloned to not change original objects later.
		this.board = level.board;
		this.blocks = level.blocks;
		this.exit = level.exit;
		this.playerPosition = level.playerPosition;
	}

	_parseBlocks( blocks ) {
		// 
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

