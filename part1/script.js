// script.js

// Canvas 엘리먼트 가져오기
const canvas = document.getElementById("gif-canvas");
const context = canvas.getContext("2d");

// GIF 이미지 로드
const gifImage = new Image();
gifImage.src = "character.gif"; // 본인의 GIF 파일 경로로 변경

// GIF 이미지 로드 완료 이벤트 리스너
gifImage.onload = function () {
  // GIF 이미지를 Canvas에 그리기
  context.drawImage(gifImage, 0, 0, canvas.width, canvas.height);
};

gifImage.onload();