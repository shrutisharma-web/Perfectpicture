






const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const captureControls = document.getElementById('capture-controls');
const reviewControls = document.getElementById('review-controls');

const captureBtn = document.getElementById('capture-btn');
const retakeBtn = document.getElementById('retake-btn');
const keepBtn = document.getElementById('keep-btn');
const instruction = document.getElementById('instruction');

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error('Error accessing camera:', error);
    alert('Unable to access camera. Please allow camera permissions in your browser!');
  });

captureBtn.addEventListener('click', () => {
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  video.classList.add('hidden');
  canvas.classList.remove('hidden');

  captureControls.classList.add('hidden');
  reviewControls.classList.remove('hidden');

  instruction.textContent = 'Do you want to keep this photo or retake it?';
});

retakeBtn.addEventListener('click', () => {
  canvas.classList.add('hidden');
  video.classList.remove('hidden');

  reviewControls.classList.add('hidden');
  captureControls.classList.remove('hidden');

  instruction.textContent = 'Look into your camera and click capture.';
});

keepBtn.addEventListener('click', () => {
  const imageURL = canvas.toDataURL('image/jpeg', 0.95);

  const downloadLink = document.createElement('a');
  downloadLink.href = imageURL;
  downloadLink.download = 'captured-photo.jpg';

  downloadLink.click();
});