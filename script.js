const video = document.getElementById('video');
const captureBtn = document.getElementById('capture-btn');
const canvas = document.getElementById('canvas');

const context = canvas.getContext('2d');

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
});