import { Game } from './game';
import { Menu } from './menu';
import { levels } from './levels';

const game = new Game();
game.start();
const menu = new Menu( game );

