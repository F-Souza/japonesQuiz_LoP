function Questions(lv,sec){
  this.lv = lv;
  this.section = sec;
  this.sprite;
  this.r = 48;
  this.timing = 12;
  this.x_1 = 264;
  this.x_2 = 360;
  this.x_3 = 456;
  this.y = 288;
  this.sort = 0;
  this.type = [];
  this.Vtype = 0;
  this.R = 0;
  this.quiz = [];
  this.max = 8.99;
  this.power = 1;
  this.e_power = 1;
  this.quizTime = false;
  
  this.QSort = function(){
    this.sort = parseInt(random(0,this.max));
  }
  
  this.start_ = function(){
    this.max = 8.99;
    this.quizTime = true;
    this.refresh();
  }
  
  this.preload = function(){
    for(this.i = 0; this.i < 9; this.i++){
      this.quiz[this.i] = loadImage("sprites/scenes/questions/lv"+this.lv+"/sec"+this.section+"/bg_questions_t"+(this.i%3)+"_"+this.i+".png");
      this.type[this.i] = this.i%3;
    }
  }
  
  this.refresh = function(){
    if(this.max > -1){
      this.sprite = this.quiz[this.sort];
      this.Vtype = this.type[this.sort];
      for(this.i = this.quiz.length-1; this.i >= 0; this.i--){
        if(this.i == this.sort){
          this.quiz.splice(this.i, 1);
          this.type.splice(this.i, 1);
        }
      }
      this.max -= 1;
    }else{
      this.quizTime = false;
      return;
    }
  }
  
  this.show = function(){
    if(this.max > -1){
      fill(255);
      ellipse(360,40,this.timing*5,this.timing*5);
      rectMode(CENTER);
      noStroke();
      fill(30);
      rect(this.x_1,this.y,this.r,this.r);
      rect(this.x_2,this.y,this.r,this.r);
      rect(this.x_3,this.y,this.r,this.r);
      image(this.sprite,30,18);
      
    }
  }
  
  this.clicked = function(x,y){
    if(this.quizTime){
      var d1 = dist(this.x_1,this.y,x,y);
      var d2 = dist(this.x_2,this.y,x,y);
      var d3 = dist(this.x_3,this.y,x,y);
      if(d1<40){
        this.R = 0;
        if(this.R===this.Vtype){
          console.log("Right "+this.Vtype+" "+this.sort);
          this.power += 0.3;
          this.QSort();
          this.refresh();
        }else{
          console.log("Nop "+this.Vtype+" "+this.sort);
          this.e_power += 0.3;
          this.QSort();
          this.refresh();
        }
      }else if(d2<40){
        this.R = 1;
        if(this.R===this.Vtype){
          console.log("Right "+this.Vtype+" "+this.sort);
          this.power += 0.3;
          this.QSort();
          this.refresh();
        }else{
          console.log("Nop "+this.Vtype+" "+this.sort);
          this.e_power += 0.3;
          this.QSort();
          this.refresh();
        }
      }else if(d3<40){
        this.R = 2;
        if(this.R===this.Vtype){
          console.log("Right "+this.Vtype+" "+this.sort);
          this.power += 0.3;
          this.QSort();
          this.refresh();
        }else{
          console.log("Nop "+this.Vtype+" "+this.sort);
          this.e_power += 0.3;
          this.QSort();
          this.refresh();
        }
      }
    }
  }
}
