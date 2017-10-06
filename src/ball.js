//ball.js

import Paddle from './paddle';
import Brick from './brick';

/** @class Ball
	* The ball object used in the game Breakout
*/
export default class Ball{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.radius = 3;
		//vectors
		this.vx = 1;
		this.vy = -1;
		//bind method
		this.checkCollision = this.checkCollision.bind(this);
		this.clamp = this.clamp.bind(this);
	}
	/** @method clamp
		* Math function that helps with figuring out collisions
	*/
	clamp(val, min, max){
		return Math.max(min, Math.min(max, val));
	}
	/** @method checkCollision
		* Checks if the ball has collided with a rectangle
		* Borrowed from course website, http://nathanhbean.com/courses/cis580/f17/materials/collisions.html
		* In the example of a circle colliding with a rectangle.
	*/
	checkCollision(rect){
		var rx = this.clamp(this.x, rect.x, (rect.x + rect.width));
		var ry = this.clamp(this.y, rect.y, (rect.y + rect.height));
		var distSquared = Math.pow(rx - this.x, 2) + Math.pow(ry - this.y, 2);
		if(distSquared < Math.pow(this.radius, 2)){
			//collision
			return 'hit';
		}
		else{
			//no collision
			return 'miss'
		}
	}
	//changing angles
	//paddle moving opposite ball = lower angle, vy++
	//paddle moving same as ball = steeper angle, vy--
	update(paddle, bricks){
		this.x = this.x + this.vx;
		this.y = this.y + this.vy;
		if((this.y + 1) > 100) return 'game over';
		if((this.x + 1) >= 200 || (this.x - 1) <= 0){
			this.vx = -this.vx;
			return 'hit';
		}
		if((this.y - 1) <= 0){
			this.vy = -this.vy;
			return 'hit';
		}
		//check for collision with paddle and change direction if so
		//also check for paddle movement and change velocity accordingly
		var result = this.checkCollision(paddle);
		if(result === 'hit'){
			if(this.x < paddle.x || this.x > (paddle.x + paddle.width)){
				this.vx = -this.vx
				return 'hit';
			}
			if((this.vx < 0 && paddle.leftDown === true) || (this.vx > 0 && paddle.rightDown === true)){
				this.vy++;
			}
			else if((this.vx < 0 && paddle.rightDown === true) || (this.vx > 0 && paddle.leftDown === true)){
				this.vy--;
			}
			this.vy = -this.vy;
			return 'hit';
		}
		var check;
		bricks.forEach((brick) => {
			if(!brick.destroyed){
				check = this.checkCollision(brick);
				if(check === 'hit'){
					//brick.destroy();
					if(this.x < brick.x || this.x > (brick.x + 10)){
						this.vx = -this.vx
					}
					else if(this.y < (brick.y + 5) || this.y > brick.y){
						this.vy = -this.vy;
					}
					return 'good';
				}
			}
		});
	}
	render(context){
		context.beginPath();
		context.fillStyle = 'blue';
		context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
		context.fill();
		context.closePath();
	}
}