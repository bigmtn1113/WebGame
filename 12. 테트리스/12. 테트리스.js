var table = document.querySelector('#table');
var nextTable = document.querySelector('#next-table');
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
var nextBlock;
var blockPosition;

const isValidBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10);

function init() {
	const fragment = document.createDocumentFragment();	// 바로 화면에 그리는 것보다 fragment를 만들어서 붙이는게 더 빠름.
	
	[...Array(20).keys()].forEach((row, i) => {
		const tr = document.createElement('tr');
		fragment.append(tr);
		
		[...Array(10).keys()].forEach((col, j) => {
			const td = document.createElement('td');
			tr.append(td);
		});
		
		
		tableData.push(Array(10).fill(0));
	});
	table.append(fragment);
	
	const nextFragment = document.createDocumentFragment();
	
	[...Array(4).keys()].forEach((row, i) => {
		const tr = document.createElement('tr');
		nextFragment.append(tr);
		
		[...Array(4).keys()].forEach((col, j) => {
			const td = document.createElement('td');
			tr.append(td);
		});
	});
	nextTable.append(nextFragment);
}

function drawView() {
	tableData.forEach((row, i) => {
		row.forEach((col, j) => {
			if (col > 0)
				table.children[i].children[j].className = col >= 10 ? blocks[col / 10 - 1].color : blocks[col - 1].color;
			else
				table.children[i].children[j].className = '';
		});
	});
}

function drawNextBlock() {
	nextTable.querySelectorAll('tr').forEach((row, i) => {
		Array.from(row.children).forEach((col, j) => {
			if (nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0)
				nextTable.querySelectorAll('tr')[i + 1].children[j].className = blocks[nextBlock.numCode - 1].color;
			else if (i < 3)
				nextTable.querySelectorAll('tr')[i + 1].children[j].className = '';
		});
	});
}

function createBlock() {
	if (!block)
		block = blocks[Math.floor(Math.random() * blocks.length)];
	else
		block = nextBlock;
	
	nextBlock = blocks[Math.floor(Math.random() * blocks.length)];
	drawNextBlock();
	
	block.shapeIndex = 0;
	blockPosition = [0, 3];
	let isGameOver = false;
	
	block.shape[0].slice(0, 2).forEach((row, i) => {
		row.forEach((col, j) => {
			if (tableData[i][j + 3])
				isGameOver = true;
		});
	});
	
	if (isGameOver) {
		clearInterval(interval);
		drawView();
		alert('game over');
		return;
	}
	
	block.shape[0].forEach((row, i) => {
		row.forEach((col, j) => {
			if (col)
				tableData[i][j + 3] = block.numCode;
		});
	});
	
	
	drawView();
}

function checkRows() {
	const fullRows = [];
	
	tableData.forEach((row, i) => {
		let cnt = 0;
		row.forEach((col, j) => {
			if (col > 0)
				++cnt;
		});
		
		if (cnt === 10)
			fullRows.push(i);
	});
	
	tableData = tableData.filter((row, i) => !fullRows.includes(i));
	for (let i = 0; i < fullRows.length; ++i)
		tableData.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	
	let score = parseInt(document.querySelector('#score').textContent);
	
	if (fullRows.length === 1) score += 100;
	else if (fullRows.length === 2) score += 300;
	else if (fullRows.length === 3) score += 500;
	else if (fullRows.length === 4) score += 800;
	
	document.querySelector('#score').textContent = score;
}

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
		
		++blockPosition[0];
		drawView();
		return true;
	} else {
		validBlocks.forEach((block) => {
			tableData[block[0]][block[1]] *= 10;
		});
		
		checkRows();
		createBlock();
		return false;
	}
}

init();
createBlock();
let interval = setInterval(dropBlock, 2000);

let isStopped = false;

document.querySelector('#stop').addEventListener('click', function() {
	clearInterval(interval);
	isStopped = true;
});
document.querySelector('#start').addEventListener('click', function() {
	if (interval)
		clearInterval(interval);
	interval = setInterval(dropBlock, 2000);
	isStopped = false;
});

window.addEventListener('keydown', function(e) {	// 누르고 있어도 되는 경우
	if (isStopped) return;

	switch(e.code) {
		case 'ArrowDown':
			dropBlock();
			break;
		case 'ArrowLeft': {
			let isMovable = true;
			let blockShape = block.shape[block.shapeIndex];
			
			for (let i = blockPosition[0]; i < blockPosition[0] + blockShape.length; ++i) {
				if (!isMovable) break;
				
				for (let j = blockPosition[1]; j < blockPosition[1] + blockShape.length; ++j) {
					if (!tableData[i] || !tableData[i][j]) continue;
					if (isValidBlock(tableData[i][j]) && isInvalidBlock(tableData[i] && tableData[i][j - 1]))
						isMovable = false;
				}
			}
			
			if (isMovable) {
				--blockPosition[1];
				
				tableData.forEach((row, i) => {
					row.forEach((col, j) => {
						if (tableData[i][j - 1] === 0 && col < 10) {
							tableData[i][j - 1] = col;
							tableData[i][j] = 0;
						}
					});
				});
				
				drawView();
			}
			
			break;
		}
		case 'ArrowRight': {
			let isMovable = true;
			let blockShape = block.shape[block.shapeIndex];
			
			for (let i = blockPosition[0]; i < blockPosition[0] + blockShape.length; ++i) {
				if (!isMovable) break;
				
				for (let j = blockPosition[1]; j < blockPosition[1] + blockShape.length; ++j) {
					if (!tableData[i] || !tableData[i][j]) continue;
					if (isValidBlock(tableData[i][j]) && isInvalidBlock(tableData[i] && tableData[i][j + 1]))
						isMovable = false;
				}
			}
			
			if (isMovable) {
				++blockPosition[1];
				
				tableData.forEach((row, i) => {
					for (let j = row.length - 1; j >= 0; --j) {
						if (tableData[i][j + 1] === 0 && row[j] < 10) {
							tableData[i][j + 1] = row[j];
							tableData[i][j] = 0;
						}
					}
				});
				
				drawView();
			}
			
			break;
		}
		default:
			break;
	}
});

window.addEventListener('keyup', function(e) {
	if (isStopped) return;
	
	switch(e.code) {
		case 'Space':
			while (dropBlock()) {}
			break;
		case 'ArrowUp': {
			let isChangeable = true;
			let blockShape = block.shape[block.shapeIndex];
			const nextShapeIndex = block.shapeIndex + 1 === block.shape.length ? 0 : block.shapeIndex + 1;
			const nextBlockShape = block.shape[nextShapeIndex];
			
			for (let i = blockPosition[0]; i < blockPosition[0] + blockShape.length; ++i) {
				if (!isChangeable) break;
				
				for (let j = blockPosition[1]; j < blockPosition[1] + blockShape.length; ++j) {
					if (!tableData[i]) continue;
					if (nextBlockShape[i - blockPosition[0]][j - blockPosition[1]] > 0 && isInvalidBlock(tableData[i] && tableData[i][j]))
						isChangeable = false;
				}
			}
			
			if (isChangeable) {
				for (let i = blockPosition[0]; i < blockPosition[0] + blockShape.length; ++i) {
					for (let j = blockPosition[1]; j < blockPosition[1] + blockShape.length; ++j) {
						if (!tableData[i]) continue;
						let nextBlockShapeCell = nextBlockShape[i - blockPosition[0]][j - blockPosition[1]];
						
						if (nextBlockShapeCell > 0 && tableData[i][j] === 0)
							tableData[i][j] = block.numCode;
						else if (nextBlockShapeCell === 0 && tableData[i][j] && tableData[i][j] < 10)
							tableData[i][j] = 0;
					}
				}
				
				block.shapeIndex = nextShapeIndex;
				drawView();
			}
			
			break;
		}
		case 'KeyZ': {
			let isChangeable = true;
			let blockShape = block.shape[block.shapeIndex];
			const nextShapeIndex = block.shapeIndex - 1 === -1 ? block.shape.length - 1 : block.shapeIndex - 1;
			const nextBlockShape = block.shape[nextShapeIndex];
			
			for (let i = blockPosition[0]; i < blockPosition[0] + blockShape.length; ++i) {
				if (!isChangeable) break;
				
				for (let j = blockPosition[1]; j < blockPosition[1] + blockShape.length; ++j) {
					if (!tableData[i]) continue;
					if (nextBlockShape[i - blockPosition[0]][j - blockPosition[1]] > 0 && isInvalidBlock(tableData[i] && tableData[i][j]))
						isChangeable = false;
				}
			}
			
			if (isChangeable) {
				for (let i = blockPosition[0]; i < blockPosition[0] + blockShape.length; ++i) {
					for (let j = blockPosition[1]; j < blockPosition[1] + blockShape.length; ++j) {
						if (!tableData[i]) continue;
						let nextBlockShapeCell = nextBlockShape[i - blockPosition[0]][j - blockPosition[1]];
						
						if (nextBlockShapeCell > 0 && tableData[i][j] === 0)
							tableData[i][j] = block.numCode;
						else if (nextBlockShapeCell === 0 && tableData[i][j] && tableData[i][j] < 10)
							tableData[i][j] = 0;
					}
				}
				
				block.shapeIndex = nextShapeIndex;
				drawView();
			}
			
			break;
		}
		default:
			break;
	}
});