import { Position, Block } from './common';

export class RectangleBlock implements Block {
    private position: Position;
    private width: number;
    private height: number;

    constructor( position: Position, width: number, height: number ) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    get partialPositions() {
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

    draw( ctx: CanvasRenderingContext2D, color: string, tileSize: number ) {
        ctx.fillStyle = color;
        ctx.fillRect( this.position.x * tileSize, this.position.y * tileSize, this.width * tileSize, this.height * tileSize );
    }

    move( moveVector: Position ) {
        this.position.x += moveVector.x;
        this.position.y += moveVector.y;
    }
}

