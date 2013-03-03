var map = require("./map");
var snake = require("./snake");
var socket = require("./socket");

var io = null;


function addListener(){
	io.sockets.on('connection', function (socket) {
		addNewSnake(socket.id);
		socket.emit("create", {
			id: socket.id
		});
		broad('join', socket.id);
		socket.on('order', function(data){
			map.order(socket.id, data.order);
		});
		socket.on('reset', function(data){
			map.reset(snake.createSnake({
				id: socket.id
			}));
			broad('reset', socket.id);
		});
		socket.on('disconnect', function (){
			removeSnake(socket.id);
			broad('leave', socket.id);
		});
	});

}

function addNewSnake(id){
	map.addSnake(snake.createSnake({
		id: id
	}));
}

function removeSnake(id){
	map.removeSnake(id);
}

function broad(type, data){
	io.sockets.emit(type, data)
}

exports.start = function(app){
	io = socket.createSocket(app);
	addListener();
	map.addFood();
	var infos = null;
	setInterval(function(){
		infos = map.next();
		broad('map', map.getMap());
		if(infos){
			for(var i=0; i<infos.length; i++){
				if(infos[i].type == "dead"){
					broad('dead', infos[i].id);
				}else if(infos[i].type == "food"){
					broad('food', infos[i].id);
				}
			}
		}
	},200);
	setInterval(function(){
		map.addFood();
	},5000);
}
