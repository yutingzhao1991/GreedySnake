/**
 * init module for seajs.com
 */


var Snake = function(params) {
		params = params || {};
		this.id = params.id;
		this.order = params.order || "right";
		this.body = [{
			x: 2,
			y: 0
		}, {
			x: 1,
			y: 0
		},{
			x: 0,
			y: 0
		}];
		this.speed_x = params.speed_x || 1;
		this.speed_y = params.speed_y || 0;
	};
Snake.prototype = {
	next: function(longer) {
		var t;
		if(longer){
			t = {};
			t.x = this.body[0].x + this.speed_x;
			t.y = this.body[0].y + this.speed_y;
			this.body.unshift(t);
		}else{
			t = this.body.pop();
			t.x = this.body[0].x + this.speed_x;
			t.y = this.body[0].y + this.speed_y;
			this.body.unshift(t);
		}
		
	},
	getOrder: function(o){
		switch (o) {
			//up
		case 'up':
			this.order = "up";
			this.speed_y = -1;
			this.speed_x = 0;
			break;
			//down
		case 'down':
			this.order = "down";
			this.speed_y = 1;
			this.speed_x = 0;
			break;
			//left
		case 'left':
			this.order = "left";
			this.speed_x = -1;
			this.speed_y = 0;
			break;
			//right
		case 'right':
			this.order = "right";
			this.speed_x = 1;
			this.speed_y = 0;
			break;
		}
	}
};

exports.createSnake = function(params) {
	return new Snake(params);
};