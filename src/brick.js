//brick.js

/** @class Brick
	* The brick object used for the game Breakout.
*/

export default class Brick{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.destroyed = false;
	}
	render(context){
		if(!destroyed){
			context.save();
			context.fillStyle = 'red';
			context.fillRect(x, y, 10,2);
			context.restore();
		}
	}
	destroyed(){
		this.destoyed = true;
	}
}