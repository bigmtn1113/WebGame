var rival = {
	deck: document.querySelector('#rival-deck'),
	hero: document.querySelector('#rival-hero'),
	field: document.querySelector('#rival-field'),
	cost: document.querySelector('#rival-cost'),
	selectedCard: null,
	deckData: [],
	heroData: [],
	fieldData: [],
	costData: 10,
	selectedCardData: null
};

var my = {
	deck: document.querySelector('#my-deck'),
	hero: document.querySelector('#my-hero'),
	field: document.querySelector('#my-field'),
	cost: document.querySelector('#my-cost'),
	selectedCard: null,
	deckData: [],
	heroData: [],
	fieldData: [],
	costData: 10,
	selectedCardData: null
};

var turnBtn = document.querySelector('#turn-btn');
var isMyTurn = true;

function Card(isHero, isMyCard) {
	if (isHero) {
		this.att = Math.ceil(Math.random() * 2);
		this.hp = Math.ceil(Math.random() * 5) + 25;
		this.hero = true;
		this.field = true;
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
	if (data.hero) return false;
	
	var rivalOrMy = isMyTurn ? my : rival;
	if (rivalOrMy.costData - data.cost < 0) return false;
			
	rivalOrMy.field.append(card);
	rivalOrMy.fieldData.push(data);
	rivalOrMy.deckData.splice(rivalOrMy.deckData.indexOf(data), 1);
	rivalOrMy.costData -= data.cost;
	rivalOrMy.cost.textContent = rivalOrMy.costData;
	data.field = true;
	return true;
}

function cardBattle(card, data) {
	if (card.classList.contains('card-turnover')) return;
	
	var currentTurn = isMyTurn ? my : rival;
	var nextTurn = isMyTurn ? rival : my;
	var rivalCard = isMyTurn ? !data.mine : data.mine;
	
	if (rivalCard && data.field && currentTurn.selectedCard) {
		data.hp -= currentTurn.selectedCardData.att;
		if (data.hp <= 0) {
			var index = nextTurn.fieldData.indexOf(data);
			if (index > -1 )
				nextTurn.fieldData.splice(index, 1);
			else {
				(currentTurn === my) ? alert('WIN!') : alert('LOSE..');
				init();
			}
		}
		
		isMyTurn ? repaint(false) : repaint(true);
		currentTurn.selectedCard.classList.remove('card-selected');
		currentTurn.selectedCard.classList.add('card-turnover');
		currentTurn.selectedCard = null;
		currentTurn.selectedCardData = null;
		return;
	} else if (rivalCard)
		return;
	if (data.field) {
		var currentField = (currentTurn === my) ? '#my-field' : '#rival-field';
		var currentHero = (currentTurn === my) ? '#my-hero' : '#rival-hero';
		
		card.parentNode.parentNode.querySelector(currentField).querySelectorAll('.card').forEach(function(c) {
			c.classList.remove('card-selected');
		});
		card.parentNode.parentNode.querySelector(currentHero).querySelector('.card').classList.remove('card-selected');
		
		card.classList.add('card-selected');
		currentTurn.selectedCard = card;
		currentTurn.selectedCardData = data;
	} else {
		if (!deckToField(card, data, isMyTurn)) return;
	
		isMyTurn ? createMyDeck(1) : createRivalDeck(1);
	}
}

function connectDataAndDom(data, dom, isHero) {
	var card = document.querySelector('.card-hidden .card').cloneNode(true);
	card.querySelector('.card-cost').textContent = data.cost;
	card.querySelector('.card-att').textContent = data.att;
	card.querySelector('.card-hp').textContent = data.hp;
	
	if (isHero) {
		card.children[0].classList.remove('card-cost');
		card.children[0].classList.add('card-name');
		card.querySelector('.card-name').textContent = 'Hero';
	}
	
	card.addEventListener('click', function() { cardBattle(card, data); });
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

function repaint(isMyView) {
	var rivalOrMy = isMyView ? my : rival;
	rivalOrMy.hero.innerHTML = '';
	rivalOrMy.deck.innerHTML = '';
	rivalOrMy.field.innerHTML = '';
	connectDataAndDom(rivalOrMy.heroData, rivalOrMy.hero, true);
	rivalOrMy.deckData.forEach(function(data) { connectDataAndDom(data, rivalOrMy.deck); });
	rivalOrMy.fieldData.forEach(function(data) { connectDataAndDom(data, rivalOrMy.field); });
	rivalOrMy.costData = 10;
	rivalOrMy.cost.textContent = '10';
}

turnBtn.addEventListener('click', function() {
	repaint(isMyTurn);
	rival.deck.classList.toggle('turn');
	my.deck.classList.toggle('turn');
	
	isMyTurn = !isMyTurn;
});

function initData() {
	my.deckData = [];
	my.heroData = [];
	my.fieldData = [];
	rival.deckData = [];
	rival.heroData = [];
	rival.fieldData = [];
}

function init() {
	initData();
	createRivalDeck(5);
	createMyDeck(5);
	createRivalHero();
	createMyHero();
	repaint(true);
	repaint(false);
}

init();