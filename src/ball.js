//ball.js

import Paddle from './paddle';
import Brick from '.brick';

//Need to figure out:
// 'speed'
// change direction on collision
// change direction based on angle, collision site, and target movement
// points?

/** @class Ball
	* The ball object used in the game Breakout
*/
export default class Ball{
	constructor(x,y){
		this.x = x;
		this.y = y;
		//vectors
		this.vx = 1;
		this.vy = -1;
	}
	//changing angles
	//paddle moving opposite ball = lower angle, vy++
	//paddle moving same as ball = steeper angle, vy--
	update(paddle, bricks){
		this.x = this.x + this.vx;
		this.y = this.y + this.vy;
		if(this.y > 100) return 'out of bounds';
		//check for collision with paddle and change direction and angle if so
		//check for collision with each brick, then destroy brick if so
	}
	render(context){
		context.save();
		context.fillStyle = 'blue';
		//create a ball of the appropriate size
		context.restore();
	}
}