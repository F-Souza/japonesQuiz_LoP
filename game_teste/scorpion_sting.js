function ScorpionSting(x,y) {
  this.x = x;
  this.y = y;
  this.sprite;
  this.damage = 40;
  this.toDelete = false;
  
  this.preload = function(){
    this.sprite = loadImage("sprites/objects/scorpion_sting.png");
  }
    
  this.show = function(){
    this.frames += 1;
    if(this.frames>=3){
      this.frames = 0;
    }
    image(this.sprite,this.x,this.y);
  }
  
  this.move = function(){
    this.x -= 15;
  }
  
  this.hits = function(player){
    var d = dist(this.x,this.y, player.x,player.y+102)
    if(d < 20){
      player.hp -= this.damage;
      return true;
    }else{
      return false;
    }    
  }
  
  this.delet = function(){
    this.toDelete = true;
  }
   
}
