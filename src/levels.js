
export const levels = [
	{
		board: {
			height: 10,
			width: 10 },
		exit: { x: 0, y: 0 },
		playerPosition: { x: 9, y: 9 },
		blocks: [
			{
				type: 'rectangle',
				position: { x: 3, y: 4 },
				width: 3,
				height: 1
			},
			{
				type: 'custom',
				points: [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ]
			} ],
		id: 1
	},
	{
		board: {
			height: 20,
			width: 10 },
		exit: { x: 0, y: 0 },
		playerPosition: { x: 9, y: 9 },
		blocks: [
			{
				type: 'rectangle',
				position: { x: 3, y: 4 },
				width: 3,
				height: 1
			},
			{
				type: 'custom',
				points: [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ]
			},
			{
				type: 'custom',
				points: [ { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 4, y: 3 } ]
			},
			{
				type: 'custom',
				points: [ { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 7, y: 7 }, { x: 7, y: 5 } ]
			},
			{
				type: 'custom',
				points: [ { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 } ]
			},
			{
				type: 'custom',
				points: [ { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 } ]
			},
			{
				type: 'custom',
				points: [ { x: 1, y: 9 }, { x: 3, y: 9 } ]
			}
		],
		id: 2
	},
	{
		board: {
			height: 10,
			width: 10 },
		exit: { x: 0, y: 0 },
		playerPosition: { x: 9, y: 9 },
		blocks: [
			{
				type: 'rectangle',
				position: { x: 3, y: 4 },
				width: 3,
				height: 1
			},
			{
				type: 'custom',
				points: [ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ]
			},
			{
				type: 'custom',
				points: [ { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 8, y: 9 } ]
			},
			{
				type: 'custom',
				points: [ { x: 1, y: 9 }, { x: 3, y: 9 } ]
			}
		],
		id: 3
	},
	{
		board: {
			height: 8,
			width: 9 },
		exit: { x: 0, y: 0 },
		playerPosition: { x: 8, y: 7 },
		blocks: [
			{
				type: 'rectangle',
				position: { x: 2, y: 1 },
				width: 6,
				height: 1
			},
			{
				type: 'rectangle',
				position: { x: 2, y: 3 },
				width: 6,
				height: 1
			},
			{
				type: 'rectangle',
				position: { x: 2, y: 5 },
				width: 6,
				height: 1
			},
			{
				type: 'custom',
				points: [ { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 }, ]
			},
			{
				type: 'rectangle',
				position: { x: 1, y: 7 },
				width: 5,
				height: 1
			},
			{
				type: 'custom',
				points: [ { x: 0, y: 2 } ]
			},
			{
				type: 'custom',
				points: [ { x: 4, y: 0 } ]
			}
		],
		id: 4
	},
	{
		board: {
			height: 9,
			width: 9
		},
		exit: { x: 4, y: 4 },
		playerPosition: { x: 6, y: 6 },
		blocks: [
			{
				type: 'custom',
				points: [ { x: 3, y: 3 }, { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 3 } ]
			},
			{
				type: 'rectangle',
				position: { x: 2, y: 3 },
				width: 1,
				height: 3
			},
			{
				type: 'rectangle',
				position: { x: 3, y: 2 },
				width: 3,
				height: 1
			},
			{
				type: 'rectangle',
				position: { x: 6, y: 3 },
				width: 1,
				height: 3
			},
			{
				type: 'rectangle',
				position: { x: 3, y: 6 },
				width: 3,
				height: 1
			},
			{
				type: 'custom',
				points: [ { x: 7, y: 7 }, { x: 3, y: 4 } ]
			},
			{
				type: 'custom',
				points: [ { x: 1, y: 1 }, { x: 4, y: 3 } ]
			},
			{
				type: 'custom',
				points: [ { x: 1, y: 7 }, { x: 5, y: 4 } ]
			},
			{
				type: 'custom',
				points: [ { x: 7, y: 1 }, { x: 4, y: 5 } ]
			},
			{
				type: 'rectangle',
				position: { x: 4, y: 0 },
				width: 1,
				height: 2
			},
			{
				type: 'rectangle',
				position: { x: 4, y: 7 },
				width: 1,
				height: 2
			},
			{
				type: 'rectangle',
				position: { x: 0, y: 4 },
				width: 2,
				height: 1
			},
			{
				type: 'rectangle',
				position: { x: 7, y: 4 },
				width: 2,
				height: 1
			}
		],
		id: 5
	},
	{
		board: {
			height: 8,
			width: 9
		},
		exit: { x: 0, y: 0 },
		playerPosition: { x: 8, y: 7 },
		blocks: [
			{
				type: 'rectangle',
				position: { x: 2, y: 1 },
				width: 6,
				height: 1
			},
			{
				type: 'rectangle',
				position: { x: 2, y: 3 },
				width: 6,
				height: 1
			},
			{
				type: 'rectangle',
				position: { x: 2, y: 5 },
				width: 6,
				height: 1
			},
			{
				type: 'custom',
				points: [ { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 6 }, ]
			},
			{
				type: 'rectangle',
				position: { x: 1, y: 7 },
				width: 5,
				height: 1
			},
			{
				type: 'custom',
				points: [ { x: 0, y: 2 } ]
			},
			{
				type: 'custom',
				points: [ { x: 4, y: 0 } ]
			},
			{
				type: 'custom',
				points: [ { x: 1, y: 1 }, { x: 6, y: 6 } ]
			}
		],
		id: 6
	}
];
