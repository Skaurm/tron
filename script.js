for(i=0;i<72;i++) {
	$("#gridTemp").html($("#gridTemp").html() + "<div class='grid'></div>");
}

var gameStart = 0;
var playSpeed = 5; //milliseconds per update
var pixelMovement = 1; //pixels at a time moved (1 square is 10 pixels)
var trackDeaths = 0;
var player1Direction = 2;
var player2Direction = 4;
var player1DirectionNew = 0; //Set to 1 if there is a change in direction
var player2DirectionNew = 0;
var player1LocationDefault = [0, 0]; //Location is from 0-1190, and 0-590
var player2LocationDefault = [1190, 590];
var player1LocationOld = NaN;
var player2LocationOld = NaN;
var trackSquares = [];

//Test for all key presses
document.addEventListener("keydown", function(event) {
    var keycode = event.which;
    var player1DirectionTemp = player1Direction;
    var player2DirectionTemp = player2Direction;
    //start game
    if((keycode == '13' || keycode == '32') && (gameStart == 0)){
     	alert("Insturctions: \n- Player 1 is Blue and Player 2 is Orange\n- Player 1 uses WASD to move\n- Player 2 uses the arrow keys to move\n- Last person to run into a trail or a wall wins!");
        gameStart = 1;
        player1Location = player1LocationDefault;
		player2Location = player2LocationDefault;
		updateLocations();
		makeTracks(1);
		makeTracks(2);
		roundLocation(1);
		roundLocation(2);
		$("#info").remove();
		$("#player1Head, #player2Head").css("opacity", "1");
    }

    if(keycode == '87' && player1Direction != 3 && player1Direction != 1) {
    	player1Direction = 1;
    	roundLocation(1);
    	makeTracks(1);
    	player1Location[1] = player1Location[1] - 5;
    }	
    if(keycode == '65' && player1Direction != 2 && player1Direction != 4) {
    	player1Direction = 4;
    	roundLocation(1);
    	makeTracks(1);
    	player1Location[0] = player1Location[0] - 5;
    }	
    if(keycode == '83' && player1Direction != 1 && player1Direction != 3) {
    	player1Direction = 3;
    	roundLocation(1);
    	makeTracks(1);
    	player1Location[1] = player1Location[1] + 5;
    }	
    if(keycode == '68' && player1Direction != 4 && player1Direction != 2) {
    	player1Direction = 2;
    	roundLocation(1);
    	makeTracks(1);
    	player1Location[0] = player1Location[0] + 5;
    }	

    if(keycode == '38' && player2Direction != 3 && player2Direction != 1) {
    	player2Direction = 1;
    	roundLocation(2);
    	makeTracks(2);
    	player2Location[1] = player2Location[1] - 5;
    }	
    if(keycode == '37' && player2Direction != 2 && player2Direction != 4) {
    	player2Direction = 4;
    	roundLocation(2);
    	makeTracks(2);
    	player2Location[0] = player2Location[0] - 5;
    }	
    if(keycode == '40' && player2Direction != 1 && player2Direction != 3) {
    	player2Direction = 3;
    	roundLocation(2);
    	makeTracks(2);
    	player2Location[1] = player2Location[1] + 5;
    }	
    if(keycode == '39' && player2Direction != 4 && player2Direction != 2) {
    	player2Direction = 2;
    	roundLocation(2);
    	makeTracks(2);
    	player2Location[0] = player2Location[0] + 5;
    }	

    if(player1DirectionTemp != player1Direction) {
    	player1DirectionNew = 1;
    }

    if(player2DirectionTemp != player2Direction) {
    	player2DirectionNew = 1;
    }
});

setInterval(function(){
	if(gameStart == 1) {
		player1LocationOld = player1Location; 
		player2LocationOld = player2Location;
		if(player1Direction == 1) {
			player1Location[1] = player1Location[1] - pixelMovement;
		}
		if(player1Direction == 2) {
			player1Location[0] = player1Location[0] + pixelMovement;
		}
		if(player1Direction == 3) {
			player1Location[1] = player1Location[1] + pixelMovement;
		}
		if(player1Direction == 4) {
			player1Location[0] = player1Location[0] - pixelMovement;
		}

		if(player2Direction == 1) {
			player2Location[1] = player2Location[1] - pixelMovement;
		}
		if(player2Direction == 2) {
			player2Location[0] = player2Location[0] + pixelMovement;
		}
		if(player2Direction == 3) {
			player2Location[1] = player2Location[1] + pixelMovement;
		}
		if(player2Direction == 4) {
			player2Location[0] = player2Location[0] - pixelMovement;
		}

		if(trackDeaths == 1) {
			testForDeaths();
		}

		//Make more tracks
		updateLocations();
		if(((player1Direction == 1 || player1Direction == 3) && player1Location[1] % 10 == 0) || ((player1Direction == 2 || player1Direction == 4) && player1Location[0] % 10 == 0)) {
			makeTracks(1);
		}
		if(((player2Direction == 1 || player2Direction == 3) && player2Location[1] % 10 == 0) || ((player2Direction == 2 || player2Direction == 4) && player2Location[0] % 10 == 0)) {
			makeTracks(2);
		}
		setTimeout(function(){
			trackDeaths = 1;
		}, 100)
	}
}, playSpeed);


function updateLocations() {
	if(gameStart == 1) {
		var tempSpeed = 1;
		$("#player1Head").css("left", player1Location[0]);
		$("#player1Head").css("top", player1Location[1]);
		$("#player2Head").css("left", player2Location[0]);
		$("#player2Head").css("top", player2Location[1]);
	}
}

function roundLocation(player) {
	if(player == 1) {
		player1Location[0] = Math.round(player1Location[0]/10) * 10;
		player1Location[1] = Math.round(player1Location[1]/10) * 10;
	}
	if(player == 2) {
		player2Location[0] = Math.round(player2Location[0]/10) * 10;
		player2Location[1] = Math.round(player2Location[1]/10) * 10;
	}
}

function makeTracks(player) {
	if(player == 1) {
		var originalLocation1 = [];
		originalLocation1[0] = player1Location[0];
		originalLocation1[1] = player1Location[1] - 10;
		$("#mainPlayArea").append("<div class='player1Track' style='top: " + originalLocation1[1] + "px; left: " + originalLocation1[0] + "px; '></div>");
		trackSquares[trackSquares.length] = [originalLocation1[0], (originalLocation1[1] + 10)];
	}
	if(player == 2) {
		var originalLocation2 = [];
		originalLocation2[0] = player2Location[0];
		originalLocation2[1] = player2Location[1] - 10;
		$("#mainPlayArea").append("<div class='player2Track' style='top: " + originalLocation2[1] + "px; left: " + originalLocation2[0] + "px; '></div>");
		trackSquares[trackSquares.length] = [originalLocation2[0], (originalLocation2[1] + 10)];
	}
}

function testForDeaths() {
	if(((player1Location[0] > 1190 || player1Location[0] < 0 || player1Location[1] > 590 || player1Location[1] < 0) && !(player2Location[0] > 1190 || player2Location[0] < 0 || player2Location[1] > 590 || player2Location[1] < 0)) && gameStart == 1) {
		playerDied(1);
	}else if((player2Location[0] > 1190 || player2Location[0] < 0 || player2Location[1] > 590 || player2Location[1] < 0) && !(player1Location[0] > 1190 || player1Location[0] < 0 || player1Location[1] > 590 || player1Location[1] < 0)) {
		playerDied(2);
	}else if((player2Location[0] > 1190 || player2Location[0] < 0 || player2Location[1] > 590 || player2Location[1] < 0) && (player1Location[0] > 1190 || player1Location[0] < 0 || player1Location[1] > 590 || player1Location[1] < 0)) {
		playerDied(3);
		gameStart = 2;
	}

	for(i=0;i<trackSquares.length;i++) {
		if((((player2Location[0] == player1Location[0]) && (player2Location[1] == player1Location[1])) || ((player2Location[0] - 1 == player1Location[0]) && (player2Location[1] == player1Location[1])) || ((player2Location[0] == player1Location[0]) && (player2Location[1] - 1 == player1Location[1]))) && gameStart == 1) {
			playerDied(3);
			gameStart = 2;
		}else if(player1Location[0] == trackSquares[i][0] && player1Location[1] == trackSquares[i][1]) {
			playerDied(1);
		}else if(player2Location[0] == trackSquares[i][0] && player2Location[1] == trackSquares[i][1]) {
			playerDied(2);
		}
	}

}

function playerDied(player) {
	if(player == 3) {
		alert("Players Tied");
		gameStart = 2;
		$("body").css("visibility", "hidden");
		location.reload();
	} else {
		alert("Player " + player + " Lost");
		gameStart = 2;
		$("body").css("visibility", "hidden");
		location.reload();
	}
}