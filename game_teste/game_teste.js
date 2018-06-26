var player, infoBg = [], bgL = [], flames = [],enemies = [], playerBar,eBar = [],e_attack = [], attack_P = false, fps = 6,control=0, question = [], info = 0, lv = 1, sec = 1, pre_Lv = [], power_bar;
var ttp, scenes = 0, qnt = true, power = 0, e_power = 0;

function preload() {
  power_bar = loadImage("sprites/scenes/PowerBar.png");
  for(var f = 0; f < 5; f++){
    pre_Lv[f] = loadImage("sprites/scenes/pre_lv/t"+f+".png")
  }
  for(var g = 0; g < 2; g++){
    infoBg[g] = loadImage("sprites/scenes/pre_"+g+".png");
  }
  for(var h = 0; h < 3; h++){
    eBar[h] = loadImage("sprites/scenes/hp_barE_"+h+".png");
  }
  playerBar = loadImage("sprites/scenes/hp_bar.png");
  ttp = loadImage("sprites/scenes/inf_touchTPlay.png");
  for(var i = 0; i < 7; i++){
    bgL[i] = loadImage("sprites/scenes/bg_lv_"+i+".png")
  }
}

function setup() {
  createCanvas(720, 420);
  frameRate(fps);
  player = new Player(120,228);
  player.preload();
}

function draw() {
  clear();
  if(scenes == 0){
    //------------------------------
    background(bgL[scenes]);
    // shake do "Press Enter to Play" ttp
    var ttpX = 1 + random(1,-1);
    var ttpY = 1 + random(1,-1);
    image(ttp,ttpX+235,ttpY+210);
    //---
    
    
    
    
  }else if(scenes == 1){
    //------------------------------
    background(infoBg[info]);
    //---
    
    
    
  }else if(scenes == 1.5){
    background(pre_Lv[0]);
  }else if(scenes == 2){
    //------------------------------
    background(bgL[scenes]);
    image(power_bar,85,65);
    image(power_bar,720-(85+120),65);
    if(player.newQ){
      lv = 1;
      if(sec==1){
        sec = 2;
      }else{
        sec = 1;
      }
       quizSpawn();
      player.newQ = false;
    }
    if(question.length > 0){
      question[0].show();
      if(question[0].timing > 0){
        question[0].timing -= 0.15;
      }
      fill(20,250,250);
      rect(85+60,83,question[0].power*20,15);
      fill(250,250,20);
      rect(720-(85+60),83,question[0].e_power*20,15);
    }
    player.show(40,228);
    if(attack_P){
      player.action = 1;
      attack_P = false;
    }
    if(player.attack){
      var flame = new FireBall(80,260);
      flame.damage = 20*power;
      flame.preload();
      flames.push(flame)
      power = 0;
      player.attack = false;
    }
    //---
    //instancia do enemy e attack
    for(var f = 0; f < enemies.length; f++){
      enemies[f].show();
      if(enemies[f].attack){
        var gBall = new GhostBall(enemies[f].x,enemies[f].y+50)
        gBall.damage = 15*e_power;
        gBall.preload();
        e_attack.push(gBall);
        enemies[f].attack = false;
      }
    }
    //---
    //varredura do array "flames" verificando se existe um flame e se existir ele "instancia" e move
    for(var i = 0; i < flames.length; i++){
      flames[i].show();
      flames[i].move();
      //verifica se algum "flame" atingiu um enemy a partir da funcao do "flame"
      for(var j = 0; j < enemies.length; j++){
        if(flames[i].hits(enemies[j])){
          flames[i].delet();
          enemies[j].verify();
        }
      }
      //---
    }
    for(var i = 0; i < e_attack.length; i++){
      e_attack[i].show();
      e_attack[i].move();
      //verifica se algum "gBall" atingiu o player a partir da funcao do "ghost_ball"
      if(e_attack[i].hits(player)){
          player.verify();
          e_attack[i].delet();
      }
      //---
    }
    //---
    //varre os arrays verificando se as condicoes de exclusao sao verdadeiras
    for(var j = flames.length -1; j >= 0; j--){
      if(flames[j].x >= 700 || flames[j].toDelete || ResetScene){
        flames.splice(j, 1);
      }      
    }
    for(var l = e_attack.length -1; l >= 0; l--){
      if(e_attack[l].x <= 0 || e_attack[l].toDelete || ResetScene){
        e_attack.splice(l, 1);
      }      
    }
    for(var m = question.length -1; m >= 0; m--){
      if(question[m].max < -1 || question[m].timing <= 0){
          power = question[m].power;
          e_power = question[m].e_power;
          attack_P = true;
          question.splice(m, 1);
      }      
    }
    //---
    //spawn passando o indice que vai indicar qual enemy deve ser spawnado
    if(qnt){
      spawn(0);
      qnt = false;
    }
    image(playerBar,0,0);
    image(eBar[0],width-288,0);

    //---   
  }else if(scenes == 2.5){
    lv = 2;
    sec = 1;
    background(pre_Lv[1]); 
  }else if(scenes == 3){
    //------------------------------
    background(bgL[scenes]);
    image(power_bar,85,65);
    image(power_bar,720-(85+120),65);
    if(player.newQ){
      lv = 2;
      if(sec==1){
        sec = 2;
      }else{
        sec = 1;
      }
       quizSpawn();
      player.newQ = false;
    }
    if(question.length > 0){
      question[0].show();
      if(question[0].timing > 0){
        question[0].timing -= 0.15;
      }
      fill(20,250,250);
      rect(85+60,83,question[0].power*20,15);
      fill(250,250,20);
      rect(720-(85+60),83,question[0].e_power*20,15);
    }
    player.show(40,275)
    if(attack_P){
      player.action = 1;
      attack_P = false;
    }
    if(player.attack){
      var flame = new FireBall(80,307);
      flame.damage = 20*power;
      flame.preload();
      flames.push(flame)
      power = 0;
      player.attack = false;
    }
    //---
    //instancia do enemy e attack
    for(var f = 0; f < enemies.length; f++){
      enemies[f].show();
      if(enemies[f].attack){
        var gBall = new ScorpionSting(enemies[f].x,enemies[f].y+50)
        gBall.damage = 25*e_power;
        gBall.preload();
        e_attack.push(gBall);
        enemies[f].attack = false;
      }
    }
    //---
    //varredura do array "flames" verificando se existe um flame e se existir ele "instancia" e move
    for(var i = 0; i < flames.length; i++){
      flames[i].show();
      flames[i].move();
      //verifica se algum "flame" atingiu um enemy a partir da funcao do "flame"
      for(var j = 0; j < enemies.length; j++){
        if(flames[i].hits(enemies[j])){
          flames[i].delet();
          enemies[j].verify();
        }
      }
      //---
    }
    for(var i = 0; i < e_attack.length; i++){
      e_attack[i].show();
      e_attack[i].move();
      //verifica se algum "gBall" atingiu o player a partir da funcao do "ghost_ball"
      if(e_attack[i].hits(player)){
          player.verify();
          e_attack[i].delet();
      }
      //---
    }
    //---
    //varre os arrays verificando se as condicoes de exclusao sao verdadeiras
    for(var j = flames.length -1; j >= 0; j--){
      if(flames[j].x >= 700 || flames[j].toDelete || ResetScene){
        flames.splice(j, 1);
      }      
    }
    for(var l = e_attack.length -1; l >= 0; l--){
      if(e_attack[l].x <= 0 || e_attack[l].toDelete || ResetScene){
        e_attack.splice(l, 1);
      }      
    }
    for(var m = question.length -1; m >= 0; m--){
      if(question[m].max < -1 || question[m].timing <= 0){
          power = question[m].power;
          e_power = question[m].e_power;
          attack_P = true;
          question.splice(m, 1);
      }      
    }
    //---
    //spawn passando o indice que vai indicar qual enemy deve ser spawnado
    if(qnt){
      spawn(1);
      qnt = false;
    }
    image(playerBar,0,0);
    image(eBar[1],width-288,0);
    //---
    
    
    
    
  }else if(scenes == 4){
    //------------------------------
   background(bgL[scenes]);
   image(power_bar,85,65);
   image(power_bar,720-(85+120),65);
   if(player.newQ){
      lv = 3;
      if(sec==1){
        sec = 2;
      }else{
        sec = 1;
      }
       quizSpawn();
      player.newQ = false;
    }
    if(question.length > 0){
      question[0].show();
      if(question[0].timing > 0){
        question[0].timing -= 0.15;
      }
      fill(20,250,250);
      rect(85+60,83,question[0].power*20,15);
      fill(250,250,20);
      rect(720-(85+60),83,question[0].e_power*20,15);
    }
    player.show(40,275)
    if(attack_P){
      player.action = 1;
      attack_P = false;
    }
    if(player.attack){
      var flame = new FireBall(80,307);
      flame.damage = 20*power;
      flame.preload();
      flames.push(flame)
      power = 0;
      player.attack = false;
    }
    //---
    //instancia do enemy e attack
    for(var f = 0; f < enemies.length; f++){
      enemies[f].show();
      if(enemies[f].attack){
        var gBall = new GhostBall(enemies[f].x,enemies[f].y+50)
        gBall.damage = 25*e_power;
        gBall.preload();
        e_attack.push(gBall);
        enemies[f].attack = false;
      }
    }
    //---
    //varredura do array "flames" verificando se existe um flame e se existir ele "instancia" e move
    for(var i = 0; i < flames.length; i++){
      flames[i].show();
      flames[i].move();
      //verifica se algum "flame" atingiu um enemy a partir da funcao do "flame"
      for(var j = 0; j < enemies.length; j++){
        if(flames[i].hits(enemies[j])){
          flames[i].delet();
          enemies[j].verify();
        }
      }
      //---
    }
    for(var i = 0; i < e_attack.length; i++){
      e_attack[i].show();
      e_attack[i].move();
      //verifica se algum "gBall" atingiu o player a partir da funcao do "ghost_ball"
      if(e_attack[i].hits(player)){
          player.verify();
          e_attack[i].delet();
      }
      //---
    }
    //---
    //varre os arrays verificando se as condicoes de exclusao sao verdadeiras
    for(var j = flames.length -1; j >= 0; j--){
      if(flames[j].x >= 700 || flames[j].toDelete || ResetScene){
        flames.splice(j, 1);
      }      
    }
    for(var l = e_attack.length -1; l >= 0; l--){
      if(e_attack[l].x <= 0 || e_attack[l].toDelete || ResetScene){
        e_attack.splice(l, 1);
      }      
    }
    for(var m = question.length -1; m >= 0; m--){
      if(question[m].max < -1 || question[m].timing <= 0){
          power = question[m].power;
          e_power = question[m].e_power;
          attack_P = true;
          question.splice(m, 1);
      }      
    }
    //---
    //spawn passando o indice que vai indicar qual enemy deve ser spawnado
    if(qnt){
      spawn(2);
      qnt = false;
    }
    image(playerBar,0,0);
    image(eBar[2],width-288,0);
    //---
    
    
    
    
  }else if(scenes == 5){
    //------------------------------
    background(bgL[scenes]); 
    //---
    
    
    
    
  }else if(scenes == 6){
    //------------------------------
    background(bgL[scenes]);
    //---
  }
}

function keyPressed(){
  if(scenes > 0){
    if(keyCode === CONTROL){
      control += 1;
      if(control>=4){
        control = 0;
      }
      player.valid(control);
    }
  }
  // 0 = startScene | 1 = instrucoes | 2 = historia | 3.x = lvs | 5 = gameOver | 6 creditos
  if(keyCode === ENTER){
    //StartQuiz func do questions 
    if(scenes === 0){
      reset();
      scenes = 1;
    }else if(scenes == 1){
      info += 1;
      if(info >= 2){
        scenes = 1.5;
      }
    }else if(scenes === 2 && player.dead || scenes === 2 && enemies[0].dead){
      if(player.dead){
        reset();
        quizSpawn();
        qnt = true;
        scenes = 5;
      }else{
        scenes = 2.5;
      }
    }else if(scenes === 3 && player.dead || scenes === 3 && enemies[0].dead){
      if(player.dead){
        reset();
        quizSpawn();
        qnt = true;
        scenes = 5;
      }else{
        reset();
        quizSpawn();
        qnt = true;
        scenes = 4;
      }
    }else if(scenes === 4 && player.dead || scenes === 4 && enemies[0].dead){
      reset();
      scenes = 6;
    }else if(scenes === 5){
      reset();
      scenes = 0;
    }else if(scenes === 6){
      reset();      
      scenes = 0;
    }else{
      scenes += 0.5;
      reset();
      quizSpawn();
      qnt = true;
    }
  }
  //---
}

var ResetScene = false;
var reset = function(){
 ResetScene = true;
 for(var l = e_attack.length -1; l >= 0; l--){
   if(e_attack[l].x <= 0 || e_attack[l].toDelete || ResetScene){
     e_attack.splice(l, 1);
   }      
 }
 for(var j = flames.length -1; j >= 0; j--){
    if(ResetScene){
      flames.splice(j, 1);
    }      
  }
  for(var k = enemies.length -1; k >= 0; k--){
    if(ResetScene){
      enemies.splice(k, 1);
    }      
  }
  
  info = 0;
  control = 0;
  player.hp = 185;
  player.dead = false;
  player.action = 0;
  player.attack = false;
  ResetScene = false;
}

function mousePressed(){
  if(question.length > 0){
    question[0].clicked(mouseX,mouseY);
  }
}

var spawn = function(valor){
  if(valor === 0){
    for(var e = 0; e < 1; e++){
      enemies[e] = new Enemy0(580,228);
      enemies[e].preload();
    }
  }else if(valor === 1){
    for(var e = 0; e < 1; e++){
      enemies[e] = new Enemy1(580,275);
      enemies[e].preload();
    }
  }else if(valor === 2){
    for(var e = 0; e < 1; e++){
      enemies[e] = new Enemy2(560,275);
      enemies[e].preload();
    }
  }
}

var quizSpawn = function(){
  for(var i = 0; i < 1; i++){
    question[i] = new Questions(lv,sec);
    question[i].preload();
    question[i].start_();    
  }
}
