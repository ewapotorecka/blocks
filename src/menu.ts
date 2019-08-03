import { levelStates, Game } from './game';

export class Menu {
    constructor( game: Game ) {
        const skipLevelButton = document.getElementById( 'skip-level' )!;
        const resetButton = document.getElementById( 'reset' )!;
        const levelList = document.getElementById( 'level-list' )!;

        game.levelChangeEmitter.subscribe( () => {
        	setButtonColors( game, levelList );
        } );

        skipLevelButton.addEventListener( 'click', () => {
            game.skipCurrentLevel();
        } );
        resetButton.addEventListener( 'click', () => game.loadLevel( game.levelNum ) );

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

function setButtonColors( game: Game, levelList: HTMLElement ) {
	game.levelsInfo.forEach( ( state, index ) => {
		const button = levelList.children[ index ] as HTMLElement;

		if ( state == levelStates.DONE ) {
			button.style.backgroundColor = '#2E294E';
			button.style.color = '#FFF';
		} else if ( state == levelStates.SKIPPED ) {
			button.style.backgroundColor = '#FFD400';
			button.style.color = 'black';
		} else if ( state == levelStates.UNDONE && game.levelNum == index ) {
			button.style.backgroundColor = '#541388';
			button.style.color = '#FFF';
		}
	} );
}