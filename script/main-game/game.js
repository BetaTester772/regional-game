document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("game-canvas");
    const context = canvas.getContext("2d");


    // 이미지 캐릭터 크기 설정
    const characterWidth = 150; /* 크기 조절 */
    const characterHeight = 150; /* 크기 조절 */

    const obstacleWidth = 100; /* 크기 조절 */
    const obstacleHeight = 100; /* 크기 조절 */

    const coinWidth = 100;
    const coinHeight = 100;

    // 시점 확대 비율 설정
    const zoomRatio = 4;

    // 실제 지도 크기 (도시 배경 이미지의 크기에 맞춰 설정)
    const mapWidth = 1600;
    const mapHeight = 1200;

    // 확대된 지도 크기
    const zoomedMapWidth = mapWidth * zoomRatio;
    const zoomedMapHeight = mapHeight * zoomRatio;

    // 플레이어 초기 위치
    let playerX = 580;
    let playerY = 550;

    // 캐릭터 이동 속도
    const moveSpeed = 10;

    // 캐릭터의 점프 관련 변수
    let isJumping = false;
    let jumpHeight = 0;
    const maxJumpHeight = 100; // 점프 최대 높이
    const jumpSpeed = 4; // 점프 속도

    // 캐릭터 방향을 나타내는 변수 추가
    let isMovingLeft = false;
    let isMovingRight = false;
    let isMovingDown = false;

    let value = 0;
    const increment = 10;
    const intervalTime = 1000; // 1초를 밀리초로 표현한 값


    const interval = setInterval(() => {
        value += increment;
        if (hpWidth > 10) {
            hpWidth -= 10;
        }
        if (hpWidth === 10) {
            //alert("게임오버")
            //gameOver = true;
            window.location.href = "./fail.html";
        }

        console.log(value);

        if (value >= 100000000) {
            clearInterval(interval); // 값이 100 이상이면 인터벌 중지
        }
    }, intervalTime);


    // 게임 오버 상태
    let gameOver = false;

    let hpWidth = 300; // 초기 hp바의 너비
    const hpDecreaseRate = 1; // 초당 감소하는 hp바의 너비

    const checkSuccess = () => {
        const imageData = context.getImageData(playerX, playerY, 1, 1);
        const redValue = imageData[0];

        if (redValue <= 255 && redValue >= 230) {
            window.location.href = "./success.html";
            // 추가적인 동작이 필요한 경우 여기에 작성
        }
    };


    // 건물 객체들 배열
    const buildings = [
        new Building(75, 0, 1110, 470 + 70),
        new Building(0, 470, 75 + 85, 1100 - 470 + 70 + 100),
        new Building(75, 830 + 220 + 50, 450 - 70 + 70, 900 - 830 + 100),
        new Building(1110 + 30, 0, 1000, 275 + 70),
        new Building(1110 + 260, 0, 1000 + 10, 275 + 170 + 10),
        new Building(1110 + 260, 275 + 170 + 10 + 30 - 200, 1000 + 40, 275 + 170 + 10 - 200 - 60 - 30),
        new Building(100 + 230, 490 + 220, 370 - 160 + 30, 120 + 70 - 100 - 100 - 20),
        new Building(100 + 230, 490 + 220 + 200 - 70 + 10, 370 - 160 - 10, 120 + 70 - 100 - 100 - 20 + 120),
        new Building(100 + 230 + 450 - 80, 490 + 220 + 200 - 70 + 10, 370 - 160 - 10 - 70 - 130, 120 + 70 - 100 - 100 - 20 + 120),
        new Building(100 + 230 + 450 + 80, 490 + 220 + 200 - 70 + 10, 370 - 160, 120 + 70 - 100 - 100 - 20 + 20)


        // 추가적인 건물들도 설정할 수 있음
    ];


    // 건물 객체 정의
    function Building(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    const movePlayer = (x, y) => {
        //if (gameOver) return; // 게임 오버 상태에서는 움직이지 않음

        const newX = playerX + x;
        const newY = playerY + y;

        // Check for collisions with buildings
        let canMove = true;
        for (const building of buildings) {
            if (
                newX < building.x + building.width &&
                newX + characterWidth > building.x &&
                newY < building.y + building.height &&
                newY + characterHeight > building.y
            ) {
                // Collision with a building, can't move
                canMove = false;
                break;
            }
        }

        if (newX > 580 && newX < 1070 && newY > 600 && newY < 680) {
            canMove = false;
        }
        if (newX > 1085 && newX < 1190 && newY > 560 && newY < 940) {
            canMove = false;
        }
        if (newX > 700 && newX < 830 && newY > 850 && newY < 940) {
            canMove = false;
        }
        if (newX > 850 && newX < 1070 && newY > 850 && newY < 940) {
            canMove = false;
        }
        if (newX > 510 && newX < 1190 && newY > 950 && newY < 100000) {
            canMove = false;
        }
        if (newX > 1520 && newX < 10000 && newY > 450 && newY < 560) {
            canMove = false;
        }
        if (newX > 1500 && newX < 1530 && newY > 550 && newY < 590) {
            canMove = false;
        }
        if (newX > 1380 && newX < 1510 && newY > 470 && newY < 840) {
            canMove = false;
        }
        if (newX > 1510 && newX < 15010 && newY > 740 && newY < 840) {
            canMove = false;
        }
        if (newX > 1380 && newX < 15010 && newY > 850 && newY < 940) {
            canMove = false;
        }
        if (newX > 1550 && newX < 15010 && newY > 830 && newY < 940) {
            canMove = false;
        }
        if (newX > 1380 && newX < 15010 && newY > 920 && newY < 10040) {
            canMove = false;
        }
        if (newX > 1210 && newX < 15010 && newY > 950 && newY < 10040) {
            canMove = false;
        }
        if (newX > 1180 && newX < 1220 && newY > 1070 && newY < 10040) {
            canMove = false;
        }
        if (newX > 1210 && newX < 1370 && newY > 740 && newY < 940) {
            canMove = false;
        }
        if (newX > 1210 && newX < 1370 && newY > 470 && newY < 630) {
            canMove = false;
        }
        if (newX > 1210 && newX < 1370 && newY > 470 && newY < 630) {
            canMove = false;
        }
        if (newX > 1210 && newX < 1370 && newY > 640 && newY < 730) {
            canMove = false;
        }
        if (newX > 1360 && newX < 1390 && newY > 470 && newY < 490) {
            canMove = false;
        }


        if (canMove) {
            // Update the player's position only if there's no collision
            playerX = newX;
            playerY = newY;
        }
    };


    // 캐릭터 이미지 로드
    const playerImage = new Image();
    playerImage.src = "./assets/main-game/character.gif";

    // 새로운 점프 중인 캐릭터 이미지 로드
    const jumpingCharacterImage = new Image();
    jumpingCharacterImage.src = "./assets/main-game/jump.gif";

    // 캐릭터 이미지 로드
    const playerLeftImage = new Image();
    playerLeftImage.src = "./assets/main-game/character_left.gif";

    // 캐릭터 이미지 로드
    const playerRightImage = new Image();
    playerRightImage.src = "./assets/main-game/character_right.gif";

    // 캐릭터 이미지 로드
    const playerDownImage = new Image();
    playerDownImage.src = "./assets/main-game/character_down.gif";

    const hp = new Image();
    const hpbar = new Image();
    hp.src = "./assets/main-game/hp.png";
    hpbar.src = "./assets/main-game/hpbar.png";

    let score = 0;
    let round = 1;


    // 장애물 이미지 로드
    const obstacleImage = new Image();
    obstacleImage.src = "./assets/main-game/obstacle.gif"; // 장애물 이미지 파일 경로로 변경

    // 코인 이미지 로드
    const coinImage = new Image();
    coinImage.src = "./assets/main-game/coin.gif"; // 코인 이미지 파일 경로로 변경

    // 도시 배경 이미지 로드
    const cityBackgroundImage = new Image();
    cityBackgroundImage.src = "./assets/main-game/game_map_test.png.jpg";

    // 새로운 미니맵 이미지 로드
    const miniMapImage = new Image();
    miniMapImage.src = "./assets/main-game/minimap.jpg";

    // 미니맵 및 작은 지도 크기 설정
    const minimapSmallWidth = 200;
    const minimapSmallHeight = 150;

    // 건물과 캐릭터 충돌 체크 함수
    Building.prototype.checkCollision = function (playerX, playerY, playerWidth, playerHeight) {
        if (
            playerX + playerWidth > this.x &&
            playerX < this.x + this.width &&
            playerY + playerHeight > this.y &&
            playerY < this.y + this.height
        ) {
            return true;
        }
        return false;
    };


    const obstacles = [];
    const coins = [];


    const drawGame = () => {
        // 캐릭터를 중심으로 맵 이동을 위해 맵의 시작점 계산
        const mapStartX = canvas.width / 2 - playerX * zoomRatio + characterWidth * zoomRatio / 2;
        const mapStartY = canvas.height / 2 - playerY * zoomRatio + characterHeight * zoomRatio / 2;
        -100;

        // 새로운 점프 중인 캐릭터 이미지 로드
        const jumpingCharacterImage = new Image();
        jumpingCharacterImage.src = "./assets/main-game/jump.gif";

        // 배경 이미지 확대하여 그리기
        context.drawImage(cityBackgroundImage, mapStartX, mapStartY, zoomedMapWidth, zoomedMapHeight);

        //context.drawImage(hp, 10, 10, 350, 50);
        context.drawImage(hpbar, 30, 15, 300, 60);
        context.drawImage(hp, 48, 33, hpWidth - 20, 25);

        context.fillStyle = "black";
        context.font = "24px Arial";
        context.fillText("Score: " + value, 400, 60);
        context.fillText("Round: " + round, 600, 60);

        // const imageData = context.getImageData(playerX, playerY, 1, 1); TODO: CO error
        //const pixelColor = `RGB(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
        //context.fillText(`Pixel Color at Player's Location: ${pixelColor}`,200,30);
        context.fillText(" X: " + playerX, 200, 100)
        context.fillText(" Y: " + playerY, 250, 20)

        // Draw grid lines
        context.strokeStyle = "rgba(255, 255, 255, 0.5)";
        context.lineWidth = 1;
        const gridSize = 50;
        /*
          for (let x = 0; x <= mapWidth; x += gridSize) {
            for (let y = 0; y <= mapHeight; y += gridSize) {
              // Draw vertical grid lines
              context.beginPath();
              const screenX = canvas.width / 2 - playerX * zoomRatio + characterWidth * zoomRatio / 2;
              const screenY = canvas.height / 2 - playerY * zoomRatio + characterHeight * zoomRatio / 2;
              context.moveTo(screenX + x * zoomRatio, screenY);
              context.lineTo(screenX + x * zoomRatio, screenY + zoomedMapHeight);
              context.stroke();

              // Draw horizontal grid lines
              context.beginPath();
              context.moveTo(screenX, screenY + y * zoomRatio);
              context.lineTo(screenX + zoomedMapWidth, screenY + y * zoomRatio);
              context.stroke();

              // Draw coordinate labels
              context.fillStyle = "black";
              context.font = "18px Arial";
              context.fillText(`(${x}, ${y})`, screenX + x * zoomRatio - 5, screenY + y * zoomRatio - 5);
            }
          }
        */

        // 캐릭터 그리기 (캔버스 중앙에 고정)
        // 캐릭터 그리기 (캔버스 중앙에 고정)
        let characterToDraw = playerImage; // 기본 이미지로 설정

        if (isJumping) {
            characterToDraw = jumpingCharacterImage; // 점프 중일 때 이미지 변경
        } else if (isMovingLeft) {
            characterToDraw = playerLeftImage;
        } else if (isMovingRight) {
            characterToDraw = playerRightImage;
        } else if (isMovingDown) {
            characterToDraw = playerDownImage;
        } else {
            characterToDraw = playerImage;
        }

        const characterX = (canvas.width / 2) - (characterWidth / 2)
        const characterY = (canvas.height / 2) - (characterHeight / 2) - jumpHeight
        context.drawImage(characterToDraw, characterX, characterY, characterWidth, characterHeight);
        /*
        // 길 위에 장애물과 코인 배치
        placeObstaclesAndCoinsOnRoad();
    */
        // 작은 지도 그리기
        context.strokeStyle = "white"; // 흰색 테두리
        context.strokeRect((canvas.width - minimapSmallWidth - 10),
            (canvas.height - minimapSmallHeight - 10),
            minimapSmallWidth, minimapSmallHeight);

        // 작은 지도에 맵 고정 그리기
        context.save();
        context.beginPath();
        context.rect((canvas.width - minimapSmallWidth - 10), (canvas.height - minimapSmallHeight - 10),
            minimapSmallWidth, minimapSmallHeight);
        context.clip();
        context.drawImage(miniMapImage, (canvas.width - minimapSmallWidth - 10),
            (canvas.height - minimapSmallHeight - 10),
            minimapSmallWidth, minimapSmallHeight);
        //context.drawImage(cityBackgroundImage, canvas.width - minimapSmallWidth - 10, canvas.height - minimapSmallHeight - 10, minimapSmallWidth, minimapSmallHeight);
        context.restore();
        /*
            // 작은 지도에 건물 그리기
            for (const building of buildings) {
              context.fillStyle = "red"; // 빨간색 사각형으로 그리기
              const miniMapBuildingX = canvas.width - minimapSmallWidth - 10 + building.x / mapWidth * minimapSmallWidth;
              const miniMapBuildingY = canvas.height - minimapSmallHeight - 10 + building.y / mapHeight * minimapSmallHeight;
              const miniMapBuildingWidth = building.width / mapWidth * minimapSmallWidth;
              const miniMapBuildingHeight = building.height / mapHeight * minimapSmallHeight;
              context.fillRect(miniMapBuildingX, miniMapBuildingY, miniMapBuildingWidth, miniMapBuildingHeight);
            }
        */
        // 작은 지도에 캐릭터 움직임 표시
        const miniMapX = canvas.width - minimapSmallWidth - 10 + playerX / mapWidth * minimapSmallWidth;
        const miniMapY = canvas.height - minimapSmallHeight - 10 + playerY / mapHeight * minimapSmallHeight;
        context.fillStyle = "blue"; // 파란색 점으로 표시
        context.fillRect(miniMapX, miniMapY, 7, 7);

    };


    const initializeGame = () => {
        playerX = mapWidth / 2;
        playerY = mapHeight / 2;
        gameOver = false;
    };

    initializeGame();


    document.addEventListener("keydown", function (event) {

        if (playerY === 680 && playerX > 470 && playerX < 520 && event.key === "ArrowUp") {
            window.location.href = "./success.html";
            gameOver = true;
        }
        if (playerY === 700 && playerX > 900 && playerX < 950 && event.key === "ArrowDown") {
            window.location.href = "./success.html";
            gameOver = true;
        }
        if (playerX === 700 && playerY > 480 && playerY < 530 && event.key === "ArrowLeft") {
            window.location.href = "./success.html";
            gameOver = true;
        }
        if (playerY === 540 && playerX > 1120 && playerX < 1190 && event.key === "ArrowUp") {
            window.location.href = "./success.html";
            gameOver = true;
        }


        if (gameOver) return; // 게임 오버 상태에서는 움직이지 않음

        if (event.key === " ") {
            window.location.href = "./fail.html";
            gameOver = true;


            /*
            // 스페이스바를 누르면 점프
            if (!isJumping) {
              isJumping = true;
              jumpHeight = 0;

              // 1초 후에 isJumping을 false로 변경
              setTimeout(() => {
                isJumping = false;
              }, 1000);
            }*/
        }


        // 왼쪽으로 이동 시 캐릭터의 방향을 왼쪽으로 설정
        if (event.key === "ArrowLeft") {
            isMovingLeft = true;
            isMovingRight = false;
            isMovingDown = false;

        }

        // 오른쪽으로 이동 시 캐릭터의 방향을 오른쪽으로 설정
        if (event.key === "ArrowRight") {
            isMovingRight = true;
            isMovingLeft = false;
            isMovingDown = false;

        }

        if (event.key == "ArrowUp") {
            isMovingLeft = false;
            isMovingRight = false;
            isMovingDown = false;

        }

        if (event.key == "ArrowDown") {
            isMovingLeft = false;
            isMovingRight = false;
            isMovingDown = true;

        }

        if (event.key == "c") {
            value = 0;
            hpWidth = 300;
        }


        switch (event.key) {
            case "ArrowLeft":
                movePlayer(-moveSpeed, 0);
                break;
            case "ArrowRight":
                movePlayer(moveSpeed, 0);
                break;
            case "ArrowUp":
                movePlayer(0, -moveSpeed);
                break;
            case "ArrowDown":
                movePlayer(0, moveSpeed);
                break;
            case "Space":
                isJumping = true;
                break;
        }


        const updateGame = () => {


            // 게임 오버 상태일 때는 업데이트 중단
            if (gameOver) {
                return;
            }


            // 플레이어 이동 처리
            if (keys.ArrowUp && playerY > 0) {
                playerY -= moveSpeed;
            }
            if (keys.ArrowDown && playerY < mapHeight - characterHeight) {
                playerY += moveSpeed;
            }
            if (keys.ArrowLeft && playerX > 0) {
                playerX -= moveSpeed;
            }
            if (keys.ArrowRight && playerX < mapWidth - characterWidth) {
                playerX += moveSpeed;
            }
            if (keys.Space) {
                isJumping = true;
            }

            // 캐릭터 점프 처리
            if (isJumping) {
                jumpHeight += jumpSpeed;
                playerY -= jumpSpeed;

            }


            /*
                // 충돌 검사
                for (const building of buildings) {
                  if (
                    playerX < building.x + building.width &&
                    playerX + characterWidth > building.x &&
                    playerY < building.y + building.height &&
                    playerY + characterHeight > building.y
                  ) {
                    // 건물과 충돌하면 게임 오버
                    gameOver = true;
                    break;
                  }
                }*/

            // 화면 지우고 다시 그리기
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGame();
            checkSuccess();

            // 게임 루프 반복 호출
            requestAnimationFrame(updateGame);
        };


        drawGame();
    });
});