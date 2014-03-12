/**
 * init module for seajs.com
 */

define(function (require) {
	var size = 20;
	var Snake = function (params, self) {
		params = params || {};
		this.id = params.id;
		this.order = params.order || "right";
		if(params.body){
			this.body = [];
			for(var i=0; i<params.body.length; i++){
				this.body.push(getBodyShape({
					x: params.body[i].x
					,y: params.body[i].y
				}, self));
			}
		}else{
			this.body = [getBodyShape({x:40,y:0}, self),getBodyShape({x:20,y:0}, self),getBodyShape({x:0,y:0}, self)];
		}
	};
	Snake.prototype = {
		update: function(s){
			this.order = s.order;
			for(var i=0; i<s.body.length; i++){
				this.body[i].x = s.body[i].x * size;
				this.body[i].y = s.body[i].y * size;
			}
		},
		addUnit: function(position, self){
			var t = getBodyShape(position, self);
			this.body.unshift(t);
			return t;
		},
		getOrder: function(){
			return this.order;
		}
	};
	function getBodyShape(position, self){
		var bodyUnit = new Shape();
		bodyUnit.x = position.x * size;
		bodyUnit.y = position.y * size;
		if(self){
			bodyUnit.graphics.beginFill("#fff").drawRect(2,2,size-4,size-4);
		}else{
			bodyUnit.graphics.beginFill("#aaa").drawRect(2,2,size-4,size-4);
		}
		
		return bodyUnit;
	}
	return {
		createSnake: function (params, self) {
			return new Snake(params, self);
		}
	};
});
