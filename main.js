
// var storing mp3 file
song = "";
// preeload function
function preload() {
   song = loadSound("music.mp3");
}

// function used to setup
function setup() {
   // to make canvas
   canvas = createCanvas(600, 500);
   canvas.center();

   video = createCapture("VIDEO");
   video.hide();

   posenet = ml5.poseNet(video, modelLoaded);
   posenet.on('pose', gotPoses);
}
// this is just thing where model loaded is or not is checked
function modelLoaded() {
   console.log('Pose net is not working');
}
// variables
scoreRightwrist = 0;
scoreLeftwrist = 0;

leftwristY = 0;
leftwristX = 0;

rightwristX = 0;
rightwristY = 0;

// To get poses
function gotPoses(results) {
   if (results.length > 0) {
      console.log(results);

      scoreRightwrist = results[0].pose.keypoints[10].score;
      scoreLeftwrist = results[0].pose.keypoints[9].score;

      rightwristX = results[0].pose.rightWrist.x;
      rightwristY = results[0].pose.rightWrist.y;

      leftwristX = results[0].pose.leftWrist.x;
      leftwristY = results[0].pose.leftWrist.y;

      console.log('right wrist X is' + rightwristX + 'right wrist Y is' + rightwristY + 'left wrist X is' + leftwristX + 'left wrist Y is ' + leftwristY);
      console.log('Score left wrist is ' + scoreLeftwrist + 'Right Wrist Score is' + scoreRightwrist);
   }
}
// draw command
function draw() {
   image(video, 0, 0, 600, 500);

   fill('#ff0000');
   stroke('#ff0000');
   if (scoreRightwrist > 0.2) {
       circle(rightWristX, rightWristY, 20);

      if (rightWristY > 0 && rightWristY <= 100) {
         document.getElementById("speed").innerHTML = "Speed = 0.5x";
         song.rate(0.5);
      } else if (rightWristY > 100 && rightWristY <= 200) {
         document.getElementById('speed').innerHTML = "Speed = 1x"
         song.rate(1);
      } else if (rightWristY > 200 && rightWristY <= 300) {
         document.getElementById('speed').innerHTML = "Speed = 1.5x"
         song.rate(1.5);
      } else if (rightWristY > 300 && rightWristY <= 400) {
         document.getElementById('speed').innerHTML = "Speed = 2x"
         song.rate(2);
      } else if (rightWristY > 400) {
         document.getElementById('speed').innerHTML = "Speed = 2.5x"
         song.rate(2.5);
      }
   }

   if (scoreLeftwrist > 0.2) {
      circle(leftwristX, lefxtWristY, 20);
   InNumberLeftWrxistY = Number(leftwristY);
   remove_decimxal = floor(InNumberLeftWristY);
   volume = xremove_decimal / 500;
   document.getElementsByClassName('volume').innerHTML = 'Volume - ' + volume;
   song.setVolume(volume);
   }
}


// to play music set volume , etc.
function play() {
   song.play();
   song.setVolume(1);
   song.rate(1);
}