import { RectangleBlock } from './rectangleblock';
import { CustomBlock } from './customblock';

export const levels = [
	{
		board: {
			position: { x: 0, y: 0 },
			height: 20,
			width: 10 },
		exit: { x: 0, y: 0 },
		playerPosition: { x: 9, y: 9 },
		blocks: [
			new RectangleBlock( { x: 3, y: 4 }, 3, 1 ),
			new CustomBlock( [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ] ),
			new CustomBlock( [ { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 4, y: 3 } ] ),
			new CustomBlock( [ { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 7, y: 7 }, { x: 7, y: 5 } ] ),
			new CustomBlock( [ { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 } ] ),
			new CustomBlock( [ { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 } ] ),
			new CustomBlock( [ { x: 1, y: 9 }, { x: 3, y: 9 } ] ) ]
	},
	{
		board: {
			position: { x: 0, y: 0 },
			height: 10,
			width: 10 },
		exit: { x: 0, y: 0 },
		playerPosition: { x: 9, y: 9 },
		blocks: [
			new RectangleBlock( { x: 3, y: 4 }, 3, 1 ),
			new CustomBlock( [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ] ),
			new CustomBlock( [ { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 } ] ),
			new CustomBlock( [ { x: 1, y: 9 }, { x: 3, y: 9 } ] ) ]
	},
	{
		board: {
			position: { x: 0, y: 0 },
			height: 8,
			width: 9 },
		exit: { x: 0, y: 0 },
		playerPosition: { x: 8, y: 7 },
		blocks: [
			new RectangleBlock( { x: 2, y: 1 }, 6, 1 ),
			new RectangleBlock( { x: 2, y: 3 }, 6, 1 ),
			new RectangleBlock( { x: 2, y: 5 }, 6, 1 ),
			new CustomBlock( [ { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 }, ] ),
			new RectangleBlock( { x: 1, y: 7 }, 5, 1 ),
			new CustomBlock( [ { x: 0, y: 2 } ] ),
			new CustomBlock( [ { x: 4, y: 0 } ] ),
		]
	},
	{
		board: {
			position: { x: 0, y: 0 },
			height: 9,
			width: 9
		},
		exit: { x: 4, y: 4 },
		playerPosition: { x: 6, y: 6 },
		blocks: [
			new CustomBlock( [ { x: 3, y: 3 }, { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 3 } ] ),
			new RectangleBlock( { x: 2, y: 3 }, 1, 3 ),
			new RectangleBlock( { x: 3, y: 2 }, 3, 1 ),
			new RectangleBlock( { x: 6, y: 3 }, 1, 3 ),
			new RectangleBlock( { x: 3, y: 6 }, 3, 1 ),
			new CustomBlock( [ { x: 7, y: 7 }, { x: 3, y: 4 } ] ),
			new CustomBlock( [ { x: 1, y: 1 }, { x: 4, y: 3 } ] ),
			new CustomBlock( [ { x: 1, y: 7 }, { x: 5, y: 4 } ] ),
			new CustomBlock( [ { x: 7, y: 1 }, { x: 4, y: 5 } ] ),
			new RectangleBlock( { x: 4, y: 0 }, 1, 2 ),
			new RectangleBlock( { x: 4, y: 7 }, 1, 2 ),
			new RectangleBlock( { x: 0, y: 4 }, 2, 1 ),
			new RectangleBlock( { x: 7, y: 4 }, 2, 1 ),
		]
	},
	{
		board: {
			position: { x: 0, y: 0 },
			height: 8,
			width: 9
		},
		exit: { x: 0, y: 0 },
		playerPosition: { x: 8, y: 7 },
		blocks: [
			new RectangleBlock( { x: 2, y: 1 }, 6, 1 ),
			new RectangleBlock( { x: 2, y: 3 }, 6, 1 ),
			new RectangleBlock( { x: 2, y: 5 }, 6, 1 ),
			new CustomBlock( [ { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 }, ] ),
			new RectangleBlock( { x: 1, y: 7 }, 5, 1 ),
			new CustomBlock( [ { x: 0, y: 2 } ] ),
			new CustomBlock( [ { x: 4, y: 0 } ] ),
			new CustomBlock( [ { x: 1, y: 1 }, { x: 6, y: 6 } ] ),
		]
	}
];
