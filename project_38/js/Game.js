class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    hero1 = createSprite(100,200);
    hero2 = createSprite(300,200);
    hero3 = createSprite(500,200);
   
    
    hero1.addImage("hero1",hero1Img);
    hero2.addImage("hero2",hero2Img);
    hero3.addImage("hero3",hero3Img);
   

    heros = [hero1, hero2, hero3, hero4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
     
      var index = 0;

      
      var x = 0;
      var y;
     
      for(var plr in allPlayers){
       
        index = index + 1 ;

        
        x = x + 200;
       
        y = displayHeight - allPlayers[plr].distance;
        heros[index-1].x = x;
        heros[index-1].y = y;

        if (index === player.index){
          hero[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = heros[index-1].y
        }
       
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }
}
