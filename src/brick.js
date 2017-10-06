//brick.js

/** @class Brick
	* The brick object used for the game Breakout.
*/

export default class Brick{
	constructor(x, y){
		this.x = x;
		this.y = y;
		//add width and height fields
		this.width = 10;
		this.height = 4;
		this.destroyed = false;
		this.destroy = this.destroy.bind(this);
	}
	update(){
		
	}
	render(context){
		if(!this.destroyed){
			context.save();
			context.fillStyle = 'red';
			context.fillRect(this.x, this.y, this.width,this.height);
			context.restore();
		}
	}
	destroy(){
		this.destroyed = true;
	}
}