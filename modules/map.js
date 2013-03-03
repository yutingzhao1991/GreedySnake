var snakes = {};
var foods = {};
var WIDTH = 30;
var HEIGHT = 20;
var food_count = 0;
var map = [];
// 0　空白
// 1  蛇
// 2  食物
// 3 障碍 
for(var i=0; i<WIDTH; i++){
	var t = [];
	for(var j=0; j<HEIGHT; j++){
		t.push({
			type: 0
		});
	}
	map.push(t);
}
function removeSnake(id){
	var s = snakes[id];
	if(!s){
		return;
	}
	for(var i=0; i<s.body.length; i++){
		map[s.body[i].x][s.body[i].y] = 0;
	}
	delete snakes[id];
}
function removeFood(id){
	map[foods[id].x][foods[id].y] = {
		type: 0
	};
	delete foods[id];
	food_count -- ;
}

exports.addSnake = function(s){
	snakes[s.id] = s;
	for(var i=0; i<s.body.length; i++){
		map[s.body[i].x][s.body[i].y] = 1;
	}
}
exports.removeSnake = removeSnake;
exports.next = function(){
	var infos = [];
	for(var s in snakes){
		var snake = snakes[s];
		var mapUnit = map[snake.body[0].x][snake.body[0].y];
		if(mapUnit.type == 2){
			// eat a food
			snake.next(true);
			removeFood(mapUnit.id);
			mapUnit.type = 3;
			infos.push({
				id: snake.id
				,type: 'food'
			});
		}else if(mapUnit.type == 1){
			infos.push({
				id: snake.id
				,type: 'dead'
			});
			removeSnake(snake.id);
			// crash other
		}else if(mapUnit.type == 3){
			infos.push({
				id: snake.id
				,type: 'dead'
			});
			removeSnake(snake.id);
			//crash something
		}else{
			map[snake.body[snake.body.length - 1].x][snake.body[snake.body.length - 1].y].type = 0;
			snake.next();
			mapUnit.type = 3;
			if(snake.body[0].x < 0 || snake.body[0].x >= WIDTH || snake.body[0].y < 0 || snake.body[0].y >= HEIGHT){
				infos.push({
					id: snake.id
					,type: 'dead'
				});
				snake.body.splice(0, 1);
				removeSnake(snake.id);
			}
		}
		/*
		var flag = true;
		for(var f in foods){
			if(foods[f].x == snake.body[0].x && foods[f].y == snake.body[0].y){
				snake.next(true);
				removeFood(f);
				flag = false;
			}
		}
		if(flag){
			snake.next();
		}
		*/
	}
	return infos;

}

exports.getMap = function(){
	return {
		snakes: snakes
		,foods: foods
	};
}

exports.order = function(id, o){
	if(!snakes[id]){
		return;
	}
	snakes[id].getOrder(o);
}

exports.reset = function(s){
	snakes[s.id] = s;
}

exports.addFood = function(){
	if(food_count > 10){
		return;
	}
	var id = String(Date.now());
	var tx,ty;
	tx = parseInt(Math.random() * (WIDTH-1));
	ty = parseInt(Math.random() * (HEIGHT-1));
	while(map[tx][ty].type != 0){
		//循环获取一个可放置食物的位置
		tx = parseInt(Math.random() * (WIDTH-1));
		ty = parseInt(Math.random() * (HEIGHT-1));
	}
	foods[id] = {
		x: tx
		,y: ty 
		,id: id
	};
	food_count ++;
	map[foods[id].x][foods[id].y] = {
		type: 2
		,id: id
	};
	return foods[id];
}

exports.removeFood = removeFood;