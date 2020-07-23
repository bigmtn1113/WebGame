var width = 4;
var height = 3;

function setCard(width, height) {
	for (var i = 0; i < width * height; ++i) {
		card = document.createElement('div');
		card.className = 'card';
		cardInner = document.createElement('div');
		cardInner.className = 'card-inner';
		cardFront = document.createElement('div');
		cardFront.className = 'card-front';
		cardBack = document.createElement('div');
		cardBack.className = 'card-back';
		
		cardInner.append(cardFront);
		cardInner.append(cardBack);
		card.append(cardInner);
		(function(c) {
			card.addEventListener('click', function() {
				c.classList.toggle('flipped');
			});
		})(card);
		document.body.append(card);
	}
}

setCard(width, height);