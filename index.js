let fireworks = [];
const launchPoint = [];
const gravity = 10;
const strength = 1.5;
let windowWidth = 0;
let windowHeight = 0;
let isInitialised = 0;
const idxX = 0;
const idxY = 1;
const idxDirection = 2;
const idxStrength = 3;
const idxColour = 4;
const idxOffshoot = 5;

(function MainGame() {    

    setInterval(function() {
        Update();
        Draw();
    }, 20);
})();

function Draw() {    
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    //ctx.clearRect(0, 0, windowWidth, windowHeight);
    
    for (let i = 0; i <= fireworks.length - 1; i++) {
        ctx.fillStyle = fireworks[i][idxColour];
        ctx.fillRect(fireworks[i][idxX], fireworks[i][idxY], 1, 1);
    }
}

function Update() {        

    if (isInitialised == 0) {
        onResizeGameWindow();
        return;
    }

    // Launch
    if (Math.floor(Math.random() * 100) == 1) {        
        fireworks.push([...launchPoint, (Math.random() * 4) - 2, strength, getRandomLightHexColor(), 0]);
    }

    // Move
    for (let i = 0; i <= fireworks.length - 1; i++) {

        fireworks[i][idxX] = fireworks[i][idxX] + fireworks[i][idxDirection];
        fireworks[i][idxY] = fireworks[i][idxY] - fireworks[i][idxStrength];
        fireworks[i][idxStrength] = fireworks[i][idxStrength] - (Math.random() * 20) / 1000;
 
        // Explode
        if (fireworks[i][idxStrength] < 0 && fireworks[i][idxOffshoot] == 0) {
            const randomOffshoots = Math.random() * 20;
            for (let j = 0; j <= randomOffshoots; j++) {
                fireworks.push([fireworks[i][idxX], fireworks[i][idxY], (Math.random() * 4) - 2, strength / 4, fireworks[i][idxColour], 1]);            
            }
            fireworks.splice(i, 1);            
        }
    }    
 
}


function onResizeGameWindow() {    
    var canvas = document.getElementById("mainCanvas");
    
    windowWidth = canvas.width;
    windowHeight = canvas.height;

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000"; // Black color
    ctx.fillRect(0, 0, windowWidth, windowHeight);

    launchPoint.push(windowWidth / 2, windowHeight - 5);
    fireworks.length = 0;

    isInitialised = 1;
}

function getRandomLightHexColor() {
    const randomR = Math.floor(Math.random() * 128) + 128; // Random red component (128-255)
    const randomG = Math.floor(Math.random() * 128) + 128; // Random green component (128-255)
    const randomB = Math.floor(Math.random() * 128) + 128; // Random blue component (128-255)
  
    const hexR = randomR.toString(16).padStart(2, '0'); // Convert red to hex
    const hexG = randomG.toString(16).padStart(2, '0'); // Convert green to hex
    const hexB = randomB.toString(16).padStart(2, '0'); // Convert blue to hex
  
    return `#${hexR}${hexG}${hexB}`;
  }
