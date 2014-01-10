var canvas, context;
var h,w,x,y;
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame         ||
          window.webkitRequestAnimationFrame   ||
          window.mozRequestAnimationFrame      ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



(function init(){
  canvas = document.getElementById('main-canvas');
  canvas.width = w = 1024;
  canvas.height = h = 768;
  x = w/2;
  y = h/2;

  context = canvas.getContext('2d');
  context.globalCompositeOperation = 'source-over';

  loop();
})();

function loop(){
  draw(); 
  requestAnimFrame(loop);
}

function draw(){
  context.clearRect(0, 0, w, h);
  move();

  // Big circle
  context.beginPath();
  context.arc(x,y,50, 2 * Math.PI, false);
  context.stroke();
  context.closePath();

  // Small circle
  context.beginPath();
  context.arc(x,y,2, 2 * Math.PI, false);
  context.stroke();
  context.closePath();

  // Text
  context.font = "bold 12px sans-serif";
  context.fillText("x: " + x, 20, 20);
  context.fillText("y: " + y, 20, 30);
  context.fillText("edge point: " + getEdge(x,y,50,0) , 20, 40);
  
  drawEdges();
 }

var direction = 'left';
function move(){
  console.log('x = ' + x);
 if(x > 0 && direction == 'left'){
  x -= 5;
 }else if(x < w){
   direction = 'right';
   console.log('go back!');
    x += 5;
 }else{
   direction = 'left';
 }

}

function getEdge(x2,y2,radius, t){
  var x1 = x2 + (radius * Math.cos(t));
  var y1 = y2 + (radius * Math.sin(t));
 return [x1, y1];
}


function drawEdges(){
  var anglesToCheck = [0,90,180,270];
  var edge; 

  for(var i = 0; i < anglesToCheck.length; i++){
    edge = getEdge(x,y,50,radians(anglesToCheck[i]));

    context.beginPath();
    context.arc(edge[0],edge[1],2, 2 * Math.PI, false);
    context.stroke();
    context.closePath();

  }
}


function radians(degrees){
  return (degrees * Math.PI) / 180;
}


