var 숫자1 = Math.ceil(Math.random() * 9);
var 숫자2 = Math.ceil(Math.random() * 9);
var 답 = 숫자1 * 숫자2;

var 바디 = document.body;

var 문제 = document.createElement('div');
문제.textContent = 숫자1 + ' 곱하기 ' + 숫자2 + '는?';
document.body.append(문제);

var 폼 = document.createElement('form');
document.body.append(폼);

var 입력 = document.createElement('input');
폼.append(입력);

var 버튼 = document.createElement('button');
버튼.textContent = '입력';
폼.append(버튼);

var 결과 = document.createElement('div');
document.body.append(결과);

폼.addEventListener('submit', function callback(event) {
	event.preventDefault();
	
	if (답 === Number(입력.value)) {
		결과.textContent = '딩동댕';
		
		숫자1 = Math.ceil(Math.random() * 9);
		숫자2 = Math.ceil(Math.random() * 9);
		답 = 숫자1 * 숫자2;
		문제.textContent = 숫자1 + ' 곱하기 ' + 숫자2 + '는?';
		
		입력.value = '';
		입력.focus();
	} else {
		결과.textContent = '땡';
		입력.value = '';
		입력.focus();
	}
});
