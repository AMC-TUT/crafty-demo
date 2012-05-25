window.onload = function() {
	var WIDTH = 900, HEIGHT = 700;

	// initialize Crafty
	Crafty.init(WIDTH, HEIGHT);

	// load first scene
	Crafty.scene("Loading");
};

var Game = {
	// plank locations
	planks: [
	{ _x: 200, _y: 380, _w: 150, _h: 20 },
	{ _x: 550, _y: 380, _w: 150, _h: 20 },
	{ _x: 0, _y: 480, _w: 150, _h: 20 },
	{ _x: 375, _y: 480, _w: 150, _h: 20 },
	{ _x: 750, _y: 480, _w: 150, _h: 20 },
	{ _x: 200, _y: 580, _w: 150, _h: 20 },
	{ _x: 550, _y: 580, _w: 150, _h: 20 },
	{ _x: 0, _y: 680, _w: 900, _h: 20 },
	],
	// fruit locations
	fruits: [
	{ c: "Fruit_1", _x: 100, _y: 100 },
	{ c: "Fruit_2", _x: 300, _y: 100 },
	{ c: "Fruit_3", _x: 500, _y: 100 },
	{ c: "Fruit_4", _x: 700, _y: 100 },
	{ c: "Fruit_5", _x: 200, _y: 200 },
	{ c: "Fruit_6", _x: 400, _y: 200 },
	{ c: "Fruit_5", _x: 600, _y: 200 },
	{ c: "Fruit_4", _x: 800, _y: 200 },
	{ c: "Fruit_3", _x: 150, _y: 300 },
	{ c: "Fruit_2", _x: 350, _y: 300 },
	{ c: "Fruit_1", _x: 550, _y: 300 },
	{ c: "Fruit_2", _x: 750, _y: 300 },
	{ c: "Fruit_3", _x: 250, _y: 400 },
	{ c: "Fruit_4", _x: 450, _y: 400 },
	{ c: "Fruit_5", _x: 650, _y: 400 },
	{ c: "Fruit_6", _x: 850, _y: 400 },
	],
	generateGame: function() {
		Game.generatePlanks();
		Game.generateFruits();
		Game.addEnemies();
		Game.addPlayer();
	},
	generatePlanks: function() {
		for (var i = 0; i < Game.planks.length; i++) {
			Crafty.e("Plank").attr({ x: Game.planks[i]._x, y: Game.planks[i]._y, z: 2, w: Game.planks[i]._w, h: Game.planks[i]._h });
		}
	},
	generateFruits: function() {
		for (var i = 0; i < Game.fruits.length; i++) {
			Crafty.e(Game.fruits[i].c).attr({ x: Game.fruits[i]._x, y: Game.fruits[i]._y, z: 2, w: 16, h: 16 });
		}
	},
	addEnemies: function() {
		Crafty.e("Snake_1").attr({ x: 950, y: 50, z: 2, w: 48, h: 27 });
		Crafty.e("Snake_2").attr({ x: 950, y: 50, z: 2, w: 48, h: 27 });
		Crafty.e("Turtle").attr({ x: 950, y: 50, z: 2, w: 48, h: 27 });
	},
	addPlayer: function() {
		Crafty.e("Player_1").attr({ x: 50, y: 60, z: 2, w: 24, h: 35 });
	}
	


}