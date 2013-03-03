/**
 * init module for seajs.com
 */

define(function (require) {
	var canvas = T.g("canvas");
	var snake = require('../modules/snake');
	var stage = new Stage(canvas);
	var snakes = {};
	var foods = {};
	var size = 20;
	var foodimg = new Image();
	foodimg.src = "../images/food.png";
	function tick() {
		stage.update();	
	}
	function addSnake(s) {
		snakes[s.id] = s;
		for (i = 0; i < s.body.length; i++) {
			stage.addChild(s.body[i]);
		}
	}
	function addFood(f) {
		foods[f.id] = f;
		stage.addChild(f.shape);
	}
	function createFood(position){
		var bodyUnit = new Bitmap(foodimg);
		bodyUnit.x = position.x * size;
		bodyUnit.y = position.y * size;
		return {
			id: position.id
			,shape: bodyUnit
		};
		 
		return;
		var bodyUnit = new Shape();
		bodyUnit.x = position.x * size;
		bodyUnit.y = position.y * size;
		bodyUnit.graphics.beginFill("#b00").drawCircle(size/2,size/2,size/2);
		return {
			id: position.id
			,shape: bodyUnit
		};
	}
	function removeFood(id) {
		stage.removeChild(foods[id].shape);
		delete foods[id];
	}
	function getSnakeOrder(id) {
		return snakes[id].getOrder();
	}
	return {
		update: function(map, myid){
			for(var s in map.snakes){
				var t = snakes[s];
				if (!t) {
					addSnake(snake.createSnake(map.snakes[s], myid == s));
				} else {
					if (map.snakes[s].body.length > t.body.length) {
						for (var i = t.body.length; i < map.snakes[s].body.length; i++) {
							stage.addChild(t.addUnit(map.snakes[s].body[i], myid == s));
						}
					}
					t.update(map.snakes[s]);
				}
			}

			for(var f in map.foods){
				if(!foods[f]){
					addFood(createFood(map.foods[f]));
				}
			}

			for(var f in foods){
				if(!map.foods[f]){
					removeFood(f);
				}
			}
		},
		setSize: function (width, height){
			canvas.width = width;
			canvas.height = height;
		},
		drawBackground: function () {
		},
		removeSnake: function(id) {
			if(!snakes[id]){
				return;
			}
			for (i = 0; i < snakes[id].body.length; i++) {
				stage.removeChild(snakes[id].body[i]);
			}
			delete snakes[id];
		},
		addSnakeUnit: function(id, position){
			if(snakes[id]){
				snakes[id].addUnit(position);
			}
		},
		getSnakeOrder: getSnakeOrder,
		tick: tick
	};
});
