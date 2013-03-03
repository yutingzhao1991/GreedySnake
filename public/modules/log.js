/**
 * init module for seajs.com
 */

define(function (require) {

	var logArea = T.g("log");
	var scoreArea = T.g("score");
	var score = 0;

	return {
		log: function(text){
			logArea.innerHTML += text+"<br/>";
			logArea.scrollTop += 1000;
		},
		scorePlus: function(){
			scoreArea.innerHTML = ++score;
		}
	};
});
