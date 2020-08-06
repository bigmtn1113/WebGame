var table = document.querySelector('#table');
var tableData = [];
var blockData = {	// [색깔, 쌓아지기 전인가, 모양]
	0: ['white', true, []],
	1: ['skyblue', true, [[1, 1, 1, 1]]],
	2: ['blue', true, [[2, 0, 0,], [2, 2, 2]]],
	3: ['orange', true, [[0, 0, 3,], [3, 3, 3]]],
	4: ['yellow', true, [[4, 4,], [4, 4]]],
	5: ['lightgreen', true, [[0, 5, 5,], [5, 5, 0]]],
	6: ['purple', true, [[0, 6, 0,], [6, 6, 6]]],
	7: ['red', true, [[7, 7, 0,], [0, 7, 7]]]
};

function drawTable() {
	var fragment = document.createDocumentFragment();	// 바로 화면에 그리는 것보다 fragment를 만들어서 붙이는게 더 빠름.
	
	for (var i = 0; i < 20; ++i) {
		var tr = document.createElement('tr');
		tableData.push([]);
		
		for (var j = 0; j < 10; ++j) {
			var td = document.createElement('td');
			tableData[i].push(0);
			
			tr.append(td);
		}
		fragment.append(tr);
	}
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
	var block = blockData[Math.floor(Math.random() * 8)][2];
	console.log(block);
	block.forEach(function(row, x) {
		row.forEach(function(column, y) {
			tableData[x][y + 3] = column;
		});
	});
	
	drawView();
}

drawTable();
createBlock();

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