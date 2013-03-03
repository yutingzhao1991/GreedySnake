/**
 * init module for seajs.com
 */

define(function(require) {
	/*
	var canvas = require("../modules/canvas");
	var snake = require("../modules/snake");
	var control = require("../modules/control");
	var socket = require("../modules/socket");
	var CANVAS_WIDTH = 600;
	var CANVAS_HEIGHT = 400;
	var unitSize = 10;

	canvas.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
	canvas.drawBackground();
	var s = snake.createSnake({
		size: unitSize
	});
	canvas.addSnake(s);
	canvas.addFood({
		x: 100,
		y: 100
	});
	control.addEvent(s);
	Ticker.addListener(canvas);
	Ticker.setFPS(50);
*/
	/**
	 * connect server
	 */
	var socket = require("../modules/socket");
	var canvas = require("../modules/canvas");
	var control = require("../modules/control");
	var log = require("../modules/log");
	var CANVAS_WIDTH = 600;
	var CANVAS_HEIGHT = 400;
	var myid = null;
	canvas.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
	canvas.drawBackground();
	var io = socket.connect();
	var orderFlag = {
		'up': 'down'
		,'down': 'up'
		,'left': 'right'
		,'right': 'left'
	};
	control.addEvent(function(order){
		var o = canvas.getSnakeOrder(myid);
		if(orderFlag[o] == order || o == order){
			return;
		}
		io.emit('order', {
			order: order
		});
	});
	io.on('create', function(data) {
		myid = data.id;
		log.log("你的id是 "+myid);
		T.hide("hint");
	});
	io.on('map', function(map){
		canvas.update(map, myid);
	});
	io.on('leave', function(id){
		canvas.removeSnake(id);
		log.log("玩家 "+id+" 离开了");
	});
	io.on('join', function(id){
		log.log("玩家 "+id+" 加入了");
	});
	io.on('dead', function(id){
		canvas.removeSnake(id);
		if(myid == id){
			log.log("你挂了！点击重玩重新开始。");
		}else{
			log.log("玩家 "+id+" 挂了");
		}
	});
	io.on('food', function(id){
		if(myid == id){
			log.scorePlus();
		}
	});
	io.on('reset', function(id){
		if(myid == id){
			log.log("你重新开始了游戏。");
		}else{
			log.log("玩家"+ id +"重新开始了游戏。");
		}
	});
	Ticker.addListener(canvas);
	Ticker.setFPS(50);

	T.event.on("reset", "click", function(){
		io.emit('reset', {
			id: myid
		});
	});
});
