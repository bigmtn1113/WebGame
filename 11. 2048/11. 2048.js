var table = document.querySelector('#table');
var tableData = [];

function init() {
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
	document.body.append(table);
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
	var randomX = Math.floor(Math.random() * 4);
	var randomY = Math.floor(Math.random() * 4);
	
	tableData[randomX][randomY] = '2';
	draw();
}

init();
createRandomPosition();

window.addEventListener('keydown', function(e) {
	if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) return;
	
	switch(e.code) {
		case 'ArrowUp':
			var newData = [[], [], [], []];
			
			tableData.forEach(function(rowData, x) {
				rowData.forEach(function(columnData, y) {
					if (columnData)
						newData[y].push(columnData);
				});
			});
			
			[1, 2, 3, 4].forEach(function(rowData, x) {
				[1, 2, 3, 4].forEach(function(columnData, y) {
					tableData[x][y] = newData[y][x] || 0;
				});
			});
			break;
		case 'ArrowDown':
			var newData = [[], [], [], []];
			
			tableData.forEach(function(rowData, x) {
				rowData.forEach(function(columnData, y) {
					if (columnData)
						newData[y].push(columnData);
				});
			});
			
			[1, 2, 3, 4].forEach(function(rowData, x) {
				[1, 2, 3, 4].forEach(function(columnData, y) {
					tableData[3 - x][y] = newData[y][x] || 0;
				});
			});
			break;
		case 'ArrowLeft':
			var newData = [[], [], [], []];
			
			tableData.forEach(function(rowData, x) {
				rowData.forEach(function(columnData, y) {
					if (columnData)
						newData[x].push(columnData);
				});
			});
			
			[1, 2, 3, 4].forEach(function(rowData, x) {
				[1, 2, 3, 4].forEach(function(columnData, y) {
					tableData[x][y] = newData[x][y] || 0;
				});
			});
			break;
		case 'ArrowRight':
			var newData = [[], [], [], []];
			
			tableData.forEach(function(rowData, x) {
				rowData.forEach(function(columnData, y) {
					if (columnData)
						newData[x].push(columnData);
				});
			});
			
			[1, 2, 3, 4].forEach(function(rowData, x) {
				[1, 2, 3, 4].forEach(function(columnData, y) {
					tableData[x][3 - y] = newData[x][y] || 0;
				});
			});
			break;
	}
	createRandomPosition();
});