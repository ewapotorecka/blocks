import { Game } from './game';
import { Menu } from './menu';
import { levels } from './levels';

let progress;

if ( localStorage.getItem( 'levelInfo' ) ) {
	progress = JSON.parse( localStorage.getItem( 'levelInfo' )! );
}

const game = new Game( document.getElementById( 'blocksBoard' ) as HTMLCanvasElement, levels, progress );
const menu = new Menu( game );
game.start();
game.levelChangeEmitter.subscribe( () => {
	localStorage.setItem( 'levelInfo', JSON.stringify( game.levelsInfo ) );
} );

game.endGameEmitter.subscribe( () => {
	const endScreen: HTMLElement = document.getElementById( 'end-screen' )!;
	const restartButton: HTMLElement = document.getElementById( 'restart-game' )!;

	endScreen.style.visibility = 'visible';
	restartButton.addEventListener( 'click', () => {
		game.resetGame();
		endScreen.style.visibility = 'hidden';
	} );
} );

( window as any ).game = game;
