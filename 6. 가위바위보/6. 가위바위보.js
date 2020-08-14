
var result = document.createElement('div');

var imgPosition = 0;
var rsp = {
	rock: '0',
	scissor: '-142px',
	paper: '-284px'
}
var score = {
	rock: 1,
	scissor: 2,
	paper: 3
}

// Object.entries(객체) => 객체를 배열로 바꿈.
// .find => 반복문처럼 돌면서 조건에 해당하는 값(n)을 리턴. 2차원 배열에서 주로 사용.
// .findIndex => 조건의 해당하는 값의 인덱스를 리턴. indexOf는 1차원 배열에서 사용.
function pcChoice(imgPosition) {
	return Object.entries(rsp).find(function (n) {
		return n[1] === imgPosition;
	})[0];
}

var interval;
function makeInterval() {
	if (interval) clearInterval(interval);
	
	interval = setInterval(function () {	// setTimeout은 한번만 실행. setInterval은 반복 실행.
		if (imgPosition === rsp.rock) imgPosition = rsp.scissor;
		else if (imgPosition === rsp.scissor) imgPosition = rsp.paper;
		else imgPosition = rsp.rock;
		document.querySelector('#computer').style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imgPosition + ' 0';
	}, 100);
}

makeInterval();

document.querySelectorAll('.btn').forEach(function (btn) {	// btn이 여러개이므로 querySelectorAll().forEach()사용.
	btn.addEventListener('click', function () {
		clearInterval(interval);	// 실행 중인 interval을 멈춤.
		setTimeout(function () {
			makeInterval();
		}, 1000);
		
		var myChoice = this.textContent;	// button 클릭시 해당 버튼의 textContent.
		var scoreDifference = score[myChoice] - score[pcChoice(imgPosition)];
		
		if ([-1, 2].includes(scoreDifference)) result.textContent = 'win!!!';	// 배열.includes(a) => a에 해당하는 값이 배열에 있는지 검사
		else if (scoreDifference === 0) result.textContent = 'draw';
		else result.textContent = 'lose...';
		
		document.body.append(result);
	});
});