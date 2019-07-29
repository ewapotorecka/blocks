
export class Menu {
	constructor( game ) {
		const skipLevelButton = document.getElementById( 'skip-level' );
		const resetButton = document.getElementById( 'reset' );
		const levelInfo = document.getElementById( 'level' );
		const levelList = document.getElementById( 'level-list' );

		game.nextLevelEmitter.subscribe( () => {
			levelInfo.innerText = `Level ${ game.levelNum + 1 } `;
		} );

		skipLevelButton.addEventListener( 'click', () => game.loadNextLevel() );
		resetButton.addEventListener( 'click', () => game.start() );

		levelInfo.innerText = `Level ${ game.levelNum + 1 } `;
		for ( let i = game.levels.length - 1; i >= 0; i-- ) {
			const button = document.createElement( 'BUTTON' );
			levelList.appendChild( button );
			button.innerText = game.levels[ i ].id;
			button.setAttribute( 'id', game.levels[ i ].id );
		}

	}

}