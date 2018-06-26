function FireBall(x,y) {
  this.x = x;
  this.y = y;
  this.sprites = [];
  this.frames = 0;
  this.damage = 1;
  this.toDelete = false;
  
  this.preload = function(){
    for(this.j = 0; this.j < 3; this.j++){
      this.sprites[this.j] = loadImage("sprites/objects/flames_"+this.j+".png");
    }
  }
    
  this.show = function(){
    this.frames += 1;
    if(this.frames>=3){
      this.frames = 0;
    }
    image(this.sprites[this.frames],this.x,this.y);
  }
  
  this.move = function(){
    this.x += 25;
  }
  
  this.hits = function(enemy){
    var d = dist(this.x,this.y, enemy.x,enemy.y)
    if(d < 60){
      enemy.hp -= this.damage;
      return true;
    }else{
      return false;
    }    
  }
  
  this.delet = function(){
    this.toDelete = true;
  }
   
}
