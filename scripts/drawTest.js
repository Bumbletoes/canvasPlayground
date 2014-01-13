var canvas, context;
var h,w,x,y;
var anim_angle = 0;

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
  x = 0;
  y = h/2;

  context = canvas.getContext('2d');
  context.globalCompositeOperation = 'source-over';

  loop();
})();

function loop(){
  draw(); 
  requestAnimFrame(loop);
}

var anim_radius = 50;
function draw(){
  context.clearRect(0, 0, w, h);
  move();

  // Big circle
  context.beginPath();
  context.arc(x,y,anim_radius, 2 * Math.PI, false);
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
  //context.fillText("edge point: " + getEdge(x,y,anim_radius,0) , 20, 40);
  

  // Line
  //context.beginPath();



  drawEdges(anim_angle); 
  anim_angle++;  

  if(anim_angle == 360){
    anim_angle = 0;
  }
 }

var direction = 'left';
function move(){
 var rightEdge = getEdge(x,y,anim_radius,0);
 var leftEdge = getEdge(x,y,anim_radius,Util.degreesToRadians(180));

 
 if(leftEdge[0] > 0 && direction == 'left'){
  x -= 5;
 }else if(rightEdge[0] < w){
   direction = 'right';
 
    x += 5;
 }else{
   direction = 'left';
 }

 
 //console.log(temp + canvas.height/2);
 y = (75 * Math.sin(5 * x)) + canvas.height/2;
}

function getEdge(x2,y2,radius, t){
  var x1 = x2 + (radius * Math.cos(t));
  var y1 = y2 + (radius * Math.sin(t));
 return [x1, y1];
}


function drawEdges(angle){
  var edge; 
  edge = getEdge(x,y,anim_radius,Util.degreesToRadians(angle));

  context.beginPath();
  context.arc(edge[0],edge[1],2, 2 * Math.PI, false);
  context.stroke();
  context.closePath();

  
}
