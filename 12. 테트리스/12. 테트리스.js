var table = document.querySelector('#table');
var tableData = [];
var blocks = [
	{
		name: 'i',
		numCode: 1,
		color: 'skyblue',
		shapeIndex: 0,
		shape: [
			[
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0]
			],
			[
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0]
			]
		]
	},
	{
		name: 'j',
		numCode: 2,
		color: 'blue',
		shapeIndex: 0,
		shape: [
			[
				[1, 0, 0],
				[1, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 1, 1],
				[0, 1, 0],
				[0, 1, 0],
			],
			[
				[0, 0, 0],
				[1, 1, 1],
				[0, 0, 1],
			],
			[
				[0, 1, 0],
				[0, 1, 0],
				[1, 1, 0],
			]
		]
	},
	{
		name: 'l',
		numCode: 3,
		color: 'orange',
		shapeIndex: 0,
		shape: [
			[
				[0, 0, 1],
				[1, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 1],
			],
			[
				[0, 0, 0],
				[1, 1, 1],
				[1, 0, 0],
			],
			[
				[1, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
			]
		]
	},
	{
		name: 'o',
		numCode: 4,
		color: 'yellow',
		shapeIndex: 0,
		shape: [
			[
				[0, 1, 1],
				[0, 1, 1],
				[0, 0, 0],
			]
		]
	},
	{
		name: 's',
		numCode: 5,
		color: 'lightgreen',
		shapeIndex: 0,
		shape: [
			[
				[0, 1, 1],
				[1, 1, 0],
				[0, 0, 0],
			],
			[
				[0, 1, 0],
				[0, 1, 1],
				[0, 0, 1],
			],
			[
				[0, 0, 0],
				[0, 1, 1],
				[1, 1, 0],
			],
			[
				[1, 0, 0],
				[1, 1, 0],
				[0, 1, 0],
			]
		]
	},
	{
		name: 't',
		numCode: 6,
		color: 'purple',
		shapeIndex: 0,
		shape: [
			[
				[0, 1, 0],
				[1, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 1, 0],
				[0, 1, 1],
				[0, 1, 0],
			],
			[
				[0, 0, 0],
				[1, 1, 1],
				[0, 1, 0],
			],
			[
				[0, 1, 0],
				[1, 1, 0],
				[0, 1, 0],
			]
		]
	},
	{
		name: 'z',
		numCode: 7,
		color: 'red',
		shapeIndex: 0,
		shape: [
			[
				[1, 1, 0],
				[0, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 0, 1],
				[0, 1, 1],
				[0, 1, 0],
			],
			[
				[0, 0, 0],
				[1, 1, 0],
				[0, 1, 1],
			],
			[
				[0, 1, 0],
				[1, 1, 0],
				[1, 0, 0],
			]
		]
	}
];
var block;
var blockPosition;

const isValidBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10);

function init() {
	const fragment = document.createDocumentFragment();	// 바로 화면에 그리는 것보다 fragment를 만들어서 붙이는게 더 빠름.
	
	[...Array(20).keys()].forEach((row, x) => {
		const tr = document.createElement('tr');
		fragment.append(tr);
		
		[...Array(10).keys()].forEach((col, y) => {
			const td = document.createElement('td');
			tr.append(td);
		});
		
		
		tableData.push(Array(10).fill(0));
	});
	table.append(fragment);
}

function drawView() {
	tableData.forEach((row, x) => {
		row.forEach((col, y) => {
			if (col > 0)
				table.children[x].children[y].className = col >= 10 ? blocks[col / 10 - 1].color : blocks[col - 1].color;
			else
				table.children[x].children[y].className = '';
		});
	});
}

function createBlock() {
	block = blocks[Math.floor(Math.random() * blocks.length)];
	blockPosition = [0, 3];
	
	block.shape[0].forEach((row, x) => {
		row.forEach((col, y) => {
			if (col)
				tableData[x][y + 3] = block.numCode;
		});
	});
	
	drawView();
}

init();
createBlock();
setInterval(dropBlock, 100);

function dropBlock() {
	const validBlocks = [];
	let canGoDown = true;
	let blockShape = block.shape[block.shapeIndex];
	
	for (let i = blockPosition[0]; i < blockPosition[0] + blockShape.length; ++i) {
		if (i >= 20) break;
		
		for (let j = blockPosition[1]; j < blockPosition[1] + blockShape.length; ++j) {
			if (isValidBlock(tableData[i][j])) {
				validBlocks.push([i, j]);
				
				if (isInvalidBlock(tableData[i + 1] && tableData[i + 1][j]))
					canGoDown = false;
			}
		}
	}
	
	if (canGoDown) {
		for (let i = tableData.length - 1; i >= 0; --i) {
			tableData[i].forEach((data, j) => {
				if (data < 10 && tableData[i + 1] && tableData[i + 1][j] < 10) {
					tableData[i + 1][j] = data;
					tableData[i][j] = 0;
				}
			});
		}
		
		blockPosition = [blockPosition[0] + 1, blockPosition[1]];
		drawView();
	} else {
		validBlocks.forEach((block) => {
			tableData[block[0]][block[1]] *= 10;
		});
		
		createBlock();
	}
}

window.addEventListener('keydown', function(e) {	// 누르고 있어도 되는 경우
	switch(e.code) {
		case 'ArrowDown':
			break;
		case 'ArrowLeft':
			break;
		case 'ArrowRight':
			break;
		default:
			break;
	}
});

window.addEventListener('keyup', function(e) {
	switch(e.code) {
		case 'Space':
			break;
		case 'ArrowUp':
			break;
		default:
			break;
	}
});