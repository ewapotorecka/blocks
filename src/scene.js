import { RectangleBlock } from './rectangleblock';
import { CustomBlock } from './customblock';

export class Scene {
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

export const levels = [
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
			height: 10,
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
