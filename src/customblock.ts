import { Position } from "./common";

export class CustomBlock {
	private positions: Position[];

	constructor( positions ) {
		this.positions = positions;
	}

	get partialPositions() {
		return this.positions;
	}

	draw( ctx, color, tileSize ) {
		for ( const position of this.positions ) {
			ctx.fillStyle = color;
			ctx.fillRect( position.x * tileSize, position.y * tileSize, tileSize, tileSize );
		}
	}

	updatePosition( moveVector ) {
		for ( const position of this.positions ) {
			position.x += moveVector.x;
			position.y += moveVector.y;
		}
	}
}
