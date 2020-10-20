import { Position, Block } from './common';

export class CustomBlock implements Block {
    private positions: Position[];

    constructor( positions: Position[] ) {
    	this.positions = positions;
    }

    get partialPositions() {
    	return this.positions;
    }

    draw( ctx: CanvasRenderingContext2D, color: string, tileSize: number ) {
    	for ( const position of this.positions ) {
    		ctx.fillStyle = color;
    		ctx.fillRect( position.x * tileSize, position.y * tileSize, tileSize, tileSize );
	}
    }

    move( moveVector: Position ) {
    	for ( const position of this.positions ) {
    		position.x += moveVector.x;
    		position.y += moveVector.y;
    	}
    }
}
