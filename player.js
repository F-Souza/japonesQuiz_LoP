function Player(x,y) {
  this.x = x;
  this.y = y;
  this.hp = 185;
  this.sprites = [];
  this.frames = 0;
  this.action = 0;
  this.dead = false;
  this.flag = true;
  this.attack = false;
  this.newQ = false;
  
  this.preload = function(){
    for(this.i = 0; this.i < 24; this.i++){
      this.sprites[this.i] = loadImage("sprites/player/player_"+this.i+".png");
    }
  }
  
  // func pra reativar a flag (flag que esta responsavel pela verificacao de qual frame ele deve ir), e para setar acao dele 
  this.valid = function(ac){
    this.action = ac;
    this.flag = true;
  }
  
  this.show = function(X,Y) {
    // 0 = idle | 1 = pre_attack | 1.5 = hold_attack | 2 = attack | 3 = dead
    if (this.action === 0){
      if(this.frames!=0 && this.flag){
        this.frames = 0;
        this.flag = false;
      }
      this.frames += 1;
      if(this.frames>=4){
        this.frames = 0;
      }
    }else if(this.action === 1){
      if(this.frames!=4 && this.flag){
        this.frames = 4;
        this.flag = false;
      }
      if(this.frames<=8){
        this.frames += 1;
      }else{
        this.action = 1.5;
      }  
    }else if(this.action === 1.5){
      if(this.frames!=9 && this.flag){
        this.frames = 9;
        this.flag = false;
      }
      this.frames += 1;
      if(this.frames>=13){
        this.frames = 13;
        this.action = 2;
      }
    }else if(this.action === 2){
      if(this.frames!=13 && this.flag){
        this.frames = 13;
        this.flag = false;
      }
      this.frames += 1;
      if(this.frames == 15){
        this.attack = true;
      }
      if(this.frames>=19){
        this.frames = 0;
        this.action = 0;
      } 
    }else if(this.action === 3){
      if(this.frames!=19 && this.flag){
        this.frames = 19;
        this.flag = false;
      }
      if(this.frames<23){
        this.frames += 1;
      }
    }
    image(this.sprites[this.frames],X,Y);
    if(this.hp>0){
      rectMode(CORNER);
      fill(30,255,30);
      rect(90,25,this.hp,30);
    }
  }
  
  this.verify = function(){
    if(this.hp <= 0){
      this.valid(3);
      this.dead = true;
    }else{
      this.newQ = true;
    }
  }
  
}