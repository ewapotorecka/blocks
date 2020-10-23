import { ImageManager } from './imageManager';
import { Scene } from './scene';

export class Renderer {
    private _ctx: CanvasRenderingContext2D;
    private _scene: Scene;
	private _tileSize!: number;
	private animationFrame = 5;

	constructor( ctx: CanvasRenderingContext2D, scene: Scene, private imageManager: ImageManager ) {
		this._ctx = ctx;
		this._scene = scene;
	}

	animate() {
		for ( let i = 0; i < 5; i++ ) {
			setTimeout( () => {
				this.animationFrame = i + 1;
				this.renderBoard();
			}, i * 20 );
		}
	}

	renderBoard() {
		this._clearCanvas();
		this._drawBoard();
		this._drawBlocks();
		this._drawPlayer();
		this._drawExit();
	}

	resizeBoard() {
		if ( window.innerHeight / this._scene.board.height < ( window.innerWidth - 400 ) / this._scene.board.width ) {
			this._tileSize = window.innerHeight / this._scene.board.height;
		} else {
			this._tileSize = ( window.innerWidth - 400 ) / this._scene.board.width;
		}

		this._ctx.canvas.height = this._scene.board.height * this._tileSize;
		this._ctx.canvas.width = this._scene.board.width * this._tileSize;
	}

	_clearCanvas() {
		this._ctx.clearRect( 0, 0, this._ctx.canvas.width, this._ctx.canvas.height );
	}

	_drawBoard() {
		const board = this._scene.board;

		this._ctx.strokeRect(
			0, 0, board.width * this._tileSize, board.height * this._tileSize
		);
	}

	_drawBlocks() {
		const colorAdd = 255 / this._scene.blocks.length;
		let colorNum = 0;
		for ( const block of this._scene.blocks ) {
			const color = `rgb( ${ colorNum }, ${ colorNum }, ${ colorNum } )`;

			if ( block == this._scene.moveInfo.block ) {
				this._ctx.save();

				this._ctx.translate(
					this._tileSize * -( 5 - this.animationFrame ) / 5 * this._scene.moveInfo.moveVector.x, 
					this._tileSize * -( 5 - this.animationFrame ) / 5 * this._scene.moveInfo.moveVector.y
				);
				block.draw( this._ctx, color, this._tileSize );

				this._ctx.restore();
			} else {
				block.draw( this._ctx, color, this._tileSize );
			}

			colorNum = colorNum + colorAdd;
		}
	}

	_drawPlayer() {
		const player = {
			x: this._scene.playerPosition.x - ( 5 - this.animationFrame ) / 5 * this._scene.moveInfo.moveVector.x,
			y: this._scene.playerPosition.y - ( 5 - this.animationFrame ) / 5 * this._scene.moveInfo.moveVector.y
		};
		const pig = this.imageManager.images.get( 'pig' )!;

		this._ctx.drawImage( pig, player.x * this._tileSize, player.y * this._tileSize, this._tileSize, this._tileSize );
	}

	_drawExit() {
		const exit = this._scene.exit;
		const broccoli = this.imageManager.images.get( 'broccoli' )!;

		this._ctx.drawImage( broccoli, exit.x * this._tileSize, exit.y * this._tileSize, this._tileSize, this._tileSize );
	}
}

