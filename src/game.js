//game.js

//Questions to ask
// 1. How should I deal with different sized objects
// 2. How to deal with ball speed
// 3. How to let paddle motion affect ball angle on collision
// 4. How/where to detect collisions
// 5. How to remove bricks from board

import Paddle from './paddle';
import Brick from './brick';
import Ball from './ball';

/** @class Game
	*Represents the game board for Breakout
*/
esport default class Game{
	constructor(){
		this.ball = new Ball();
		this.bricks = [];
		this.paddle = new Paddle();
		this.over = false;
		this.win = false;
		this.left = false;
		this.right = false;
		//Create back buffer
		this.backBuffer = document.createElement('canvas');
		this.backBuffer.width = 100;
		this.backBuffer.height = 100;
		this.ctxBack = this.backBuffer.getContext('2d');
		//Create the screen buffer
		this.screenBuffer = document.createElement('canvas');
		this.screenBuffer.width = 100;
		this.screenBuffer.height = 100;
		document.body.appendChild(this.screenBuffer);
		this.ctxScreen = this.screenBuffer.getContext('2d');
		//Bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		this.loop = this.loop.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		//Set up event handlers
		window.onkeydown = handleKeyDown;
		window.onkeyup = handleKeyUp;
		//Start game loop
		this.interval = setInterval(this.loop,1000);
	}
	/** @method gameOver
		*Handles the end of the game
	*/
	gameOver(){
		
	}
	/** @method handleKeyDown
		*Handles the event of a key being pressed;
	*/
	handleKeyDown(event){
		event.preventDefault();
		switch(event.key){
			case 'ArrowLeft':
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
		this.paddle.update(this.left, this.right);
		//maybe add delay for ball so it moves slower than paddle
		this.ball.update();
		var position = this.ball.getPosition();
		if(position.y > 100){
			this.over = true;
			return this.gameOver();
		}
		//deal with collision with paddle
		//remove bricks from board due to collsion
		if(this.bricks === []){
			this.over = true;
			this.win = true;
			return this.gameOver();
		}
		this.bricks.forEach((brick) =>{
			this.brick.update();
		});
	}
	/** @method Render
		* This draws the game board
	*/
	render(){
		this.ctxBack.fillStyle = '#ccc';
		this.ctxBack.fillRect(0,0,100,100);
		this.bricks.forEach((brick) => {
			this.brick.render(this.ctxBack);
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