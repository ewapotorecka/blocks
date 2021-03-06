
import { Emitter } from './emitter';
import { Rectangle, Position, RectangleBlockJson, CustomBlockJson, Block, Level, MoveInfo } from './common';
import { RectangleBlock } from './rectangleblock';
import { CustomBlock } from './customblock';

export class Scene {
    public levelChangeEmitter: Emitter<void>;
    public blocks!: Block[];
    public board!: Rectangle;
    public exit!: Position;
	public playerPosition!: Position;
	public moveInfo: MoveInfo = {
		moveVector: {
			x: 0, y: 0,
		}
	};

	constructor() {
		this.levelChangeEmitter = new Emitter();
	}

	setLevelData( level: Level ) {
		level = JSON.parse( JSON.stringify( level ) );

		this.blocks = this._createBlocksFromJson( level.blocks );
		this.board = level.board;
		this.exit = level.exit;
		this.playerPosition = level.playerPosition;
	}

	_createBlocksFromJson( jsonBlocks: ( RectangleBlockJson | CustomBlockJson )[] ) {
		return jsonBlocks.map( jsonBlock => {
			if ( jsonBlock.type == 'rectangle' ) {
				return new RectangleBlock( jsonBlock.position, jsonBlock.width, jsonBlock.height );
			}
			if ( jsonBlock.type == 'custom' ) {
				return new CustomBlock( jsonBlock.points );
			}

			throw new Error();
		} );
	}

	isExitAt( position: Position ) {
		return position.x == this.exit.x && position.y == this.exit.y;
	}

	isEmptyAt( position: Position ) {
		for ( const block of this.blocks ) {
			for ( const partialPosition of block.partialPositions ) {
				if ( position.x == partialPosition.x && position.y == partialPosition.y ) {
					return false;
				}
			}
		}

		return true;
	}

	canBlockBeMoved( block: Block, moveVector: Position ) {
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

			if ( this.isExitAt( newPosition ) ) {
				canBlockBeMoved = false;
			}
		}
		this.blocks = previousBlocks;
		return canBlockBeMoved;
	}

	findBlock( position: Position ) {
		for ( const block of this.blocks ) {
			for ( const partialPosition of block.partialPositions ) {
				if ( position.x == partialPosition.x && position.y == partialPosition.y ) {
					return block;
				}
			}
		}
	}

	isPositionOnBoard( position: Position ) {
		return (
			position.x < this.board.width &&
			position.y < this.board.height &&
			position.x >= 0 &&
			position.y >= 0
		);
	}

	movePlayer( moveVector: Position ) {
		const newPosition = {
			x: this.playerPosition.x + moveVector.x,
			y: this.playerPosition.y + moveVector.y
		};

		this.moveInfo = {
			moveVector: {
				x: 0,
				y: 0,
			}
		};

		if ( !this.isPositionOnBoard( newPosition ) ) {
			return;
		}

		if ( this.isExitAt( newPosition ) ) {
			this.playerPosition = newPosition;
			this.levelChangeEmitter.emit();
			this.moveInfo.moveVector = moveVector;

			return;
		}

		if ( this.isEmptyAt( newPosition ) ) {
			this.playerPosition = newPosition;
			this.moveInfo.moveVector = moveVector;
		} else {
			const block = this.findBlock( newPosition )!;

			if ( this.canBlockBeMoved( block, moveVector ) ) {
				this.moveInfo.block = block;
				this.playerPosition = newPosition;
				this.moveInfo.moveVector = moveVector;
				block.move( moveVector );
			}
		}
	}
}

