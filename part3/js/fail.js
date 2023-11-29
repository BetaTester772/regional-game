import { value } from '../js/game.js';
import { round } from '../js/game.js';

window.onload = function() {

  var canvas = document.getElementById('one');
  var canvas2 = document.getElementById('two');

  var draw = canvas.getContext("2d");
  var img = new Image();
  img.src = "newfail.gif";
  img.onload = function() {
    draw.drawImage(img, -10, -20, 320, 220);
    
    draw.fillStyle = "white";
    draw.font = "20px Arial";
    draw.fillText("hello Canvas", 580, 50);
  };
};



document.addEventListener("DOMContentLoaded", function() {
  const wigcjdmaImage = document.getElementById("wigcjdmaImage");

  wigcjdmaImage.addEventListener("click", () => {
    window.location.href = "file:///D:/don'tgiveup/first.html";
  });
});