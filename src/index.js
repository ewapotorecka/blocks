import { Game } from './game';

const game = new Game();
game.start();

// const levelInfo = document.getElementById( 'level' );
// const levelList = document.getElementById( 'level-list' );
const skipLevelButton = document.getElementById( 'skip-level' );
skipLevelButton.addEventListener( 'click', () => game.loadNextLevel() );
// levelInfo.innerText = 'Level ' + ( this.levelNum + 1 );
// levelInfo.innerText = 'Level ' + ( this.levelNum + 1 ); // TODO: <- Change it to a string template.
// for ( const level of levels ) {
// 	const button = document.createElement( 'BUTTON' );
// 	this.levelList.appendChild( button );
// 	button.innerText = levels.indexOf( level ) + 1;
// }
