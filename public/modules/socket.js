/**
 * init module for seajs.com
 */

define(function (require) {
	var HOST = location.hostname;
	var id = null;
	var socket = null;
	return {
		connect: function(){
			socket = io.connect('http://'+HOST);
			/*
			socket.on('map', function(map){
				console.log(map);
			});*/

			return socket;
		}
	};
});
