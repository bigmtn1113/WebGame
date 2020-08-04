var frame = document.querySelector('#frame');
var table = document.querySelector('#table');
var score = document.querySelector('#score');
var tableData;
var scoreData;

function init() {
	tableData = [];
	scoreData = 0;
	
	table.innerHTML = '';
	score.textContent = '0';
	frame.append(score);
	
	[1, 2, 3, 4].forEach(function() {
		var rowData = [];
		var tr = document.createElement('tr');
		
		[1, 2, 3, 4].forEach(function() {
			rowData.push(0);
			
			var td = document.createElement('td');
			td.textContent = '0';
			tr.append(td);
		});
		
		tableData.push(rowData);
		table.append(tr);
	});
	
	frame.append(table);
}

function draw() {
	tableData.forEach(function(rowData, x) {
		rowData.forEach(function(columnData, y) {
			if (columnData > 0)
				table.children[x].children[y].textContent = columnData;
			else
				table.children[x].children[y].textContent = '';
		});
	});
}

function createRandomPosition() {
	var randomPositionList = [];
	tableData.forEach(function(rowData, x) {
		rowData.forEach(function(columnData, y) {
			if (!columnData)
				randomPositionList.push([x, y]);
		});
	});
	
	var randomPosition = randomPositionList[Math.floor(Math.random() * randomPositionList.length)];
	tableData[randomPosition[0]][randomPosition[1]] = 2;
	draw();
}

init();
createRandomPosition();

function sumScore(number) {
	scoreData += number;
	score.textContent = scoreData;
}

function renewTableData(arrow, newData) {
	[1, 2, 3, 4].forEach(function(rowData, x) {
		[1, 2, 3, 4].forEach(function(columnData, y) {
			if (arrow === 'up') tableData[x][y] = newData[y][x] || 0;
			else if (arrow === 'down') tableData[3 - x][y] = newData[y][x] || 0;
			else if (arrow === 'left') tableData[x][y] = newData[x][y] || 0;
			else if (arrow === 'right') tableData[x][3 - y] = newData[x][y] || 0;
		});
	});
}

window.addEventListener('keydown', function(e) {
	if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) return;
	
	switch(e.code) {
		case 'ArrowUp':
			var newData = [[], [], [], []];
			
			tableData.forEach(function(rowData, x) {
				rowData.forEach(function(columnData, y) {
					if (columnData) {
						if (newData[y][newData[y].length - 1] === columnData) {
							newData[y][newData[y].length - 1] *= 2;
							sumScore(newData[y][newData[y].length - 1]);
						}
						else
							newData[y].push(columnData);
					}
				});
			});
			
			renewTableData('up', newData);
			break;
		case 'ArrowDown':
			var newData = [[], [], [], []];
			
			tableData.forEach(function(rowData, x) {
				rowData.forEach(function(columnData, y) {
					if (columnData)
						newData[y].unshift(columnData);
				});
			});
			for (var x = 0; x < 4; ++x) {
				if (newData[x].length > 1 && newData[x][0] === newData[x][1]) {
					newData[x][0] *= 2;
					newData[x].splice(1, 1);
					sumScore(newData[x][0]);
				}
				if (newData[x].length > 2 && newData[x][1] === newData[x][2]) {
					newData[x][1] *= 2;
					newData[x].splice(2, 1);
					sumScore(newData[x][1]);
				}
				if (newData[x].length > 3 && newData[x][2] === newData[x][3]) {
					newData[x][2] *= 2;
					newData[x].splice(3, 1);
					sumScore(newData[x][2]);
				}
			}
			
			renewTableData('down', newData);
			break;
		case 'ArrowLeft':
			var newData = [[], [], [], []];
			
			tableData.forEach(function(rowData, x) {
				rowData.forEach(function(columnData, y) {
					if (columnData) {
						if (newData[x][newData[x].length - 1] === columnData) {
							newData[x][newData[x].length - 1] *= 2;
							sumScore(newData[x][newData[x].length - 1]);
						}
						else
							newData[x].push(columnData);
					}
				});
			});
			
			renewTableData('left', newData);
			break;
		case 'ArrowRight':
			var newData = [[], [], [], []];
			
			tableData.forEach(function(rowData, x) {
				rowData.forEach(function(columnData, y) {
					if (columnData)
						newData[x].unshift(columnData);
				});
				if (newData[x].length > 1 && newData[x][0] === newData[x][1]) {
					newData[x][0] *= 2;
					newData[x].splice(1, 1);
					sumScore(newData[x][0]);
				}
				if (newData[x].length > 2 && newData[x][1] === newData[x][2]) {
					newData[x][1] *= 2;
					newData[x].splice(2, 1);
					sumScore(newData[x][1]);
				}
				if (newData[x].length > 3 && newData[x][2] === newData[x][3]) {
					newData[x][2] *= 2;
					newData[x].splice(3, 1);
					sumScore(newData[x][2]);
				}
			});
			
			renewTableData('right', newData);
			break;
	}
	createRandomPosition();
	
	var endcnt = 0;
	tableData.forEach(function(rowData, x) {
		rowData.forEach(function(columnData, y) {
			if (columnData)
				++endcnt;
		});
	});
	if (endcnt === 16) {
		alert('score: ' + scoreData + '\nGame Over..');
		init();
		createRandomPosition();
	}
});