(function(){
	var points = 11;
	var diff = 1; //premier verbe à chercher sera de niveau facile
	var current;
	var socket = io.connect('http://localhost:3001');

	var gameOver = function(state, element){
		if (state == 'w'){
			element.innerHTML = "You winex"; french.style.display = btn.style.display = "none";
		}
		if( state == 'l'){
			element.innerHTML = "Loserex"; french.style.display = btn.style.display = "none";
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
			gameOver('l', h1p); return; 
		}
		if(points == 20) {
			gameOver('w', h1p); return;
		}
		h1p.innerHTML = "Points: " + points;
	}

	btn.onclick= function() {
		upPoints();
		socket.emit('verbRequested', {difficulty: diff})
		socket.on('gotVerb', function (data) {
			console.log(data);
		    french.innerHTML = "Verbe en Français: " + data.verb;
		    var diff = document.getElementById("diff"); //why is this line mandatory? I don't understand! shouldn't javaScript find the element by its id without this like it is with french for instance?
		    diff.innerHTML = "Niveau de difficulté du verbe: " + data.difficulty;
		    current = data.translation;
		});
	};

})();
