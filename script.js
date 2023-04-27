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
      this.x = 300;
      this.y = 300;
      this.speedX = 0;
      this.speedY = 0;
      this.maxSpeed = 4;
      this.image = document.getElementById('hero');
      this.isMoving = false;
    }
    draw(context){
      // context.strokeRect(this.x ,this.y , this.width, this.height);
      context.drawImage(this.image, this.frameX *this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    setSpeed(speedX, speedY){
      this.speedX = speedX;
      this.speedY = speedY;
    }
    update(items){
      // collision logic
      items.forEach(item => {
        if (item.x < this.x + this.width &&
            item.x + item.width > this.x &&
            item.y < this.y + this.height &&
            item.y + item.height > this.y
        ){console.log('collision')}
      });

      //player movement
      if(this.game.lastKey == 'PArrowLeft'){
        this.setSpeed(-this.maxSpeed,0)
        this.frameY = 1;
        this.isMoving = true;
      } else if(this.game.lastKey == 'RArrowLeft'){
        this.setSpeed(0,0)
        this.frameY = 1;
        this.isMoving = false;
      } else if(this.game.lastKey == 'PArrowRight'){
        this.setSpeed(this.maxSpeed,0)
        this.frameY = 2;
        this.isMoving = true;
      }else if(this.game.lastKey == 'RArrowRight'){
        this.setSpeed(0,0)
        this.frameY = 2;
        this.isMoving = false;
      } else if(this.game.lastKey == 'PArrowUp'){
        this.setSpeed(0, -this.maxSpeed*0.6)
        this.frameY = 3;
        this.isMoving = true;
      }else if(this.game.lastKey == 'RArrowUp'){
        this.setSpeed(0,0)
        this.frameY = 3;
        this.isMoving = false;
      }else if(this.game.lastKey == 'PArrowDown'){
        this.setSpeed(0, this.maxSpeed*0.6)
        this.frameY = 0;
        this.isMoving = true;
      }else if(this.game.lastKey == 'RArrowDown'){
        this.setSpeed(0,0)
        this.frameY = 0;
        this.isMoving = false;
      } else{
        this.setSpeed(0,0)
        this.isMoving = false;
      }

      if(!this.isMoving) {
        this.frameX = 1;
      }
      
      this.x += this.speedX;
      this.y += this.speedY;

      //setting horizontal bouandaries on the screen
      if (this.x<45){
        this.x = 45;
      } else if (this.x > this.game.rightMargin - this.width){
        this.x =this.game.rightMargin - this.width;
      }
      //setting vertical bouandaries on the scree 
      if (this.y <0 + this.game.topMargin){
        this.y = this.game.topMargin;
      } else if (this.y > this.game.bottomMargin - this.height) {
        this.y = this.game.bottomMargin - this.height;
      }
      // sprite animation
      if (this.isMoving) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
      }
    }
  }

  class Object {
    constructor(game){
      this.game = game
    }
    draw(context){
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.strokeRect(this.x ,this.y , this.width, this.height);
    }
  }

  class Bookshelf extends Object{
    constructor(game){
      super(game);
      this.game = game;
      this.image= document.getElementById('bookshelf')
      this.imageWidth= this.width = 32 
      this.imageHeight= this.height = 40
      this.x=300;
      this.y=280;
    }
  }

  class Game {
    constructor(width, height ){
      this.width= width;
      this.height=height;
      this.topMargin = 280;
      this.bottomMargin = 860;
      this.rightMargin = 1045
      this.lastKey = undefined;
      this.input = new InputHandler(this);
      this.hero = new Hero(this);
      // interactables become an array of objects that player can interact with
      this.interactables = [];
      this.interactables.push(new Bookshelf(this)); // start with just one for now
    
      
    }
    render(context){
      this.interactables.forEach(item => item.draw(context));
      this.hero.draw(context);
      this.hero.update(this.interactables);
      // order of drawing dictates the position on screen

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