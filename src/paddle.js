//paddle.js

/** @class Paddle
	*The paddle object used for the game Breakout
*/
export default class Paddle{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 5;
		this.leftDown = false;
		this.rightDown = false;
	}
	update(left, right){
		if(left === true && right === true){
			//Both keys are down, so it won't move
			this.leftDown = false;
			this.rightDown = false;
			return;
		}
		this.leftDown = left;
		this.rightDown = right;
		//set limitations for movement(doesn't move off screen)
		if(this.leftDown){
			this.x-=2;
			if(this.x <= 0)this.x = 0;
		}
		else if (this.rightDown){
			this.x+=2;
			if(this.x >= 150) this.x = 150;
		}
		
	}
	render(context){
		context.save();
		context.fillStyle = 'green';
		context.fillRect(this.x, this.y, this.width, this.height);
		context.restore();
	}
}