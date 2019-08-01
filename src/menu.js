import { levelStates } from './game';

export class Menu {
	constructor( game ) {
		const skipLevelButton = document.getElementById( 'skip-level' );
		const resetButton = document.getElementById( 'reset' );
		const levelInfo = document.getElementById( 'level' );
		const levelList = document.getElementById( 'level-list' );

		game.levelChangeEmitter.subscribe( ( { previousLevel, currentLevel } ) => {
			levelInfo.innerText = `Level ${ currentLevel + 1 } `;
			if ( game.levelsInfo[ previousLevel ] == levelStates.SKIPPED ) {
				levelList.children[ previousLevel ].style.backgroundColor = '#950740';
				levelList.children[ previousLevel ].style.color = '#FFF';
			} else if ( game.levelsInfo[ previousLevel ] == levelStates.DONE ) {
				levelList.children[ previousLevel ].style.backgroundColor = '#123C69';
				levelList.children[ previousLevel ].style.color = '#FFF';
			}
		} );

		skipLevelButton.addEventListener( 'click', () => {
			game.skipCurrentLevel();
		} );
		resetButton.addEventListener( 'click', () => game.loadLevel( game.levelNum ) );

		levelInfo.innerText = `Level ${ game.levelNum + 1 } `;

		for ( let i = 0; i <= game.levels.length; i++ ) {
			const button = document.createElement( 'BUTTON' );
			levelList.appendChild( button );
			button.innerText = i + 1;
			button.addEventListener( 'click', () => {
				if ( game.levelsInfo[ i ] == 2 || game.levelsInfo[ i ] == 0 ) {
					game.loadLevel( i );
				}
			} );
		}
	}

	renderLevelButtons() {
		
	}
}