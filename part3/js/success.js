document.addEventListener("DOMContentLoaded", function() {
  const wigekdmaImage = document.getElementById("wigekdmaImage");
  const wigrhddbImage = document.getElementById("wigrhddbImage");

  wigekdmaImage.addEventListener("click", () => {
    window.location.href = "file:///D:/don'tgiveup/first.html";
  });

  wigrhddbImage.addEventListener("click", () => {
    takeScreenshot();
  });
});

function takeScreenshot() {
  var canvas = document.getElementById('one');
  if (canvas.getContext) {
    var canvasData = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    a.href = canvasData;
    a.download = 'screenshot.png';
    a.click();
  } else {
    alert('귀하의 브라우저에서는 Canvas가 지원되지 않습니다.');
  }
}