// Classifier variable
let classifier;
// Model URL
let imageModelURL = '/static/model/data/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Result display
var resultsDisplay = {};


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

	resultsDisplay = {
		correct: {
			span: document.getElementById('percentCorrect'),
			bar: new ProgressBar(document.getElementById('progressCorrect'))
		},
		incorrect: {
			span: document.getElementById('percentIncorrect'),
			bar: new ProgressBar(document.getElementById('progressIncorrect'))
		},
		nomask: {
			span: document.getElementById('percentNoMask'),
			bar: new ProgressBar(document.getElementById('progressNoMask'))
		}
	};

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

	// Display results
	for (let i = 0; i < 3; i++) {
		switch (results[i].label) {
			case "Mask worn correctly":
				resultsDisplay.correct.span.innerHTML = Math.round(results[i].confidence * 100) + '%';
				resultsDisplay.correct.bar.changeProgress(Math.round(results[i].confidence * 100));
				// document.getElementById("percentCorrect").innerHTML = String(Math.round(results[i].confidence * 100)) + '%';
				// document.getElementById("progressCorrect").style.width = '${Math.round(results[i].confidence * 100)}%';
				// document.getElementById("progressCorrect").setAttribute("aria-valuenow", String(Math.round(results[i].confidence * 100)));
				break;
			case "Mask worn incorrectly":
				resultsDisplay.incorrect.span.innerHTML = Math.round(results[i].confidence * 100) + '%';
				resultsDisplay.incorrect.bar.changeProgress(Math.round(results[i].confidence * 100));
				// document.getElementById("percentIncorrect").innerHTML = String(Math.round(results[i].confidence * 100)) + '%';
				// document.getElementById("progressIncorrect").style.width = '${Math.round(results[i].confidence * 100)}%';
				// document.getElementById("progressIncorrect").setAttribute("aria-valuenow", String(Math.round(results[i].confidence * 100)));
				break;
			case "Without mask":
				resultsDisplay.nomask.span.innerHTML = Math.round(results[i].confidence * 100) + '%';
				resultsDisplay.nomask.bar.changeProgress(Math.round(results[i].confidence * 100));
				// document.getElementById("percentNoMask").innerHTML = String(Math.round(results[i].confidence * 100)) + '%';
				// document.getElementById("progressNoMask").style.width = '${Math.round(results[i].confidence * 100)}%';
				// document.getElementById("progressNoMask").setAttribute("aria-valuenow", String(Math.round(results[i].confidence * 100)));
				break;
		}
/*
		if (results[i].label === "Mask worn correctly") {
			document.getElementById("percentCorrect").innerHTML = Math.round(results[i].confidence * 100);
			document.getElementById("progressCorrect").style.width = '${Math.round(results[i].confidence * 100)}%';
			document.getElementById("progressCorrect").setAttribute("aria-valuenow", String(Math.round(results[i].confidence * 100)));
		} else if (results[i].label === "Mask worn incorrectly") {
			document.getElementById("percentIncorrect").innerHTML = Math.round(results[i].confidence * 100);
			document.getElementById("progressIncorrect").style.width = '${Math.round(results[i].confidence * 100)}%';
			document.getElementById("progressIncorrect").setAttribute("aria-valuenow", String(Math.round(results[i].confidence * 100)));
		} else if (results[i].label === "Without mask") {
			document.getElementById("percentNoMask").innerHTML = Math.round(results[i].confidence * 100);
			document.getElementById("progressNoMask").style.width = '${Math.round(results[i].confidence * 100)}%';
			document.getElementById("progressNoMask").setAttribute("aria-valuenow", String(Math.round(results[i].confidence * 100)));
		}
*/
	}
	label = results[0].label;
	// Classify again!
	setTimeout(classifyVideo, 50);
}

document.addEventListener('DOMContentLoaded', () => {
	// Resize video canvas on window resize:
	window.addEventListener('resize', () => {
		setup();
	});
});
