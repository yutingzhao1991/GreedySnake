/**
 * init module for seajs.com
 */

define(function (require) {

	return {
		addEvent: function(callback){
			T.event.on(window, "keydown", function(e){
				switch(e.which){
					//up
					case 38:
						callback('up');
					    break;
					//down
					case 40:
						callback('down');
					    break;
					//left
					case 37:
						callback('left');
					    break;
					//right
					case 39:
						callback('right');
					    break;
				}
			});

		}
	};
});
