//game.js

//Questions to ask
// 2. How to deal with ball speed
// Ans: same update time, different speeds for each
// 3. How to let paddle motion affect ball angle on collision
// Ans: use vector values for angles, reflect values to switch directions
// 4. How/where to detect collisions
// Ans: in the ball object

//maybe adjust canvas size so it is wider than height

import Paddle from './paddle';
import Brick from './brick';
import Ball from './ball';

/** @class Game
	*Represents the game board for Breakout
*/
export default class Game{
	constructor(){
		this.ball = new Ball(100, 85);
		this.bricks = [];
		//loop to create bricks
		var x = 15;
		var y = 5;
		while(y < 76){
			while(x < 166){
				this.bricks.push(new Brick(x, y));
				x+=15;
			}
			x = 15;
			y+= 15;
		}
		//for(var y = 0; y < 5; y++){
			//for(var x = 0; x < 100; x+=10){
				//make bricks
				//this.bricks.push(new Brick(x, y));
			//}
		//}
		this.paddle = new Paddle(75, 95);
		this.over = false;
		this.win = false;
		this.left = false;
		this.right = false;
		this.points = 0;
		//Create back buffer
		this.backBuffer = document.createElement('canvas');
		this.backBuffer.width = 200;
		this.backBuffer.height = 100;
		this.ctxBack = this.backBuffer.getContext('2d');
		//Create the screen buffer
		this.screenBuffer = document.createElement('canvas');
		this.screenBuffer.width = 200;
		this.screenBuffer.height = 100;
		document.body.appendChild(this.screenBuffer);
		this.ctxScreen = this.screenBuffer.getContext('2d');
		//Create HTML UI Elements
		var score = document.createElement('div');
		score.id = 'score';
		score.textContent = 'Score: ' + this.points;
		document.body.appendChild(score);
		var message = document.createElement('div');
		message.id = 'message';
		message.textContent = "";
		document.body.appendChild(message);
		//Create sound element
		var sound = document.createElement('audio');
		sound.id = 'sound'
		sound.source = 'file:///C:/Users/Owner/Documents/CIS%20580/Breakout/src/Hit_Hurt2.wav';
		document.body.appendChild(sound);
		//Bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		this.loop = this.loop.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		//Set up event handlers
		window.onkeydown = this.handleKeyDown;
		window.onkeyup = this.handleKeyUp;
		//Start game loop
		this.interval = setInterval(this.loop,50);
	}
	/** @method gameOver
		*Handles the end of the game
	*/
	gameOver(result){
		var message = document.getElementById('message');
		if(result === 'game over'){
			message.innerText = 'Game Over';
			this.over = true;
		}
		else{
			message.innerText = 'You Win!';
			this.over = true;
		}
	}
	/** @method handleKeyDown
		*Handles the event of a key being pressed;
	*/
	handleKeyDown(event){
		event.preventDefault();
		switch(event.key){
			case "ArrowLeft":
				this.left = true;
				break;
			case 'ArrowRight':
				this.right = true;
				break;
		}
	}
	/** @method handleKeyUp
		*Handles the event of the key no longer being pressed
	*/
	handleKeyUp(event){
		event.preventDefault();
		switch(event.key){
			case 'ArrowLeft':
				this.left = false;
				break;
			case 'ArrowRight':
				this.right = false;
				break;
		}
	}
	/** @method Update
		*This updates the game world
	*/
	update(){
		if(!this.over){
			var result = this.ball.update(this.paddle, this.bricks);
			if(result === 'game over'){
				return this.gameOver(result);
			}
			else if(result === 'hit'){
				document.getElementById('sound').play();
			}
			//do something based on ball update return
			this.paddle.update(this.left, this.right);
			this.bricks.forEach((brick) =>{
				if(!brick.destroyed){
					var result = this.ball.checkCollision(brick);
					if (result === 'hit'){
						brick.destroy();
						document.getElementById('sound').play();
						this.points+=10;
						var score = document.getElementById('score');
						score.textContent = 'Score: ' + this.points;
					}
				}
			});
			//check if all bricks are destroyed, and end game if so
			var check;
			this.bricks.forEach((brick) =>{
				if(!brick.destroyed){
					check = 'ok';
					return;
				}
			})
			if(check !== 'ok')return this.gameOver('win');
		}
	}
	/** @method Render
		* This draws the game board
	*/
	render(){
		this.ctxBack.fillStyle = '#ccc';
		this.ctxBack.fillRect(0,0,200,200);
		this.bricks.forEach((brick) => {
			brick.render(this.ctxBack);
		}); 
		this.ball.render(this.ctxBack);
		this.paddle.render(this.ctxBack);
		this.ctxScreen.drawImage(this.backBuffer,0,0);
	}
	/** @method Loop
		*Game loop
	*/
	loop(){
		this.update();
		this.render();
	}
}