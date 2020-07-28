var rivalHero = document.querySelector('#rival-hero');
var rivalDeck = document.querySelector('#rival-deck');
var myHero = document.querySelector('#my-hero');
var myDeck = document.querySelector('#my-deck');

var rivalDeckData = [];
var myDeckData = [];
var rivalHeroData;
var myHeroData;

function Card(hero) {
	if (hero) {
		this.att = Math.ceil(Math.random() * 2);
		this.hp = Math.ceil(Math.random() * 5) + 25;
	} else {
		this.att = Math.ceil(Math.random() * 5);
		this.hp = Math.ceil(Math.random() * 5);
		this.cost = Math.floor((this.att + this.hp) / 2);
	}
}
function cardFactory(hero) {
	return new Card(hero);
}

function createRivalDeck(cnt) {
	for (var i = 0; i < cnt; ++i) {
		rivalDeckData.push(cardFactory());
	}
	rivalDeckData.forEach(function(data) {
		var card = document.querySelector('.card-hidden .card').cloneNode(true);
		card.querySelector('.card-cost').textContent = data.cost;
		card.querySelector('.card-att').textContent = data.att;
		card.querySelector('.card-hp').textContent = data.hp;
		rivalDeck.append(card);
	});
}
function createMyDeck(cnt) {
	for (var i = 0; i < cnt; ++i) {
		myDeckData.push(cardFactory());
	}
	myDeckData.forEach(function(data) {
		var card = document.querySelector('.card-hidden .card').cloneNode(true);
		card.querySelector('.card-cost').textContent = data.cost;
		card.querySelector('.card-att').textContent = data.att;
		card.querySelector('.card-hp').textContent = data.hp;
		myDeck.append(card);
	});
}
function createRivalHero() {
	rivalHeroData = cardFactory(true);
	
	var card = document.querySelector('.card-hidden .card').cloneNode(true);
	card.querySelector('.card-cost').textContent = '';
	card.querySelector('.card-att').textContent = rivalHeroData.att;
	card.querySelector('.card-hp').textContent = rivalHeroData.hp;
	rivalHero.append(card);
}
function createMyHero() {
	myHeroData = cardFactory(true);
	
	var card = document.querySelector('.card-hidden .card').cloneNode(true);
	card.querySelector('.card-cost').textContent = '';
	card.querySelector('.card-att').textContent = myHeroData.att;
	card.querySelector('.card-hp').textContent = myHeroData.hp;
	myHero.append(card);
}

function init() {
	createRivalDeck(5);
	createMyDeck(5);
	createRivalHero();
	createMyHero();
}

init();