(function(){
	var points = 11;
	var diff = 1; //premier verbe à chercher sera de niveau facile
	var current;
	var socket = io.connect('http://localhost:3001');

	var gameOver = function(state, element){
		if (state == 'w'){
			element.innerHTML = "Gagnant"; element.style.fontSize = "80px"; element.style.color ="green";
		}
		if( state == 'l'){
			element.innerHTML = "Perdant"; element.style.fontSize = "80px"; element.style.color ="red";
		}
		else {
			//console.log('problème dans la fonction gameOver: argument incorrect')
		}
	}

	var upPoints = function(){
		var input = document.getElementById('input');
		var testValue = input.value;
		var h1p = document.getElementById('points');
		if (current && testValue == current){
			points++; if (diff !=2) diff++;
		} else {
			points--; if (diff != 0) diff--;
		}
		if(points == 0) {
			gameOver('l', gameSection); return; 
		}
		if(points == 20) {
			gameOver('w', gameSection); return;
		}
		h1p.innerHTML = " " + points;
	}

	btn.onclick= function() {
		upPoints();
		socket.emit('verbRequested', {difficulty: diff})
		socket.on('gotVerb', function (data) {
			console.log(data);
		    french.innerHTML = data.verb;
		    var diff = document.getElementById("diff"); //why is this line mandatory? I don't understand! shouldn't javaScript find the element by its id without this like it is with french for instance?
		    diff.innerHTML = " " + data.difficulty;
		    current = data.translation;
		    firstLetter.innerHTML = data.translation[0];
			howMany.innerHTML = data.translation.length;
		});

		input.style.display = "inline";
		info.style.display = "block"
		btn.innerHTML = "valider l'entrée";
		btn.classList.remove('btn-lg'); //what if it has already been removed
		btn.style.margin = "auto";
		hints.style.display = "block";

	};

})();
