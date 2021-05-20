document.addEventListener('DOMContentLoaded', () => {
  // Change column size on click
  document.querySelectorAll('#videoFrameSizeSelect button').forEach(btn => {
    btn.addEventListener('click', () => {
      // Change active class
      document.querySelectorAll('#videoFrameSizeSelect button').forEach(b => {
        if(b.classList.contains('active')) {
          b.classList.remove('active');
          btn.classList.add('active');
        }
      });

      let videoContainer = document.getElementById('videoContainer');
      let videoControls = document.getElementById('videoControls');

      // Change column size
      switch (btn.dataset.size) {
        case 'small':
          videoContainer.classList.remove('col-lg-6');
          videoContainer.classList.remove('col-lg-7');
          videoContainer.classList.add('col-lg-5');

          videoControls.classList.remove('col-lg-6');
          videoControls.classList.remove('col-lg-5');
          videoControls.classList.add('col-lg-7');
          break;
        case 'normal':
          videoContainer.classList.remove('col-lg-5');
          videoContainer.classList.remove('col-lg-7');
          videoContainer.classList.add('col-lg-6');

          videoControls.classList.remove('col-lg-5');
          videoControls.classList.remove('col-lg-7');
          videoControls.classList.add('col-lg-6');
          break;
        case 'large':
          videoContainer.classList.remove('col-lg-5');
          videoContainer.classList.remove('col-lg-6');
          videoContainer.classList.add('col-lg-7');

          videoControls.classList.remove('col-lg-6');
          videoControls.classList.remove('col-lg-7');
          videoControls.classList.add('col-lg-5');
          break;
      }

      setup();
    });
  });

  // Play/pause video on click
  document.getElementById('btnPlayPauseVideo').addEventListener('click', () => {
    let btn = document.getElementById('btnPlayPauseVideo');
    if (btn.dataset.status === 'play') {
      videoPaused = true;
      btn.dataset.status = 'pause';
      btn.innerHTML = 'Play';
    } else if (btn.dataset.status === 'pause') {
      videoPaused = false;
      btn.dataset.status = 'play';
      btn.innerHTML = 'Pause';
    }
  });

  // Update refresh rate on input
  document.getElementById('videoRefreshRateSelect').addEventListener('input', () => {
    refreshRate = document.getElementById('videoRefreshRateSelect').value;
    document.getElementById('currentRefreshVideoRate').innerHTML = refreshRate;
  })
});
