import Draw from '../blocks/view/draw';

((global)=> {
	let btnStop = document.getElementById('stop');
	let btnStart = document.getElementById('start');
	let btnInit = document.getElementById('init');
	
	let draw = new Draw('temp');
	
	draw.initialization();
	draw.render();
	
	btnInit.addEventListener('click', function() {
		draw.initialization();
		draw.tick();
	});
	
	btnStart.addEventListener('click', function() {
		draw.tick();
	});
	btnStop.addEventListener('click', function() {
		draw.stopTick();
	});
	
})(this);