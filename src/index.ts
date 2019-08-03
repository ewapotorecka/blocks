import { Game } from './game';
import { Menu } from './menu';
import { levels } from './levels';

const game = new Game( document.getElementById( 'blocksBoard' ) as HTMLCanvasElement, levels);
const menu = new Menu( game );
game.start();
