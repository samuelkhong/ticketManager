document.addEventListener('DOMContentLoaded', function () {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    
    // Function to start the camera
    function startCamera() {
        document.getElementById('preview').style.display = "block"

      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
    }

    // Function to stop the camera
    function stopCamera() {
        scanner.stop();
        document.getElementById('preview').style.display = "none"
        
      }
  
    // Attach click event listener to the button
    document.getElementById('startCamera').addEventListener('click', startCamera);
    document.getElementById('stopCamera').addEventListener('click', stopCamera)
  
    scanner.addListener('scan', function (content) {
      // Handle scanned QR code content here
      alert('Scanned: ' + content);
    });
  });
  