var tbody = document.querySelector('#table tbody');

document.querySelector('#exec').addEventListener('click', function() {
	tbody.innerHTML = '';	// tbody 내부 태그들 초기화
	document.querySelector('#result').textContent = '';
	document.querySelector('#timer').textContent = '';
	var hor = parseInt(document.querySelector('#hor').value);
	var ver = parseInt(document.querySelector('#ver').value);
	var mine = parseInt(document.querySelector('#mine').value);
	
	if (hor === 0 || isNaN(hor)) {
		alert('가로가 0보다 커야합니다');
		document.querySelector('#hor').focus();
		return;
	}
	if (ver === 0 || isNaN(ver)) {
		alert('세로가 0보다 커야합니다.');
		document.querySelector('#ver').focus();
		return;
	}
	if (mine === 0 || isNaN(mine)) {
		alert('지뢰 개수가 0보다 커야합니다.');
		document.querySelector('#mine').focus();
		return;
	}
	if (mine >= hor * ver) {
		alert('지뢰 개수가 너무 많습니다. ' + hor * ver + '보다 작은 값을 입력해주세요.');
		document.querySelector('#mine').focus();
		return;
	}
	
	
	var startTime = new Date();	// performance.now()는 소수점이 많음. 정밀한 작업할 때 사용. 사용법은 Date와 동일.
	var endTime;
	
	var dataset = [];
	var stopFlag = false;
	var openedCell = 0;
	for (var i = 0; i < ver; ++i) {
		var arr = [];
		dataset.push(arr);
		var tr = document.createElement('tr');
		for (var j = 0; j < hor; ++j) {
			arr.push(0);
			var td = document.createElement('td');
			td.addEventListener('contextmenu', function(e) {	// contextmenu는 우측 마우스 클릭시 나타나는 메뉴
				if (stopFlag) return;
				
				e.preventDefault();
				var parentTr = e.target.parentNode;	// currentTarget은 이벤트 생성 위치, target은 이벤트 발생 위치
				var parentTbody = e.target.parentNode.parentNode;
				var col = Array.prototype.indexOf.call(parentTr.children, e.target);	// 배열 아닌것을 배열로 만들어서 indexOf사용.
				var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
				
				if (dataset[row][col] === 1) return;	// 이미 openedCell일 경우
				
				if (e.target.textContent === '' || e.target.textContent === 'X') {
					e.target.classList.add('flag');
					e.target.textContent = '!';
				} else if (e.target.textContent === '!') {
					e.target.classList.remove('flag');
					e.target.classList.add('question');
					e.target.textContent = '?';
				} else if (e.target.textContent === '?') {
					e.target.classList.remove('question');
					if (dataset[row][col] === 0) {
						e.target.textContent = '';
					} else if (dataset[row][col] === 'X') {
						e.target.textContent = 'X';
					}
				}
			});
			td.addEventListener('click', function(e) {
				if (stopFlag) return;
				
				var parentTr = e.target.parentNode;
				var parentTbody = e.target.parentNode.parentNode;
				var col = Array.prototype.indexOf.call(parentTr.children, e.target);
				var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
				
				if (dataset[row][col] === 1) return;
				if (e.target.textContent === '!' || e.target.textContent === '?') return;
				
				e.target.classList.add('opened');	// td에 opened가 추가. remove는 삭제
				
				if (dataset[row][col] === 'X') {
					endTime = new Date();
					stopFlag = true;
					e.target.textContent = '펑';
					document.querySelector('#result').textContent = '실패..';
					document.querySelector('#timer').textContent = (endTime - startTime) / 1000 + '초';
				} else {	// 빈칸 클릭 시 주변 지뢰 개수 파악
					dataset[row][col] = 1;	// open한 칸들 표시
					openedCell += 1;
					
					var nearMine = [dataset[row][col - 1], dataset[row][col + 1]];
					if (dataset[row - 1])
						nearMine = nearMine.concat([
							dataset[row - 1][col - 1],
							dataset[row - 1][col],
							dataset[row - 1][col + 1]]);
					if (dataset[row + 1])
						nearMine = nearMine.concat([
							dataset[row + 1][col - 1],
							dataset[row + 1][col],
							dataset[row + 1][col + 1]]);
					
					var nearMineCnt = nearMine.filter(function(v) {	// array.filter() => 조건을 만족하는 요소들을 모아 새로운 배열로 반환
						return v === 'X';
					}).length;
					e.target.textContent = nearMineCnt || '';	// nearMineCnt가 거짓(0, '', false, undefined, null, NaN)일 경우 ''대입
					
					if (nearMineCnt === 0) {	// 주변 지뢰 개수가 0개면 주변 칸 모두 공개
						var nearCell = [tbody.children[row].children[col - 1], tbody.children[row].children[col + 1]];
						if (tbody.children[row - 1])
							nearCell = nearCell.concat([
								tbody.children[row - 1].children[col - 1],
								tbody.children[row - 1].children[col],
								tbody.children[row - 1].children[col + 1]]);
						if (tbody.children[row + 1])
							nearCell = nearCell.concat([
								tbody.children[row + 1].children[col - 1],
								tbody.children[row + 1].children[col],
								tbody.children[row + 1].children[col + 1]]);
								
						nearCell.filter(function (v) {
							return !!v;	// null, undefined 같은 것들 제외
						}).forEach(function (nextCell) {
							var nextCellParentTr = nextCell.parentNode;
							var nextCellParentTbody = nextCell.parentNode.parentNode;
							var nextCellCol = Array.prototype.indexOf.call(nextCellParentTr.children, nextCell);
							var nextCellRow = Array.prototype.indexOf.call(nextCellParentTbody.children, nextCellParentTr);
							
							if (dataset[nextCellRow][nextCellCol] !== 1)
								nextCell.click();
						});
					}
					
					if (openedCell === hor * ver - mine) {
						endTime = new Date();
						stopFlag = true;
						document.querySelector('#result').textContent = '성공!!';
						document.querySelector('#timer').textContent = (endTime - startTime) / 1000 + '초';
					}
				}
			});
			tr.append(td);
		}
		tbody.append(tr);
	}
	
	// mine 위치 랜덤 생성
	var numList = Array(hor * ver).fill().map(function (val, index) {
		return index;
	});
	var shuffle = [];
	while (numList.length > hor * ver - mine)
		shuffle.push(numList.splice(Math.floor(Math.random() * numList.length), 1)[0]);
	
	document.querySelector('#timer').style.width = 25 * hor + 'px';
	document.querySelector('#result').style.width = 25 * hor + 'px';
	
	// mine 심기
	for (var i = 0; i < shuffle.length; ++i) {
		var row = Math.floor(shuffle[i] / hor);
		var col = shuffle[i] % hor;
		//tbody.children[row].children[col].textContent = 'X';
		dataset[row][col] = 'X';
	}
});