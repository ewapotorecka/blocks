import { levelStates } from './game';

export class Menu {
	constructor( game ) {
		const skipLevelButton = document.getElementById( 'skip-level' );
		const resetButton = document.getElementById( 'reset' );
		const levelInfo = document.getElementById( 'level' );
		const levelList = document.getElementById( 'level-list' );

		game.levelChangeEmitter.subscribe( ( { previousLevel, currentLevel } ) => {
			const element = levelList.children[ previousLevel ] as HTMLElement;

			levelInfo.innerText = `Level ${ currentLevel + 1 } `;

			if ( game.levelsInfo[ previousLevel ] == levelStates.SKIPPED ) {
				element.style.backgroundColor = '#950740';
				element.style.color = '#FFF';
			} else if ( game.levelsInfo[ previousLevel ] == levelStates.DONE ) {
				element.style.backgroundColor = '#123C69';
				element.style.color = '#FFF';
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
			button.innerText = ( i + 1 ).toString();
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