muffin = "";
pokemon = "";

score_left_wrist = 0;
score_right_wrist = 0;
song = ""

status1 = false
status2 = false

LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;

function preload() {
    muffin = loadSound("Muffin.mp3");
    pokemon = loadSound("Pokemon.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');

    if (score_left_wrist > 0.005) {
        circle(LeftWristX, LeftWristY, 20);
        if (!muffin.isPlaying()) {
            pokemon.stop();
            muffin.play();
        }
    }

    if (score_right_wrist > 0.005) {
        circle(RightWristX, RightWristY, 20);
        if (!pokemon.isPlaying()) {
            muffin.stop();
            pokemon.play();
        }
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized')
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("left wrist x = " + LeftWristX + "left wrist y = " + LeftWristY + "right wrist x = " + RightWristX + "right wrist y = " + RightWristY)
    }
}