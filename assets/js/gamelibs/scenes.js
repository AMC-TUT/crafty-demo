//Loading Scene
Crafty.scene("Loading", function() {
	Crafty.e("HTML")
	.append('<br/><br/><div class="hero-unit span8 offset1"><div class="row"><img src="assets/img/splash.png" class="span6 offset1" alt="" /></div><br/><br/><div class="row span6 offset1"><div class="progress progress-warning active"><div class="bar"></div></div></div></div>');
/*
	<br/><br/>
	<div class="hero-unit span8 offset1">
		<div class="row">
			<img src="assets/img/splash.png" class="span6 offset1" alt="" />
		</div>
		<br/><br/>
		<div class="row">
			<div class="progress progress-warning active">
				<div class="bar">
				</div>
			</div>
		</div>
	</div>
*/

	Crafty.load(
		[
			"/craftydemo/assets/img/captain_dynamo_48x27.png",
			"/craftydemo/assets/img/grass_giga_mario_24x35.png",
			"/craftydemo/assets/img/qvak_16x16.png",
			"/craftydemo/assets/img/bg.png"
		],
		function() {
			setTimeout(function() {
				// go to Game scene
				Crafty.scene("Game");
			}, 1000);
		},
		function(e) {
			//progress
			$(".progress .bar").css("width", Math.round(e.percent) + "%");
		},
		function(e) {
			//error
			alert('Error while loading game assets (loaded ' + e.loaded + ', percent ' + Math.round(e.percent) + ', total ' + e.total + ')');
		}
	);
});

Crafty.scene("Game", function() {
	Crafty.audio.play("sound2");
	Crafty.background("url('/craftydemo/assets/img/bg.png')");
	Crafty.e("HTML")
    .attr({x:800, y:50, w:100, h:50})
	.append('<div class="score">0</div>');
	Crafty.e("HTML")
    .attr({x:100, y:50, w:100, h:50})
	.append('<div class="lives">3</div>');

	Game.generateGame();

});

Crafty.scene("GameOver", function() {
	Crafty.audio.play("sound2");
	Crafty.e("HTML")
	.append('<br/><br/><div class="hero-unit span8 offset1"><div class="row"><div class="end"></div></div></div>');
	$('.end').text("GAME OVER");

});
