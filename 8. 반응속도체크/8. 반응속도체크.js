var screen = document.querySelector('#screen');
var startTime;
var endTime;
var timeOut;
var record = [];
var gameCnt = 0;

screen.addEventListener('click', function() {
	if (screen.classList.contains('waiting')) {
		screen.classList.remove('waiting');
		screen.classList.add('ready');
		screen.textContent = '초록색이 되면 클릭하세요';
		
		timeOut = setTimeout(function() {
			startTime = new Date();
			screen.click();
		}, Math.floor(Math.random() * 1000) + 2000);
	} else if (screen.classList.contains('ready')) {
		if (!startTime) {	// 초록색 되기 전 클릭
			clearTimeout(timeOut);
			screen.classList.remove('ready');
			screen.classList.add('waiting');
			screen.textContent = '초록색이 되기 전에 누르셨네요';
		} else {
			screen.classList.remove('ready');
			screen.classList.add('now');
			screen.textContent = '클릭하세요';
		}
	} else if (screen.classList.contains('now')) {
		endTime = new Date();
		var reactionRate = (endTime - startTime) / 1000;
		record.push(reactionRate);
		startTime = null;
		endTime = null;
		++gameCnt;
		
		screen.classList.remove('now');
		screen.classList.add('waiting');
		
		if (gameCnt === 5) {
			screen.innerHTML = '5회 반응속도: ' + reactionRate + 'ms<br/><br/>' +
				'5회 평균 반응속도: ' + (record[0] + record[1] + record[2] + record[3] + record[4]) / 5 + 'ms<br/>' +
				'클릭해서 재시작하세요';	// <br/> 태그를 넣기 위해 innerHTML 사용
			record = [];
			gameCnt = 0;
		} else {
			screen.innerHTML = gameCnt + '회 반응속도: ' + reactionRate + 'ms<br/>' + '클릭해서 시작하세요';
		}
	}
});