// TODO: The board position does not make sense. It will be always the (0, 0) point.

import { RectangleBlock } from './rectangleblock';
import { CustomBlock } from './customblock';

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

// TODO: These levels should be moved outside of this file.
export const levels = [
	{
		board: {
			position: { x: 0, y: 0 },
			height: 20,
			width: 10 },
		exit: { x: 0, y: 0 },
		playerPosition: { x: 9, y: 9 },
		blocks: [
			// { type: 'rectangle', position: { x: 3, y: 4 }, width: 3, height: 1 },
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
	},
	{
		board: {
			position: { x: 0, y: 0 },
			height: 8,
			width: 9 },
		exit: { x: 0, y: 0 },
		playerPosition: { x: 8, y: 7 },
		blocks: [
			new RectangleBlock( { x: 2, y: 1 }, 6, 1 ),
			new RectangleBlock( { x: 2, y: 3 }, 6, 1 ),
			new RectangleBlock( { x: 2, y: 5 }, 6, 1 ),
			new CustomBlock( [ { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 }, ] ),
			new RectangleBlock( { x: 1, y: 7 }, 5, 1 ),
			new CustomBlock( [ { x: 0, y: 2 } ] ),
			new CustomBlock( [ { x: 4, y: 0 } ] ),
		]
	},
	{
		board: {
			position: { x: 0, y: 0 },
			height: 9,
			width: 9
		},
		exit: { x: 4, y: 4 },
		playerPosition: { x: 6, y: 6 },
		blocks: [
			new CustomBlock( [ { x: 3, y: 3 }, { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 3 } ] ),
			new RectangleBlock( { x: 2, y: 3 }, 1, 3 ),
			new RectangleBlock( { x: 3, y: 2 }, 3, 1 ),
			new RectangleBlock( { x: 6, y: 3 }, 1, 3 ),
			new RectangleBlock( { x: 3, y: 6 }, 3, 1 ),
			new CustomBlock( [ { x: 7, y: 7 }, { x: 3, y: 4 } ] ),
			new CustomBlock( [ { x: 1, y: 1 }, { x: 4, y: 3 } ] ),
			new CustomBlock( [ { x: 1, y: 7 }, { x: 5, y: 4 } ] ),
			new CustomBlock( [ { x: 7, y: 1 }, { x: 4, y: 5 } ] ),
			new RectangleBlock( { x: 4, y: 0 }, 1, 2 ),
			new RectangleBlock( { x: 4, y: 7 }, 1, 2 ),
			new RectangleBlock( { x: 0, y: 4 }, 2, 1 ),
			new RectangleBlock( { x: 7, y: 4 }, 2, 1 ),
		]
	},
	{
		board: {
			position: { x: 0, y: 0 },
			height: 8,
			width: 9
		},
		exit: { x: 0, y: 0 },
		playerPosition: { x: 8, y: 7 },
		blocks: [
			new RectangleBlock( { x: 2, y: 1 }, 6, 1 ),
			new RectangleBlock( { x: 2, y: 3 }, 6, 1 ),
			new RectangleBlock( { x: 2, y: 5 }, 6, 1 ),
			new CustomBlock( [ { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 }, ] ),
			new RectangleBlock( { x: 1, y: 7 }, 5, 1 ),
			new CustomBlock( [ { x: 0, y: 2 } ] ),
			new CustomBlock( [ { x: 4, y: 0 } ] ),
			new CustomBlock( [ { x: 1, y: 1 }, { x: 6, y: 6 } ] ),
		]
	}
];
