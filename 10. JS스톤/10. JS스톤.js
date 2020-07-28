var rivalDeck = document.querySelector('#rival-deck');
var myDeck = document.querySelector('#my-deck');
var rivalHero = document.querySelector('#rival-hero');
var myHero = document.querySelector('#my-hero');
var rivalField = document.querySelector('#rival-field');
var myField = document.querySelector('#my-field');
var rivalCost = document.querySelector('#rival-cost');
var myCost = document.querySelector('#my-cost');

var rivalDeckData = [];
var myDeckData = [];
var rivalHeroData;
var myHeroData;
var rivalFieldData = [];
var myFieldData = [];
var rivalCostData = 10;
var myCostData = 10;
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
			if (!data.mine) return;
			if (myCostData - data.cost < 0) return;
			
			myField.append(card);
			myFieldData.push(data);
			myDeckData.splice(myDeckData.indexOf(data), 1);
			myCostData -= data.cost;
			myCost.textContent = myCostData;
			
			isMyTurn = false;
		} else {
			if (data.mine) return;
			if (rivalCostData - data.cost < 0) return;
			
			rivalField.append(card);
			rivalFieldData.push(data);
			rivalDeckData.splice(rivalDeckData.indexOf(data), 1);
			rivalCostData -= data.cost;
			rivalCost.textContent = rivalCostData;
			
			isMyTurn = true;
		}
	});
	
	dom.append(card);
}

function createRivalDeck(cnt) {
	for (var i = 0; i < cnt; ++i)
		rivalDeckData.push(cardFactory(false, false));
	
	rivalDeckData.forEach(function(data) { connectDataAndDom(data, rivalDeck); });
}
function createMyDeck(cnt) {
	for (var i = 0; i < cnt; ++i)
		myDeckData.push(cardFactory(false, true));

	myDeckData.forEach(function(data) { connectDataAndDom(data, myDeck); });
}
function createRivalHero() {
	rivalHeroData = cardFactory(true, false);
	connectDataAndDom(rivalHeroData, rivalHero, true);
}
function createMyHero() {
	myHeroData = cardFactory(true, true);
	connectDataAndDom(myHeroData, myHero, true);
}

function init() {
	createRivalDeck(5);
	createMyDeck(5);
	createRivalHero();
	createMyHero();
}

init();