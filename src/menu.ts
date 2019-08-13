import { levelStates, Game } from './game';

export class Menu {
    constructor( game: Game ) {
        const skipLevelButton = document.getElementById( 'skip-level' )!;
        const resetButton = document.getElementById( 'reset' )!;
		const levelList = document.getElementById( 'level-list' )!;
		
        skipLevelButton.addEventListener( 'click', () => {
			let skippedLevels = 1;
			for ( const level of game.levelsInfo ) {
				if ( level == levelStates.SKIPPED ) {
					skippedLevels++
				}
			}

			if ( skippedLevels > 2 ) {
				window.alert( 'You can skip up to 2 levels.' );
				return;
			}
            game.skipCurrentLevel();
        } );
        resetButton.addEventListener( 'click', () => game.loadLevel( game.levelNum ) );

        for ( let i = 0; i < game.levels.length; i++ ) {
            const button = document.createElement( 'BUTTON' );
            levelList.appendChild( button );
            button.innerText = 'Level ' + ( i + 1 ).toString();
            button.addEventListener( 'click', () => {
				if ( game.canLevelBeLoaded( i ) ) {
					game.loadLevel( i );
				}
			} );
		}

		game.levelChangeEmitter.subscribe( () => {
        	setButtonColors( game, levelList );
		} );
    }
}

function setButtonColors( game: Game, levelList: HTMLElement ) {
	game.levelsInfo.forEach( ( state, index ) => {
		const button = levelList.children[ index ] as HTMLElement;
		button.className = '';

		switch( state ) {
			case levelStates.DONE:
				button.classList.add( 'done' );
				break;
			case levelStates.SKIPPED:
				button.classList.add( 'skipped' );
				break;
			case levelStates.UNDONE:
				button.classList.add( 'undone' );
				break;
		}
		if ( game.levelNum == index ) {
			button.classList.add( 'active' );
		}

		if ( !game.canLevelBeLoaded( index ) ) {
			button.style.cursor = 'auto';
		} else {
			button.style.cursor = 'pointer';
		}
	} );
}