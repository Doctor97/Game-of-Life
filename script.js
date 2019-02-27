var cellxcell = parseInt($("#cellSize").val());
var glovbaliterationsWidth = 0;
var globaliterationsHeight = 0;
var toBorn = [];
var toDie = [];
var inervalID;
var speed = parseInt($("#speed").val());

function createPlate(){
  cellxcell = parseInt($("#cellSize").val());
  var plateWidth = $("#plate").width(); 
  var plateHeight = $("#plate").height()
  var iterationsWidth = Math.round(plateWidth / cellxcell);
  var iterationsHeight = Math.round(plateHeight / cellxcell);
  console.log(iterationsHeight);
  console.log(iterationsWidth);
  glovbaliterationsWidth = iterationsWidth;
  globaliterationsHeight = iterationsHeight;
  var currentIterWidth = 0;
  var currentIterHeight = 0;
  var marginLeft = 0;
  var marginTop = 0;
  var idValue = 0;
  while(currentIterHeight < iterationsHeight){
    currentIterHeight += 1;
    while(currentIterWidth < iterationsWidth){
      var obj = document.createElement('div');
      obj.id = "newId" + (idValue+1);
      obj.className = "cell";
      obj.style.cssText = 'cursor: pointer;background: #B8B8B8; position: absolute; display: inline-block; border: 1px solid blue; width: ' + cellxcell + 'px; height: ' + cellxcell + 'px; margin-left:' + marginLeft + 'px; margin-top:' + marginTop + 'px;';
      obj.setAttribute("deadAlive", "dead");
      var x = (idValue+1);
      //deadAlive("newId"+x);
      document.getElementById("plate").appendChild(obj);
      currentIterWidth++;
      marginLeft += cellxcell;
      idValue++;
    }
    marginTop += cellxcell;
    marginLeft = 0;
    currentIterWidth = 0;
    //console.log(marginTop);
  }
}

function setDeadAlive(x){
  var deadAliveVal = document.getElementById(x).getAttribute("deadAlive");
 document.getElementById(x).onclick = function(){
  if(deadAliveVal == "dead"){
    $("#"+x).css('background', '#31D800');
    document.getElementById(x).setAttribute("deadAlive", "alive");
    deadAliveVal = document.getElementById(x).getAttribute("deadAlive");
    //alert(document.getElementById(x).getAttribute("deadAlive"));
  }
  else{
     $("#"+x).css('background', '#B8B8B8');
     document.getElementById(x).setAttribute("deadAlive", "dead");
     deadAliveVal = document.getElementById(x).getAttribute("deadAlive");
      //alert(document.getElementById(x).getAttribute("deadAlive"));
  }
  };
}

function deadOrAlive(i){
//console.log("newId"+i);
 if(document.getElementById("newId"+i).getAttribute("deadAlive") == "alive"){
      return "alive";
  }
  else{
      return "dead";
  }
}

function calNeighbors(i){
  var neighbors = 0;
  //<EAST>
  if(i%glovbaliterationsWidth == 0){
    if(deadOrAlive(i-glovbaliterationsWidth+1) == "alive"){
      neighbors++;
    }
  }
  if(i%glovbaliterationsWidth != 0){
    if(deadOrAlive(i+1) == "alive"){
      neighbors++;
    }
  }
  //</EAST>
  //<WEST>
  if((i-1)%glovbaliterationsWidth == 0 ){
    if(deadOrAlive(i+glovbaliterationsWidth-1) == "alive"){
      neighbors++;
    }
  }
  if((i-1)%glovbaliterationsWidth != 0){
    if(deadOrAlive(i-1) == "alive"){
      neighbors++;
    }
  }
   //</WEST>
   //<SOUTH>
   if(i>=1 && i <=glovbaliterationsWidth){
      if(deadOrAlive(i+(globaliterationsHeight-1)*glovbaliterationsWidth) == "alive"){
        neighbors++;
      }
   }
    if(!(i>=1 && i <=glovbaliterationsWidth)){
      if(deadOrAlive(i-glovbaliterationsWidth) == "alive"){
        neighbors++;
      }
   }
   //</SOUTH>
   //<NORTH>
     if(i>=glovbaliterationsWidth*(globaliterationsHeight-1)+1 && i <=glovbaliterationsWidth*globaliterationsHeight){
      if(deadOrAlive(i-(glovbaliterationsWidth*(globaliterationsHeight-1))) == "alive"){
        neighbors++;
      }
   }
    if(!(i>=glovbaliterationsWidth*(globaliterationsHeight-1)+1 && i <=glovbaliterationsWidth*globaliterationsHeight) ){
      if(deadOrAlive(i+glovbaliterationsWidth) == "alive"){
        neighbors++;
      }
   }
   //</NORTH>
   //<SOUTH-EAST>
  if(i>=1 && i <=glovbaliterationsWidth){
    if(i%glovbaliterationsWidth == 0){
      if(deadOrAlive((i+(globaliterationsHeight-1)*glovbaliterationsWidth)-glovbaliterationsWidth+1) == "alive"){
        neighbors++;
      }
    }
    if(i%glovbaliterationsWidth != 0){
      if(deadOrAlive((i+(globaliterationsHeight-1)*glovbaliterationsWidth)+1) == "alive"){
        neighbors++;
      }
    }
   }
  if(!(i>=1 && i <=glovbaliterationsWidth)){
    if(i%glovbaliterationsWidth == 0){
      if(deadOrAlive((i-glovbaliterationsWidth)-glovbaliterationsWidth+1) == "alive"){
        neighbors++;
      }
    }
    if(i%glovbaliterationsWidth != 0){
      if(deadOrAlive((i-glovbaliterationsWidth)+1) == "alive"){
        neighbors++;
      }
    }
   }
   //</SOUTH-EAST>
   //<SOUTH-WEST>
  if(i>=1 && i <=glovbaliterationsWidth){
    if((i-1)%glovbaliterationsWidth == 0){
      if(deadOrAlive((i+(globaliterationsHeight-1)*glovbaliterationsWidth)+glovbaliterationsWidth-1) == "alive"){
        neighbors++;
      }
    }
    if((i-1)%glovbaliterationsWidth != 0 ){
      if(deadOrAlive((i+(globaliterationsHeight-1)*glovbaliterationsWidth)-1) == "alive"){
        neighbors++;
      }
    }
   }
  if(!(i>=1 && i <=glovbaliterationsWidth)){
    if((i-1)%glovbaliterationsWidth == 0 ){
      if(deadOrAlive((i-glovbaliterationsWidth)+glovbaliterationsWidth-1) == "alive"){
        neighbors++;
      }
    }
    if((i-1)%glovbaliterationsWidth != 0 ){
      if(deadOrAlive((i-glovbaliterationsWidth)-1) == "alive"){
        neighbors++;
      }
    }
   }
   //</SOUTH-WEST>
  //<NORTH-EAST>
  if(i>=glovbaliterationsWidth*(globaliterationsHeight-1)+1 && i <=glovbaliterationsWidth*globaliterationsHeight){
    if(i%glovbaliterationsWidth == 0){
      if(deadOrAlive((i-(glovbaliterationsWidth*(globaliterationsHeight-1)))-glovbaliterationsWidth+1) == "alive"){
        neighbors++;
      }
    }
    if(i%glovbaliterationsWidth != 0){
      if(deadOrAlive((i-(glovbaliterationsWidth*(globaliterationsHeight-1)))+1) == "alive"){
        neighbors++;
      }
    }
   }
  if(!(i>=glovbaliterationsWidth*(globaliterationsHeight-1)+1 && i <=glovbaliterationsWidth*globaliterationsHeight)){
    if(i%glovbaliterationsWidth == 0){
      if(deadOrAlive((i+glovbaliterationsWidth)-glovbaliterationsWidth+1) == "alive"){
        neighbors++;
      }
    }
    if(i%glovbaliterationsWidth != 0){
      if(deadOrAlive((i+glovbaliterationsWidth)+1) == "alive"){
        neighbors++;
      }
    }
   }
   //</NORTH-EAST>
  //<NORTH-WEST>
  if(i>=glovbaliterationsWidth*(globaliterationsHeight-1)+1 && i <=glovbaliterationsWidth*globaliterationsHeight){
    if((i-1)%glovbaliterationsWidth == 0){
      if(deadOrAlive((i-(glovbaliterationsWidth*(globaliterationsHeight-1)))+glovbaliterationsWidth-1) == "alive"){
        neighbors++;
      }
    }
    if((i-1)%glovbaliterationsWidth != 0){
      if(deadOrAlive((i-(glovbaliterationsWidth*(globaliterationsHeight-1)))-1) == "alive"){
        neighbors++;
      }
    }
   }
  if(!(i>=glovbaliterationsWidth*(globaliterationsHeight-1)+1 && i <=glovbaliterationsWidth*globaliterationsHeight)){
    if((i-1)%glovbaliterationsWidth == 0){
      if(deadOrAlive((i+glovbaliterationsWidth)+glovbaliterationsWidth-1) == "alive"){
        neighbors++;
      }
    }
    if((i-1)%glovbaliterationsWidth != 0){
      if(deadOrAlive((i+glovbaliterationsWidth)-1) == "alive"){
        neighbors++;
      }
    }
   }
   //</NORTH-WEST>
   return neighbors;
}
function start(){
  var i = 1;
  while(i < (glovbaliterationsWidth*globaliterationsHeight)+1){
    var deadAliveVal = document.getElementById("newId"+i).getAttribute("deadAlive");
    var deadAliveNeighborVal = "";
    if(deadAliveVal == "dead"){
        var neighbors = calNeighbors(i);
       if(neighbors == 3 ){
          $("#newId"+i).css('background', '#31D800');
          toBorn.push("newId" + i);
       }
    }
    if(deadAliveVal == "alive"){
        var neighbors = calNeighbors(i);
       if(neighbors < 2 ||  neighbors > 3){
          $("#newId"+i).css('background', '#B8B8B8');
          toDie.push("newId" + i);
       }
    }
    i++;
  }
    toBorn.forEach(function(item){
      document.getElementById(item).setAttribute("deadAlive", "alive");
    });
    toBorn = [];
    toDie.forEach(function(item){
      document.getElementById(item).setAttribute("deadAlive", "dead");
    });
    toDie = [];
}

createPlate();

var i = 1;
while(i < (glovbaliterationsWidth*globaliterationsHeight)+1){
    setDeadAlive("newId"+i);
  i++;
}

$("#start").click(function(){
   inervalID = setInterval(function(){ 
      start();
  }, speed);
   
});

$("#step").click(function(){
      start();
});


$("#stop").click(function(){
  clearInterval(inervalID);
});


$("#apply").click(function(){
  var node = document.getElementById("plate");
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
createPlate();
var i = 1;
while(i < (glovbaliterationsWidth*globaliterationsHeight)+1){
    setDeadAlive("newId"+i);
  i++;
}
speed = parseInt($("#speed").val());
});
