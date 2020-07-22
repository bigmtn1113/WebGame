var body = document.body;
var h1 = document.createElement('h1');
h1.textContent = '틱택토';
var table = document.createElement('table');
var rows = [];
var cells = [];
var isVictory;
var turn = 'X';
var resultView = document.createElement('div');

function resultCheck(clickedRow, clickedCell) {
	if (cells[clickedRow][0].textContent === turn &&
		cells[clickedRow][1].textContent === turn &&
		cells[clickedRow][2].textContent === turn)	// 가로줄 검사
		isVictory = true;
		
	if (cells[0][clickedCell].textContent === turn &&
		cells[1][clickedCell].textContent === turn &&
		cells[2][clickedCell].textContent === turn)	// 세로줄 검사
		isVictory = true;
		
	if (cells[0][0].textContent === turn &&
		cells[1][1].textContent === turn &&
		cells[2][2].textContent === turn)	// 대각선 검사
		isVictory = true;
	
	if (cells[0][2].textContent === turn &&
		cells[1][1].textContent === turn &&
		cells[2][0].textContent === turn)	// 대각선 검사
		isVictory = true;
}
function initGame() {
	setTimeout(function() {
		resultView.textContent = '';
		cells.forEach(function(rows) {
			rows.forEach(function(cell) {
				cell.textContent = '';
			});
		});
	}, 1000);
}

var callback = function(event) {
	if (turn === 'O') return;	// PC 차례일 때 클릭 방지
	
	var clickedRow = rows.indexOf(event.target.parentNode);	// event가 발생한 곳의 부모가 몇 번째 줄에 있는가
	var clickedCell = cells[clickedRow].indexOf(event.target);	// event가 발생한 곳이 몇 번째 칸에 있는가
	isVictory = false;
	
	if (cells[clickedRow][clickedCell].textContent === '') {	// 칸이 채워져 있지 않을 경우	
		cells[clickedRow][clickedCell].textContent = turn;
		
		var blankCell = [];
				
		cells.forEach(function(rows) {
			rows.forEach(function(cell) {
				blankCell.push(cell);
			});
		});
		
		blankCell = blankCell.filter(function(cell) { return !cell.textContent });	// 선택 안된 칸들 고르기
		
		resultCheck(clickedRow, clickedCell);
		
		if (isVictory) {
			resultView.textContent = 'Player가 승리하셨습니다!';
			initGame();
		} else if (blankCell.length === 0) {
			resultView.textContent = '무승부입니다';
			initGame();
		} else {		
			if (turn === 'X')
				turn = 'O';
			
			setTimeout(function() {
				var pcTurn = blankCell[Math.floor(Math.random() * blankCell.length)];
				pcTurn.textContent = turn;
				
				var pcClickRow = rows.indexOf(pcTurn.parentNode);
				var pcClickCell = cells[pcClickRow].indexOf(pcTurn);
				resultCheck(pcClickRow, pcClickCell);
				
				if (isVictory) {
					resultView.textContent = 'PC가 승리하였습니다..';
					initGame();
				}
				
				turn = 'X';
			}, 1000);
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

body.append(h1);
body.append(table);
body.append(resultView);