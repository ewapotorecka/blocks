
export class RectangleBlock {
	constructor( position, width, height ) {
		this.position = position;
		this.width = width;
		this.height = height;
	}

	draw( ctx, color, tileSize ) {
		ctx.fillStyle = color;
		ctx.fillRect( this.position.x * tileSize, this.position.y * tileSize, this.width * tileSize, this.height * tileSize );
	}

	get partialPosition() {
		const blockPartialPositions = [];

		for ( let i = 0; i < this.height; i++ ) {
			for ( let j = 0; j < this.width; j++ ) {
				blockPartialPositions.push( {
					x: this.position.x + j,
					y: this.position.y + i
				} );
			}
		}

		return blockPartialPositions;
	}

	updatePosition( moveVector ) {
		this.position.x += moveVector.x;
		this.position.y += moveVector.y;
	}
}

