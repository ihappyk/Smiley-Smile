
var canvasBg 	 	= 	document.getElementById('canvasBg');
var ctxBg 			= 	canvasBg.getContext('2d');

var canvasSmiley 	= 	document.getElementById('canvasSmiley');
var ctxSmiley 		= 	canvasSmiley.getContext('2d');

var canvasEnemy 	= 	document.getElementById('canvasEnemy');
var ctxEnemy 		= 	canvasEnemy.getContext('2d');


var canvasHigh     	= 	document.getElementById('canvasHigh');
var ctxHigh 		= 	canvasHigh.getContext('2d');
ctxHigh.fillStyle 	= 	"hsla(0,0%,0%,0.5)";
ctxHigh.font 		= 	"italic 20px Arial";

var canvasEnd		= 	document.getElementById('canvasEnd');
var ctxEnd 			= 	canvasEnd.getContext('2d');

//constant
var bgDrawX1 		= 	0;
var bgDrawX2 		= 	900;
function moveBg() {
  
  bgDrawX1 -= 1;
  bgDrawX2 -= 1;
    if (bgDrawX1 <= -900) {
        bgDrawX1 = 900;
    } else if (bgDrawX2 <= -900) {
        bgDrawX2 = 900;
    }
    drawBg();
}
function drawBg(){
	ctxBg.clearRect(0, 0, gameWidth, gameHeight);
    ctxBg.drawImage(imgSprite, 0, 0, 900, gameHeight, bgDrawX1, 0, 900, gameHeight);
    ctxBg.drawImage(imgSprite, 0, 0, 900, gameHeight, bgDrawX2, 0, 900, gameHeight);
}
//end constant

var mouX			=		0;
var mouY			=		0;
var gameWidth 		= 		canvasBg.width;
var gameHeight 		= 		canvasBg.height;

var start;
var isPlaying;
var end;
var myTime;



var enemies;
var spawnRate;
var spawnAmount;


var smile1 ;
var smileMove1;
//objects used 

var sb;
//end objects used



window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();			

var imgSprite 		= new Image();
imgSprite.src 		= 'my-sprite1.png';
imgSprite.addEventListener('load',init,false);


function init(){
	clearCtxSmiley();
	clearCtxEnemy();
	clearctxHigh();
	clearCtxEnd();
	start 			= 		true;
	isPlaying 		= 		false;
	end 			= 		false;
	sb 				= 		new gameButtons();
	smile1 			= 		new userSmile();
	smileMove1 		= 		new smileMove();
	enemies 		= 		[];
	spawnRate 		= 		2500;
	spawnAmount 	= 		4;
	startloop();

}


function startloop() {
	if(start){
	sb.Enabledraw();
	}
	
	if(isPlaying){
	smileMove1.drawLeft();
	smileMove1.drawRight();
	smileMove1.pauseText();
	myTime = setTimeout( function() {spawnEnemy(spawnAmount);},2500);
	}
	
	loop();
}

function loop(){
	moveBg();
	
	if(start){
		
	}
	if(isPlaying){	
		smile1.updateScore(1);
		smile1.draw();
		drawAllEnemies();
	}
	requestAnimFrame(loop);
}


//starting screen declaration
function gameButtons(){
	this.srcX        =		0;
	this.srcY        = 		850;
	this.drawX       = 		100;
	this.drawY       = 		00;
	this.width       = 		200;
	this.height      = 		130;
}
	
gameButtons.prototype.Enabledraw = function (){
	
   	clearctxHigh();
	//play image
	ctxHigh.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width -10 ,this.height -10 );
	

	//smiley Image
	this.srcX  	   =  		200;
	this.srcY      =  		850;
	this.drawX     =  		80;
	this.drawY     =  		135; 
	this.width     =  		210;
	this.height    =  		210;
	ctxHigh.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width -80 ,this.height -80 );
	



	//about image
	this.srcX      =  		0;
	this.srcY  	   =  		680;
	this.drawX     =  		0;
	this.drawY     =  		280; 
	this.width     =  		280;
	this.height    =  		180;
	ctxHigh.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width - 30 ,this.height -30);
	

	
	
};

gameButtons.prototype.checkClicked = function sou(xL,xR,yT,yB){
	this.xLeft  	 = 		xL;
	this.xRight 	 = 		xR;
	this.yTop   	 = 		yT;
	this.yBottom 	 = 		yB;
 	if(mouX >= this.xLeft && mouX <= this.xRight && this.yTop <= mouY && mouY <= this.yBottom) {
 		return true;
	}
};


gameButtons.prototype.endGame = function (){
		end = true;
		isPlaying = false;
		enemies = [];
		clearTimeout(myTime);
		delete smile1;
		delete smileMove1;
		clearCtxSmiley();
		clearCtxEnemy();
		clearctxHigh();
		clearCtxEnd();
		//$("#canvasEnd").css({"background-color":"#6dd0f7"});
		ctxHigh.font 		= 	"Bold 28px Arial";
		ctxHigh.fillText("Your Score : " + smile1.Score,35,220);
		
		//gameEnd image
		ctxHigh.drawImage(imgSprite,510,680,210,180,60,80,190,160);

		//developer image
		ctxHigh.drawImage(imgSprite,300,680,210,180,140,330,170 ,140);
};

//end of start screen




$("#canvasHigh").bind("click tap", function (event) {
	event.preventDefault();
  	mouX = event.pageX - canvasHigh.offsetLeft;
  	mouY = event.pageY - canvasHigh.offsetTop; 
  	//console.log("X:",mouX+"Y:",mouY);
	if(start && sb.checkClicked(0,300,0,420)){
		clearctxHigh();
		start 		= 	false;
		isPlaying  	= 	true;
	//	$("#canvasEnd").css({"background-color":"#999999"});
		startloop();
	}
	
  
  	if(end){
		location.reload();
  	}


});


$("#canvasEnd").bind("click tap", function (event) {
	event.preventDefault();
  	mouX = event.pageX - canvasEnd.offsetLeft;
    mouY = event.pageY - canvasEnd.offsetTop;
   
   	if(smileMove1.actionMove(10,82,2,46)){
	//$("#smileySound")[0].play();
		smile1.isLeftKey = true;
	}
	
	if(smileMove1.actionMove(225,300,2,46)){
		//$("#smileySound")[0].play();
		smile1.isRightKey = true;
	}
	
/*	if(smileMove1.actionMove(72,225,2,46)){

	switch(smile1.pause)
   	{
   		case 0: clearTimeout(myTime);
   				enemies = [];
   				isPlaying = false;
   				smile1.pause = 1;
   				break;
   		
   		case 1: smile1.pause = 0;
   				myTime = setTimeout(spawnEnemy(spawnAmount), 2500);
   				isPlaying = true;
   				startloop();
   				break;
   		default:
   }
	} */
});




function clearctxHigh(){
	
	ctxHigh.clearRect(0,0,gameWidth,gameHeight);
}

function clearCtxEnd(){
	ctxEnd.clearRect(0,0,ctxEnd.canvas.width,ctxEnd.canvas.height);
}



//game starts



function spawnEnemy(number){
	for(var i = 0;i < number ; i++){
		enemies[enemies.length] = new Enemy();
	}

}



function drawAllEnemies(){
	clearCtxEnemy();
	for( var i =0 ; i < enemies.length; i++){
		enemies[i].drawEnemy();
	}

}


//user  smile

function userSmile() {

	this.srcX        =	0;
	this.srcY        = 	420;
	this.drawX       = 	0;
	this.drawY       = 	378;
	this.width       = 	48;
	this.height      = 	44;
	this.smileySpeed =  22;
	this.isLeftKey   = 	false;
	this.isRightKey  = 	false;
	this.Score 		 =  0;
	this.pause       =  0;
}

userSmile.prototype.draw = function (){
	clearCtxSmiley();
	this.checkDirection();
	ctxSmiley.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width-2,this.height - 2);
};

userSmile.prototype.checkDirection = function (){

	if(this.isLeftKey){
	this.drawX -= this.smileySpeed;
	if(this.drawX <=0) this.drawX = 0;
	smile1.isLeftKey = false;
	}

	if(this.isRightKey){
	this.drawX += this.smileySpeed;
	if(this.drawX+ this.width >= 310) this.drawX = 264;
	smile1.isRightKey = false;
	}
};

userSmile.prototype.updateScore = function (points) {
	this.Score += points;
	ctxHigh.clearRect(0,0,gameWidth,gameHeight);
	ctxHigh.fillText("Score: "+ smile1.Score,2,15);

};

function clearCtxSmiley(){
	
	ctxSmiley.clearRect(0,0,gameWidth,gameHeight);
}
//end of user smile



//enemy funtions

function Enemy() {

	this.srcX 		=	0;
	this.srcY 		= 	464;
	this.drawX 		=  	Math.floor(Math.random()*280);
	this.drawY 		= 	-(Math.floor(Math.random()*500)+50);
	this.width 		= 	48;
	this.height 	= 	44;
	this.speed 		= 	1;
	this.hasHit 	= 	false;
	
}

function selectEnemySrcX(x) {
	if(x === 0 || x === 10) return 0;
	if(x === 1 || x === 11) return 48;
	if(x === 2 || x === 12) return 96;
	if(x === 3 || x === 13) return 144;
	if(x === 4 || x === 14) return 240;
	if(x === 5 || x === 15) return 288;
	if(x === 6 || x === 16) return 336;
	if(x === 7 || x === 17) return 384;
	
	/*switch(x)
	{
		case 0,10 : return 0;
		case 1,11 : return 48;
		case 2,12 : return 96;
		case 3,13 : return 144;
		case 4,14 : return 240;
		case 5,15 : return 288;
		case 6,16 : return 336;
		case 7,17 : return 384;
		case 18   : return 432;
		case 19   : return 480;
		case 20   : return 528;
		case 21   : return 576;
		case 22   : return 624;
		case 23   : return 672;
		case 24   : return 720;
		case 25	  : return 768;
		case 26   : return 816;
		case 27   : return 864;
		default: 
	} */
}

Enemy.prototype.drawEnemy = function (){
	
	this.drawY += this.speed;
	ctxEnemy.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
	this.checkHitUser();
	this.checkEscaped();

};

Enemy.prototype.checkEscaped = function(){
	
	if(this.drawY + this.height >=500) {
		this.recycleEnemy();
	}

}

Enemy.prototype.checkHitUser = function(){
	
	if(smile1.drawX <= this.drawX + 48 && 
		smile1.drawX + 48 >= this.drawX &&
		smile1.drawY <= this.drawY + 44 &&
		smile1.drawY + 44 >= this.drawY ){
		sb.endGame();
		start = true;
		loop();
	} 
	
			
}

Enemy.prototype.recycleEnemy = function(){
	
	this.drawX =  Math.floor(Math.random()*280);
	this.drawY = -Math.floor(Math.random()*100) - 50;
	
    if(smile1.Score >= 2500){
  
			this.speed = Math.floor(Math.random()*2)+1;
			this.srcY  = 508;
			this.srcX  = selectEnemySrcX(Math.floor(Math.random() * 7)+10);
	}
  	else{
			this.speed = Math.floor(Math.random()*1)+1;
			this.srcY  = 464;
			this.srcX  = selectEnemySrcX(Math.floor(Math.random() * 7));		
	}
}



function clearCtxEnemy(){
	
	ctxEnemy.clearRect(0,0, gameWidth,gameHeight);
}

//enemy funtions end

//moving the user smiley


function smileMove(){
	
	this.srcX        =	0;
	this.srcY        = 	556;
	this.drawX       = 	10;
	this.drawY       = 	5;
	this.width       = 	120;
	this.height      = 	66;
}

smileMove.prototype.drawLeft= function (){
	
	ctxEnd.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,65,43);
};

smileMove.prototype.drawRight= function (){
	this.srcX        =	120;
	this.srcY        = 	556;
	this.drawX       =  225;
	this.drawY       = 	5;
	this.width       = 	120;
	this.height      = 	66;
	ctxEnd.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,65,43);
};


smileMove.prototype.actionMove =  function(xL,xR,yT,yB){
	this.xLeft  	 = 	xL;
	this.xRight 	 = 	xR;
	this.yTop   	 = 	yT;
	this.yBottom 	 = 	yB;
 	if(mouX >= this.xLeft && mouX <= this.xRight && this.yTop <= mouY && mouY <= this.yBottom) {
 		return true;
	}
}


smileMove.prototype.pauseText =   function () {

	ctxEnd.font			="italic 15px Verdana ";
	ctxEnd.textBaseline = 'Top';
	ctxEnd.fillText("Tap on Arrows",95,15); 
	ctxEnd.fillText("to Move Left/Right",87,32); 
}
//end of move function

//game ends
