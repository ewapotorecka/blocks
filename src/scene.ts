import { RectangleBlock } from './rectangleblock';
import { CustomBlock } from './customblock';
import { Emitter } from './emitter';
import { Rectangle, Position } from './common';

export class Scene {
	public levelChangeEmitter: Emitter<void>;
	public blocks: Array<RectangleBlock | CustomBlock>;
	public board: Rectangle;
	public exit: Position;
	public playerPosition: Position;

	constructor( levelData ) {
		this.setLevelData( levelData );
		this.levelChangeEmitter = new Emitter();
	}

	setLevelData( level ) {
		level = JSON.parse( JSON.stringify( level ) );

		this.blocks = this._createBlocksFromJson( level.blocks );
		this.board = level.board;
		this.exit = level.exit;
		this.playerPosition = level.playerPosition;
	}

	_createBlocksFromJson( jsonBlocks ) {
		return jsonBlocks.map( jsonBlock => {
			if ( jsonBlock.type == 'rectangle' ) {
				return new RectangleBlock( jsonBlock.position, jsonBlock.width, jsonBlock.height );
			}
			if ( jsonBlock.type == 'custom' ) {
				return new CustomBlock( jsonBlock.points );
			}
		} );
	}

	isExitAt( position ) {
		return position.x == this.exit.x && position.y == this.exit.y;
	}

	isEmptyAt( position ) {
		for ( const block of this.blocks ) {
			for ( const partialPosition of block.partialPositions ) {
				if ( position.x == partialPosition.x && position.y == partialPosition.y ) {
					return false;
				}
			}
		}

		return true;
	}

	canBlockBeMoved( block, moveVector ) {
		let canBlockBeMoved = true;
		const previousBlocks = this.blocks.slice();
		this.blocks = this.blocks.filter( blockInArr => block !== blockInArr );

		for ( const partialPosition of block.partialPositions ) {
			const newPosition = {
				x: partialPosition.x + moveVector.x,
				y: partialPosition.y + moveVector.y
			};

			if ( !this.isPositionOnBoard( newPosition ) ) {
				canBlockBeMoved = false;
			}

			if ( !this.isEmptyAt( newPosition ) ) {
				canBlockBeMoved = false;
			}
		}
		this.blocks = previousBlocks;
		return canBlockBeMoved;
	}

	findBlock( position ) {
		for ( const block of this.blocks ) {
			for ( const partialPosition of block.partialPositions ) {
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

	move( moveVector ) {
		const newPosition = {
			x: this.playerPosition.x + moveVector.x,
			y: this.playerPosition.y + moveVector.y
		};

		if ( !this.isPositionOnBoard( newPosition ) ) {
			return;
		}

		if ( this.isExitAt( newPosition ) ) {
			this.playerPosition = newPosition;
			this.levelChangeEmitter.emit();

			return;
		}

		if ( this.isEmptyAt( newPosition ) ) {
			this.playerPosition = newPosition;
		} else {
			const block = this.findBlock( newPosition );

			if ( this.canBlockBeMoved( block, moveVector ) ) {
				this.playerPosition = newPosition;
				block.updatePosition( moveVector );
			}
		}
	}
}

