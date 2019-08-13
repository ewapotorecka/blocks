import { Game } from './game';
import { Menu } from './menu';
import { levels } from './levels';


const game = new Game( document.getElementById( 'blocksBoard' ) as HTMLCanvasElement, levels);
const menu = new Menu( game );
game.start();

game.endGameEmitter.subscribe( () => {
	const endScreen: HTMLElement = document.getElementById( 'end-screen' )!;
	const restartButton: HTMLElement = document.getElementById( 'restart-game' )!;

	endScreen.style.visibility = 'visible';
	restartButton.addEventListener( 'click', () => {
		game.resetGame();
		endScreen.style.visibility= 'hidden';
	} );

});

(window as any).game = game;