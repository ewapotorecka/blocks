class CustomBlock {
	constructor( positions ) {
		this.positions = positions;
	}

	draw( ctx, color ) {
		for ( const position of this.positions ) {
			ctx.fillStyle = color;
			ctx.fillRect( position.x * tileSize, position.y * tileSize, tileSize, tileSize );
		}
	}

	get partialPosition() {
		return this.positions;
	}

	updatePositon( moveVector ) {
		for ( const position of this.positions ) {
			position.x += moveVector.x;
			position.y += moveVector.y;
		}
	}
}