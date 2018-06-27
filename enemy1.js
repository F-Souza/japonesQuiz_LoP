function Enemy1(x,y){
  this.x = x;
  this.y = y;
  this.hp = 185;
  this.dead = false;
  this.attack = false;
  this.sprites = [];
  this.frames = 0;
  this.action = 0;
  this.flag = true;
  
  this.preload = function(){
    for(this.i = 0; this.i < 27; this.i++){
      this.sprites[this.i] = loadImage("sprites/objects/enemies/scorpion_"+this.i+".png");
    }
  }
  
  // 0 = idle | 1 = attack | 2 = dead
  this.show = function(){
    if(this.action === 0){
      this.frames += 1;
      if(this.frames>=7){
        this.frames = 0;
      }
    }else if(this.action === 1){
      if(this.frames != 6 && this.flag){
        this.frames = 6
        this.flag = false
      }
      this.frames += 1
      if(this.frames >= 15){
        this.frames = 0;
        this.action = 0;
      }
      if(this.frames === 12){
        this.attack = true;
      }
    }else if(this.action === 2){
      if(this.frames != 15 && this.flag){
        this.frames = 15;
        this.flag = false
      }
      if(this.frames < 26){
        this.frames += 1;
      }
      if(this.frames === 24){
        this.dead = true;
      }
    }
    image(this.sprites[this.frames], this.x, this.y);
    if(this.hp>0){
      rectMode(CORNER);
      fill(255,30,30);
      rect(630,25,(this.hp*-1),30);
    }
  }
  
  this.verify = function(){
    if(this.dead == false){
      this.flag = true;
      if(this.hp>0){
        this.action = 1;
      }else{
        this.action = 2;
      }
    }
  }
}
