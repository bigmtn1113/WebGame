var 바디 = document.body;

var 단어 = document.createElement('div');
단어.textContent = '김밥';
document.body.append(단어);

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
	event.preventDefault();	// form의 submit 동작이 일어날때 발생하는 새로고침 방지
	
	if (단어.textContent[단어.textContent.length - 1] === 입력.value[0]) {
		결과.textContent = '딩동댕';
		단어.textContent = 입력.value;
		입력.value = '';
		입력.focus();
	} else {
		결과.textContent = '땡';
		입력.value = '';
		입력.focus();
	}
});