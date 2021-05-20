// Classifier Variable
let classifier;
// Model URL
let imageModelURL = '/static/model/data/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";


// Load the model first
function preload() {
	classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup () {
	var videoCanvas = createCanvas(document.getElementById("videoContainer").offsetWidth - 50, Math.round((document.getElementById("videoContainer").offsetWidth - 50) * 0.812));
	// Create the video
	video = createCapture(VIDEO);
	video.size(document.getElementById("videoContainer").offsetWidth - 50, Math.round((document.getElementById("videoContainer").offsetWidth - 50)* 0.812));
	video.hide();

	// Move all <canvas> and <video> elements
	console.log(document.querySelector("canvas"));
	document.querySelectorAll("canvas, video").forEach(e => {
		if (e.style.display == 'none') {
			e.remove();
		} else {
			document.getElementById("videoContainer").appendChild(e);
		}
	});

	flippedVideo = ml5.flipImage(video);
	// Start classifying
	classifyVideo();
}

function draw() {
	background(0);
	// Draw the video
	image(flippedVideo, 0, 0);

	// Draw the label
	fill(255);
	textSize(16);
	textAlign(CENTER);
	text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
	flippedVideo = ml5.flipImage(video);
	classifier.classify(flippedVideo, gotResult);
	flippedVideo.remove();
}

// When we get a result
function gotResult(error, results) {
	// If there is an error
	if (error) {
		console.error(error);
		return;
	}
	// The results are in an array ordered by confidence.
	// console.log(results);
	label = results[0].label;
	// Classify again!
	classifyVideo();
}

document.addEventListener('DOMContentLoaded', () => {
	// Resize video canvas on window resize:
	window.addEventListener('resize', () => {
		console.log("W: " + String(document.getElementById("videoContainer").offsetWidth) + " H: " + String(document.getElementById("videoContainer").offsetHeight));
		setup();
	});
});
