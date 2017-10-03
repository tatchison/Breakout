//paddle.js

/** @class Paddle
	*The paddle object used for the game Breakout
*/
export default class Paddle{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.leftDown = false;
		this.rightDown = false;
	}
	update(left, right){
		if(left === true && right === true){
			//Both keys are down, so it won't move
			this.leftDown = false;
			this.rightDown = false;
		}
		this.leftDown = left;
		this.rightDown = right;
		if(this.leftDown) this.y--;
		else if (this.rightDown) this.y++;
		
	}
	render(context){
		context.save();
		context.fillStyle = 'green';
		context.fillRect(this.x, this.y, 10, 5);
		context.restore();
	}
}