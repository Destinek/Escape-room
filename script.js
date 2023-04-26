window.addEventListener('load', function(){
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width =1092;
  canvas.height = 910;

  class InputHandler {
    constructor(game){
      this.game = game;
      window.addEventListener('keydown', e => {
        this.game.lastKey = 'P' + e.key;
      });
      window.addEventListener('keyup', e => {
        this.game.lastKey = 'R' + e.key;
      });
    }
  }

  class Hero {
    constructor(game){
      this.game = game;
      this.spriteWidth = 18; // width of sprite sheet/ num of collumns
      this.spriteHeight = 32;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 2; //number of frames per row within sprite sheet
      this.width = this.spriteWidth;
      this.height =  this.spriteHeight;
      this.x = 200;
      this.y = 200;
      this.speedX = 0;
      this.speedY = 0;
      this.maxSpeed = 2;
      this.image = document.getElementById('hero');
    }
    draw(context){
      // context.fillRect(this.x ,this.y , this.width, this.height);
      context.drawImage(this.image, this.frameX *this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    setSpeed(speedX, speedY){
      this.speedX = speedX;
      this.speedY = speedY;
    }
    update(){
      if(this.game.lastKey == 'PArrowLeft'){
        this.setSpeed(-this.maxSpeed,0)
        this.frameY = 1;
      // } else if(this.game.lastKey == 'RArrowLeft'){
      //   this.setSpeed(0,0)
      //   this.frameY = 1;
      } else if(this.game.lastKey == 'PArrowRight'){
        this.setSpeed(this.maxSpeed,0)
        this.frameY = 2;
      // }else if(this.game.lastKey == 'RArrowRight'){
      //   this.setSpeed(0,0)
      //   this.frameY = 4;
      } else if(this.game.lastKey == 'PArrowUp'){
        this.setSpeed(0, -this.maxSpeed*0.6)
        this.frameY = 3;
      // }else if(this.game.lastKey == 'RArrowUp'){
      //   this.setSpeed(0,0)
      //   this.frameY = 6;
      }else if(this.game.lastKey == 'PArrowDown'){
        this.setSpeed(0, this.maxSpeed*0.6)
        this.frameY = 0;
      // }else if(this.game.lastKey == 'RArrowDown'){
      //   this.setSpeed(0,0)
      //   this.frameY = 0;
      } else{
        this.setSpeed(0,0)//Users/destinkouamba/Makers/final-project/public/owlbear.png
      }
      this.x += this.speedX;
      this.y += this.speedY;
      //setting horizontal bouandaries
      if (this.x<0){
        this.x = 0;
      } else if (this.x > this.game.width - this.width){
        this.x =this.game.width - this.width;
      }
      //setting vertical bouandaries
      if (this.y <0 + this.game.topMargin){
        this.y = this.game.topMargin;
      } else if (this.y > this.game.height - this.height) {
        this.y = this.game.height - this.height;
      }
      // sprire animation
      if (this.frameX< this.maxFrame){
        this.frameX ++;
      } else {
        this.frameX = 0;
      }

    }
  }

  class Object {

  }

  class Game {
    constructor(width, height ){
      this.width= width;
      this.height=height;
      this.topMargin = 260;
      this.lastKey = undefined;
      this.input = new InputHandler(this);
      this.hero = new Hero(this);
    }
    render(context){
      this.hero.draw(context);
      this.hero.update();
    }
  }

  const game = new Game(canvas.width, canvas.height);

  
  function animate (){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate(); 
});