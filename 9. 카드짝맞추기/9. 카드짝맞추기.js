var width = 4;
var height = 3;
var cardBackColorList = ['red', 'red', 'orange', 'orange', 'violet', 'violet', 'green', 'green', 'navy', 'navy', 'indigo', 'indigo'];
var cardBackColor = [];
var clickedCard = [];
var answerCard = [];

while (cardBackColorList.length)
	cardBackColor.push(cardBackColorList.splice(Math.floor(Math.random() * cardBackColorList.length), 1));

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
					
					if (clickedCard.length === 2) {
						if (clickedCard[0].querySelector('.card-back').style.backgroundColor ===
							clickedCard[1].querySelector('.card-back').style.backgroundColor) {
							answerCard.push(clickedCard[0]);
							answerCard.push(clickedCard[1]);
							clickedCard = [];
						} else {
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
		document.body.append(card);
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
		}, 5200);
	});
}

setCard(width, height);