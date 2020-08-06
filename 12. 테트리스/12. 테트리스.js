var table = document.querySelector('#table');
var tableData = [];

function drawTable() {
	var fragment = document.createDocumentFragment();	// 바로 화면에 그리는 것보다 fragment를 만들어서 붙이는게 더 빠름.
	
	for (var i = 0; i < 20; ++i) {
		var tr = document.createElement('tr');
		tableData.push([]);
		
		for (var j = 0; j < 10; ++j) {
			var td = document.createElement('td');
			tableData[i].push(0);
			
			tr.append(td);
		}
		fragment.append(tr);
	}
	table.append(fragment);
}

drawTable();

window.addEventListener('keydown', function(e) {	// 누르고 있어도 되는 경우
	switch(e.code) {
		case 'ArrowDown':
			break;
		case 'ArrowLeft':
			break;
		case 'ArrowRight':
			break;
		default:
			break;
	}
});

window.addEventListener('keyup', function(e) {
	switch(e.code) {
		case 'Space':
			break;
		case 'ArrowUp':
			break;
		default:
			break;
	}
});