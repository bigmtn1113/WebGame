var body = document.body;
var table = document.createElement('table');
var rows = [];
var cells = [];
var turn = 'X';
var resultView = document.createElement('div');

var callback = function (event) {
	var clickedRow = rows.indexOf(event.target.parentNode);	// event가 발생한 곳의 부모가 몇 번째 줄에 있는가
	var clickedCell = cells[clickedRow].indexOf(event.target);	// event가 발생한 곳이 몇 번째 칸에 있는가
	
	if (cells[clickedRow][clickedCell].textContent === '') {	// 칸이 채워져 있지 않을 경우	
		cells[clickedRow][clickedCell].textContent = turn;
		
		var isVictory = false;
		if (cells[clickedRow][0].textContent === turn &&
			cells[clickedRow][1].textContent === turn &&
			cells[clickedRow][2].textContent === turn)	// 가로줄 검사
			isVictory = true;
		if (cells[0][clickedCell].textContent === turn &&
			cells[1][clickedCell].textContent === turn &&
			cells[2][clickedCell].textContent === turn)	// 세로줄 검사
			isVictory = true;
		if (clickedRow - clickedCell === 0) {	// 대각선 검사
			if (cells[0][0].textContent === turn &&
				cells[1][1].textContent === turn &&
				cells[2][2].textContent === turn)
				isVictory = true;
		}
		if (Math.abs(clickedRow - clickedCell) === 2) {	//대각선 검사
			if (cells[0][2].textContent === turn &&
				cells[1][1].textContent === turn &&
				cells[2][0].textContent === turn)
				isVictory = true;
		}
		
		if (isVictory) {
			resultView.textContent = turn + '님이 승리하셨습니다!';
			
			cells.forEach(function (rows) {
				rows.forEach(function (cell) {
					cell.textContent = '';
				});
			});
		} else {		
			if (turn === 'X')
				turn = 'O';
			else
				turn = 'X';
		}
		
		if (cells[0][0].textContent !== '' &&
			cells[0][1].textContent !== '' &&
			cells[0][2].textContent !== '' &&
			cells[1][0].textContent !== '' &&
			cells[1][1].textContent !== '' &&
			cells[1][2].textContent !== '' &&
			cells[2][0].textContent !== '' &&
			cells[2][1].textContent !== '' &&
			cells[2][2].textContent !== '') {	// 무승부일 경우
			resultView.textContent = '무승부입니다';
			
			cells.forEach(function (rows) {
				rows.forEach(function (cell) {
					cell.textContent = '';
				});
			});
			turn = 'X';
		}
	}
}

for (var i = 0; i < 3; ++i) {
	var row = document.createElement('tr');
	rows.push(row);
	cells.push([]);
	
	for (var j = 0; j < 3; ++j) {
		var cell = document.createElement('td');
		cell.addEventListener('click', callback);
		
		cells[i].push(cell);
		row.append(cell);
	}
	
	table.append(row);
}

body.append(table);
body.append(resultView);