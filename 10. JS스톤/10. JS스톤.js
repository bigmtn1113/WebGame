var rival = {
	deck: document.querySelector('#rival-deck'),
	hero: document.querySelector('#rival-hero'),
	field: document.querySelector('#rival-field'),
	cost: document.querySelector('#rival-cost'),
	deckData: [],
	heroData: [],
	fieldData: [],
	costData: 10
};

var my = {
	deck: document.querySelector('#my-deck'),
	hero: document.querySelector('#my-hero'),
	field: document.querySelector('#my-field'),
	cost: document.querySelector('#my-cost'),
	deckData: [],
	heroData: [],
	fieldData: [],
	costData: 10
};

var turnBtn = document.querySelector('#turn-btn');
var isMyTurn = true;

function Card(isHero, isMyCard) {
	if (isHero) {
		this.att = Math.ceil(Math.random() * 2);
		this.hp = Math.ceil(Math.random() * 5) + 25;
	} else {
		this.att = Math.ceil(Math.random() * 5);
		this.hp = Math.ceil(Math.random() * 5);
		this.cost = Math.floor((this.att + this.hp) / 2);
	}
	
	if (isMyCard)
		this.mine = true;
}
function cardFactory(isHero, isMyCard) { return new Card(isHero, isMyCard); }

function deckToField(card, data, isMyTurn) {
	var rivalOrMy = isMyTurn ? my : rival;
	if (rivalOrMy.costData - data.cost < 0) return false;
			
	rivalOrMy.field.append(card);
	rivalOrMy.fieldData.push(data);
	rivalOrMy.deckData.splice(rivalOrMy.deckData.indexOf(data), 1);
	rivalOrMy.costData -= data.cost;
	rivalOrMy.cost.textContent = rivalOrMy.costData;
	return true;
}

function connectDataAndDom(data, dom, isHero) {
	var card = document.querySelector('.card-hidden .card').cloneNode(true);
	card.querySelector('.card-cost').textContent = data.cost;
	card.querySelector('.card-att').textContent = data.att;
	card.querySelector('.card-hp').textContent = data.hp;
	
	if (isHero) {
		card.children[0].classList.remove('card-cost');
		card.children[0].classList.add('card-name');
		card.querySelector('.card-name').textContent = '영웅';
	}
	
	card.addEventListener('click', function() {		
		if (isMyTurn) {
			if (!data.mine || data.field) return;
			if (!deckToField(card, data, isMyTurn)) return;
			
			createMyDeck(1);
		} else {
			if (data.mine || data.field) return;
			if (!deckToField(card, data, isMyTurn)) return;
			
			createRivalDeck(1);
		}
		
		data.field = true;
	});
	
	dom.append(card);
}

function createRivalDeck(cnt) {
	for (var i = 0; i < cnt; ++i)
		rival.deckData.push(cardFactory(false, false));
	
	rival.deck.innerHTML = '';
	rival.deckData.forEach(function(data) { connectDataAndDom(data, rival.deck); });
}
function createMyDeck(cnt) {
	for (var i = 0; i < cnt; ++i)
		my.deckData.push(cardFactory(false, true));

	my.deck.innerHTML = '';
	my.deckData.forEach(function(data) { connectDataAndDom(data, my.deck); });
}
function createRivalHero() {
	rival.heroData = cardFactory(true, false);
	connectDataAndDom(rival.heroData, rival.hero, true);
}
function createMyHero() {
	my.heroData = cardFactory(true, true);
	connectDataAndDom(my.heroData, my.hero, true);
}

turnBtn.addEventListener('click', function() {
	isMyTurn = !isMyTurn;
	
	if (isMyTurn) {
		my.costData = 10;
		my.cost.textContent = '10';
	}
	else {
		rival.costData = 10;
		rival.cost.textContent = '10';
	}
	
	rival.deck.classList.toggle('turn');
	my.deck.classList.toggle('turn');
});

function init() {
	createRivalDeck(5);
	createMyDeck(5);
	createRivalHero();
	createMyHero();
}

init();