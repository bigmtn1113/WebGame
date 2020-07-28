var rivalHero = document.querySelector('#rival-hero');
var rivalDeck = document.querySelector('#rival-deck');
var myHero = document.querySelector('#my-hero');
var myDeck = document.querySelector('#my-deck');

var rivalDeckData = [];
var myDeckData = [];
var rivalHeroData;
var myHeroData;

function Card(isHero) {
	if (isHero) {
		this.att = Math.ceil(Math.random() * 2);
		this.hp = Math.ceil(Math.random() * 5) + 25;
	} else {
		this.att = Math.ceil(Math.random() * 5);
		this.hp = Math.ceil(Math.random() * 5);
		this.cost = Math.floor((this.att + this.hp) / 2);
	}
}
function cardFactory(isHero) { return new Card(isHero); }

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
	
	dom.append(card);
}

function createRivalDeck(cnt) {
	for (var i = 0; i < cnt; ++i)
		rivalDeckData.push(cardFactory());
	
	rivalDeckData.forEach(function(data) { connectDataAndDom(data, rivalDeck); });
}
function createMyDeck(cnt) {
	for (var i = 0; i < cnt; ++i)
		myDeckData.push(cardFactory());

	myDeckData.forEach(function(data) { connectDataAndDom(data, myDeck); });
}
function createRivalHero() {
	rivalHeroData = cardFactory(true);
	connectDataAndDom(rivalHeroData, rivalHero, true);
}
function createMyHero() {
	myHeroData = cardFactory(true);
	connectDataAndDom(myHeroData, myHero, true);
}

function init() {
	createRivalDeck(5);
	createMyDeck(5);
	createRivalHero();
	createMyHero();
}

init();