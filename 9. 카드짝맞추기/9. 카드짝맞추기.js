var width = 4;
var height = 3;
var colorList = ['red', 'red', 'orange', 'orange', 'violet', 'violet', 'green', 'green', 'navy', 'navy', 'indigo', 'indigo'];
var cardBackColorList = [];
var cardBackColor;
var clickedCard = [];
var answerCard = [];
var startTime;

function suffle() {
	cardBackColorList = colorList.slice();	// 참조관계 끊기
	cardBackColor = [];
	
	while(cardBackColorList.length)
		cardBackColor.push(cardBackColorList.splice(Math.floor(Math.random() * cardBackColorList.length), 1));
}

function setCard(width, height) {
	var clickFlag = false;
	for (var i = 0; i < width * height; ++i) {
		var card = document.createElement('div');
		card.className = 'card';
		var cardInner = document.createElement('div');
		cardInner.className = 'card-inner';
		var cardFront = document.createElement('div');
		cardFront.className = 'card-front';
		var cardBack = document.createElement('div');
		cardBack.className = 'card-back';
		cardBack.style.backgroundColor = cardBackColor[i];
		
		cardInner.append(cardFront);
		cardInner.append(cardBack);
		card.append(cardInner);
		(function(c) {
			card.addEventListener('click', function() {
				if (clickFlag && !answerCard.includes(c)) {
					c.classList.toggle('flipped');
					clickedCard.push(c);
					
					if (clickedCard.length === 2) {	// 카드 두개 클릭했을 경우
						if ((clickedCard[0] !== clickedCard[1]) &&
							(clickedCard[0].querySelector('.card-back').style.backgroundColor ===
							clickedCard[1].querySelector('.card-back').style.backgroundColor)) {	// 서로 다른 두 카드의 색이 같을 경우
							answerCard.push(clickedCard[0]);
							answerCard.push(clickedCard[1]);
							clickedCard = [];
							
							if (answerCard.length === width * height) {	// 게임을 클리어했을 경우
								var endTime = new Date();
								alert((endTime - startTime)/1000 + '초 걸렸습니다');
								document.querySelector('#wrapper').innerHTML = '';
								answerCard = [];
								startTime = null;
								suffle();
								setCard(width, height);
							}
						} else {	// 서로 다른 두 카드의 색이 다른 경우
							clickFlag = false;
							setTimeout(function() {
								clickedCard[0].classList.remove('flipped');
								clickedCard[1].classList.remove('flipped');
								clickedCard = [];
								clickFlag = true;
							}, 1000);
						}
					}
				}
			});
		})(card);
		document.querySelector('#wrapper').append(card);
		document.querySelector('#wrapper').style.width = 75 * width + 20 * width + 'px';
	}
	
	document.querySelectorAll('.card').forEach(function(card, index) {
		setTimeout(function() {
			card.classList.add('flipped');
		}, 1000 + 100 * index);
	});
	
	document.querySelectorAll('.card').forEach(function(card, index) {
		setTimeout(function() {
			card.classList.remove('flipped');
			clickFlag = true;
			startTime = new Date();
		}, 5200);
	});
}

suffle();
setCard(width, height);