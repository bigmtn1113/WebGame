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
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0]
			],
			[
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0]
			],
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
				[0, 0, 0],
				[0, 1, 1],
				[0, 1, 1],
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
				[0, 0, 0],
				[0, 1, 1],
				[1, 1, 0],
			],
			[
				[1, 0, 0],
				[1, 1, 0],
				[0, 1, 0],
			],
			[
				[0, 1, 1],
				[1, 1, 0],
				[0, 0, 0],
			],
			[
				[0, 1, 0],
				[0, 1, 1],
				[0, 0, 1],
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
				[0, 0, 0],
				[1, 1, 0],
				[0, 1, 1],
			],
			[
				[0, 1, 0],
				[1, 1, 0],
				[1, 0, 0],
			],
			[
				[1, 1, 0],
				[0, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 0, 1],
				[0, 1, 1],
				[0, 1, 0],
			]
		]
	}
];
var stopDrop = false;

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
	tableData.forEach(function(row, x) {
		row.forEach(function(column, y) {
			table.children[x].children[y].className = blockData[column][0];
		});
	});
}

function createBlock() {
	stopDrop = false;
	
	var block = blockData[Math.floor(Math.random() * 8)][2];
	block.forEach(function(row, x) {
		row.forEach(function(column, y) {
			tableData[x][y + 3] = column;
		});
	});
	
	drawView();
}

init();
//createBlock();

function dropBlock() {
	for (var x = tableData.length - 1; x >= 0; --x) {
		tableData[x].forEach(function(column, y) {
			if (column > 0 && column < 8) {	// 블록(1 ~ 7)
				if (tableData[x + 1] && !stopDrop) {	// 내려갈 칸이 존재하는가 && 블록이 땅에 닿지 않았는가
					tableData[x + 1][y] = column;
					tableData[x][y] = 0;
				} else {
					stopDrop = true;
					tableData[x][y] = column * 10;	// 쌓아진 블록
				}
			}
		});
	}
	if (stopDrop) {	// 블록이 땅에 닿으면 새로운 블록 생성
		createBlock();
	}
	drawView();
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

//setInterval(dropBlock, 100);