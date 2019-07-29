import { Game } from './game';
import { Menu } from './menu';
import { levels } from './levels';

const game = new Game();
game.start();
const menu = new Menu( game );


// const levelList = document.getElementById( 'level-list' );
// const skipLevelButton = document.getElementById( 'skip-level' );
// const resetButton = document.getElementById( 'reset' );

// skipLevelButton.addEventListener( 'click', () => game.loadNextLevel() );
// resetButton.addEventListener( 'click', () => game.start() );


// levelInfo.innerText = 'Level ' + ( this.levelNum + 1 ); // TODO: <- Change it to a string template.
// for ( const level of levels ) {
// 	const button = document.createElement( 'BUTTON' );
// 	this.levelList.appendChild( button );
// 	button.innerText = levels.indexOf( level ) + 1;
// }
