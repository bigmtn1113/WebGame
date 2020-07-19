// Array(45) => 길이가 45인 빈 배열 생성.
// .fill() => 배열을 undefined로 채움.
var numList = Array(45).fill().map(function(val, index) {
	return index + 1;	// index자리에 있는 val에다가 index + 1을 대입.
});
var shuffle = [];

while (numList.length > 0)
	shuffle.push(numList.splice(Math.floor(Math.random() * numList.length), 1)[0]);

var winningNum = shuffle.splice(0, 6).sort(function(a, b) {
	return a - b;	// 오름차순. b - a는 내림차순. return값이 양수면 a와 b의 자리를 바꿈.
});

var bonusNum = shuffle[shuffle.length - 1];

console.log(winningNum, bonusNum);

var winningNumView = document.querySelector('#winningNumView');	// document.getElementById('winningNumView')

function drawBall(num, view) {
	var ball = document.createElement('div');
	ball.textContent = num;
	ball.style.display = 'inline-block';	// div 블록을 span같은 인라인으로 변환. 
	ball.style.border = '1px solid black';
	ball.style.borderRadius = '10px';
	ball.style.width = '20px';
	ball.style.height = '20px';
	ball.style.textAlign = 'center';
	ball.style.marginRight = '10px';
	ball.style.fontWeight = 'bold';
	ball.style.fontSize = '12px';
	ball.className = 'ball-' + num;
	
	var background;
	if (num <= 10) background = 'red';
	else if (num <= 20) background = 'orange';
	else if (num <= 30) background = 'yellow';
	else if (num <= 40) background = 'blue';
	else background = 'green';
	
	ball.style.background = background;
	view.append(ball);
}

setTimeout(function callback() {	// 비동기 콜백 함수. 1초 뒤 실행
	drawBall(winningNum[0], winningNumView);
}, 1000);
setTimeout(function callback() {
	drawBall(winningNum[1], winningNumView);
}, 2000);
setTimeout(function callback() {
	drawBall(winningNum[2], winningNumView);
}, 3000);
setTimeout(function callback() {
	drawBall(winningNum[3], winningNumView);
}, 4000);
setTimeout(function callback() {
	drawBall(winningNum[4], winningNumView);
}, 5000);
setTimeout(function callback() {
	drawBall(winningNum[5], winningNumView);
}, 6000);

var bonusNumView = document.querySelector('.bonusNumView');	// document.getElementsByClassName('bonusNumView')[0]. class는 여러개가 있을 수 있으므로 인덱스를 통해 접근.
setTimeout(function callback() {
	drawBall(bonusNum, bonusNumView);
}, 7000);