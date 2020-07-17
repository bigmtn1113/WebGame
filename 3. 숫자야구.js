var 바디 =  document.body

var 결과 = document.createElement('h3');
document.body.append(결과);

var 폼 = document.createElement('form');
document.body.append(폼);

var 입력 = document.createElement('input');
입력.maxLength = 4;
폼.append(입력);

var 버튼 = document.createElement('button');
버튼.textContent = '입력';
폼.append(버튼);

var 틀린횟수표시 = document.createElement('div');
document.body.append(틀린횟수표시);

var 결과현황영역 = document.createElement('div');
document.body.append(결과현황영역);

var 결과현황 = [];
for (var i = 0; i < 5; ++i) {
	결과현황[i] = document.createElement('div');
	결과현황영역.append(결과현황[i]);
}

var 숫자후보;
var 숫자배열;
var 틀린횟수;

function new_game() {
	숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	숫자배열 = [];

	for (var i = 0; i < 4; ++i)
		숫자배열.push(숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0]);
	// 배열.pop() = 맨 뒤 요소 빼기
	// 배열.push(값) = 맨 뒤에 값 넣기
	// 배열.shift() = 맨 앞 요소 빼기
	// 배열.unshift(값) = 맨 앞에 값 넣기

	틀린횟수 = 0;
	for (var i = 0; i < 5; ++i) {
		결과현황[i].textContent = '';
	}
}

new_game();

폼.addEventListener('submit', function(event) {
	event.preventDefault();
	
	var 답 = 입력.value;
	if (답 === 숫자배열.join('')) {	// 배열을 문자열로
		결과.textContent = 답 + ' 홈런!!!';
		
		new_game();
	} else {
		++틀린횟수;
		
		if (틀린횟수 > 5) {
			결과.textContent = '실패! 답은 ' + 숫자배열.join('');
			
			new_game();
		} else {
			답 = 답.split('');	// 문자열을 문자열 배열로
			var 스트라이크 = 0;
			var 볼 = 0;
			
			for (var i = 0; i < 4; ++i) {
				if (Number(답[i]) === 숫자배열[i])
					++스트라이크;
				else if (숫자배열.indexOf(Number(답[i])) > -1)
					++볼;
			}
			
			if (스트라이크 === 0 && 볼 === 0)
				결과.textContent = 'out!';
			else
				결과.textContent = 스트라이크 + 's ' + 볼 + 'b' ;
			
			결과현황[틀린횟수 - 1].textContent = 답.join('') + ' ' + 결과.textContent;
		}
	}
	입력.value = '';
	입력.focus();
	틀린횟수표시.textContent = '틀린횟수 = ' + 틀린횟수;
});