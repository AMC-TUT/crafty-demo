Crafty.c("Player_1", {
    init: function() {
		this.lives = 3,
		this.score = 0,
		this._keyUp = "UP_ARROW",
		this._keyLeft = "LEFT_ARROW",
		this._keyRight = "RIGHT_ARROW",
		this._speed = 0,
		this._direction = "right",
		this._jump = false,
		this._jump_counter = 33,
		this.addComponent("2D", "Canvas", "Collision", "Keyboard", "SpriteAnimation", "Gravity", "player")
		.gravity("Platform").gravityConst(.1)
        .collision()
		.animate("idle_right", [[0, 2]])
		.animate("idle_left", [[1, 2]])
		.animate("walk_right", [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]])
		.animate("walk_left", [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]])
		.animate("jump_right", [[2, 2]])
		.animate("jump_left", [[3, 2]])
		.animate("die", [[4, 2], [5, 2], [6, 2], [7, 2]])
		.bind("EnterFrame", function(frame) {
			if (this._jump) {
				this._speed = 3;
				if (this._direction == "left") {
					this.x -= this._speed;
					if (!this.isPlaying("jump_left")) {
						this.stop().animate("jump_left", 20, -1)
					}
				}
				if (this._direction == "right") {
					this.x += this._speed;
					if (!this.isPlaying("jump_right")) {
						this.stop().animate("jump_right", 20, -1)
					}
				}
				this.y -= this._speed;
				this._jump_counter -= 1;
				if (this._jump_counter < 0) {
					this._jump = false;
					this._jump_counter = 33;
				}
			} else {
				if(this.isDown(this._keyLeft)) {
					this._speed = 3;
					this._direction = "left";
				}
				if(this.isDown(this._keyRight)) {
					this._speed = 3;
					this._direction = "right";
				}
				if(this.isDown(this._keyUp)) {
					this._jump = true;
				}
				if (this._speed > 0) {
					this._speed -= .1;
					if (this._direction == "left") {
						this.x -= this._speed;
						if (!this.isPlaying("walk_left")) {
							this.stop().animate("walk_left", 20, -1)
						}
					}
					if (this._direction == "right") {
						this.x += this._speed;
						if (!this.isPlaying("walk_right")) {
							this.stop().animate("walk_right", 20, -1)
						}
					}
				} else {
					if (this._direction == "left") {
						this.stop().animate("idle_left", 20, -1);
					} else {
						this.stop().animate("idle_right", 20, -1);
					}
				}
			}
			
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.x > 880) {
                this.x = 880;
            }
		})
		.bind("Die", function() {
			this.lives -= 1;
			if (this.lives > 0) {
				$('.lives').text(this.lives);
				this.x = 50;
				this.y = 600;
			} else {
				Crafty.scene("GameOver");
			}
			
		})
		
    }
});

Crafty.c("Fruit", {
	value: 10,
    init: function() {
        this.addComponent("2D", "Canvas", "Collision", "Gravity", "SpriteAnimation", "fruit1")
		.gravity("Platform").gravityConst(.1)
        .collision(new Crafty.polygon([0,0], [16,0], [16,16], [0,16]))
        .animate("die", [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]])
        .onHit("Player_1", function(ent) {
			Crafty.audio.play("sound3");
			var obj = ent[0].obj;
			obj.score += this.value;
			$('.score').text(obj.score);

			this.stop().animate('die', 40, 1);

			var fruit = this;
			setTimeout(function() {
				fruit.destroy();
			}, 500);

        })
	}
});

Crafty.c("Fruit_1", {
	value: 10,
    init: function() {
        this.addComponent("Fruit", "fruit1")
	}
});

Crafty.c("Fruit_2", {
	value: 10,
    init: function() {
        this.addComponent("Fruit", "fruit2")
    }
});

Crafty.c("Fruit_3", {
	value: 20,
    init: function() {
        this.addComponent("Fruit", "fruit3")
    }
});

Crafty.c("Fruit_4", {
	value: 20,
    init: function() {
        this.addComponent("Fruit", "fruit4")
    }
});

Crafty.c("Fruit_5", {
	value: 30,
    init: function() {
        this.addComponent("Fruit", "fruit5")
    }
});

Crafty.c("Fruit_6", {
	value: 30,
    init: function() {
        this.addComponent("Fruit", "fruit6")
    }
});

Crafty.c("Snake_1", {
    init: function() {
		this._direction = "right",
		this.addComponent("2D", "Canvas", "Collision", "SpriteAnimation", "Gravity", "snake2")
		.animate("crawl_right", [[0, 1], [1, 1], [2, 1], [3, 1]])
		.animate("crawl_left", [[0, 0], [1, 0], [2, 0], [3, 0]])
		.gravity("Platform").gravityConst(.6)
		.collision()
		.onHit("Player_1", function(ent) {
			Crafty.audio.play("sound1");
			var obj = ent[0].obj;
			//obj.destroy();
			obj.trigger("Die");
		})
		.onHit("Turtle", function(ent) {
			if (this._direction == "right") {
				this._direction = "left";
			} else {
				this._direction = "right";
			}
		})
		.bind("EnterFrame", function(frame) {
			if (this._direction == "right") {
				this.x += 1;
				if (!this.isPlaying("crawl_right")) {
					this.stop().animate("crawl_right", 20, -1)
				}
			} else {
				this.x -= 1;
				if (!this.isPlaying("crawl_left")) {
					this.stop().animate("crawl_left", 20, -1)
				}
			}
			if (this.y > 700) {
				var rand = Crafty.math.randomInt(100,800);
				this.y = 50;
				this.x = rand;
				if (rand > 450) {
					this._direction = "left";
				} else {
					this._direction = "right";
				}
			}
		})
	}
});

Crafty.c("Snake_2", {
    init: function() {
		this._direction = "left",
		this.addComponent("2D", "Canvas", "Collision", "SpriteAnimation", "Gravity", "snake2")
		.animate("crawl_right", [[0, 3], [1, 3], [2, 3], [3, 3]])
		.animate("crawl_left", [[0, 2], [1, 2], [2, 2], [3, 2]])
		.gravity("Platform").gravityConst(.6)
		.collision()
		.onHit("Player_1", function(ent) {
			Crafty.audio.play("sound1");
			var obj = ent[0].obj;
			//obj.destroy();
			obj.trigger("Die");
		})
		.onHit("Turtle", function(ent) {
			if (this._direction == "right") {
				this._direction = "left";
			} else {
				this._direction = "right";
			}
		})
		.bind("EnterFrame", function(frame) {
			if (this._direction == "right") {
				this.x += 1;
				if (!this.isPlaying("crawl_right")) {
					this.stop().animate("crawl_right", 20, -1)
				}
			} else {
				this.x -= 1;
				if (!this.isPlaying("crawl_left")) {
					this.stop().animate("crawl_left", 20, -1)
				}
			}
			if (this.y > 700) {
				var rand = Crafty.math.randomInt(100,800);
				this.y = 50;
				this.x = rand;
				if (rand > 450) {
					this._direction = "left";
				} else {
					this._direction = "right";
				}
			}
		})
	}
});

Crafty.c("Turtle", {
    init: function() {
		this._direction = "right",
		this.addComponent("2D", "Canvas", "Collision", "SpriteAnimation", "Platform", "Gravity", "turtle")
		.animate("crawl_right", [[0, 5], [1, 5], [2, 5], [3, 5]])
		.animate("crawl_left", [[0, 4], [1, 4], [2, 4], [3, 4]])
		.gravity("Platform").gravityConst(.8)
		.collision()
		.onHit("Fruit", function(ent) {
			Crafty.audio.play("sound1");
			var obj = ent[0].obj;
			obj.destroy();
		})
		.bind("EnterFrame", function(frame) {
			if (this._direction == "right") {
				this.x += .2;
				if (!this.isPlaying("crawl_right")) {
					this.stop().animate("crawl_right", 20, -1)
				}
			} else {
				this.x -= .2;
				if (!this.isPlaying("crawl_left")) {
					this.stop().animate("crawl_left", 20, -1)
				}
			}
			if (this.y > 700) {
				var rand = Crafty.math.randomInt(100,800);
				this.y = 50;
				this.x = rand;
				if (rand > 450) {
					this._direction = "left";
				} else {
					this._direction = "right";
				}
			}
		})
	}
});

Crafty.c("Plank", {
    init: function() {
        this.addComponent("2D", "Canvas", "Platform", "plank")
    }
});

Crafty.c("Platform", {
    init: function() {
    }
});
