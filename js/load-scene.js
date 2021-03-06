AFRAME.registerComponent('loadscene', {
  init: function () {
    // load all hotspots and popups so they are under the exit/magic carpet,
    // so they can't be accidentally clicked on before the user loads
    // the scene
    function browserReposition() {
      // hotspots
      var alprHot = document.querySelector('#alpr-hotspot');
      var alprMobileHot = document.querySelector('#alpr-mobile-hotspot');
      var biometricHot = document.querySelector('#biometric-hotspot');
      var bodycamHot = document.querySelector('#bodycam-hotspot');
      var camera1Hot = document.querySelector('#camera1-hotspot');
      var camera2Hot = document.querySelector('#camera2-hotspot');
      var droneHot = document.querySelector('#drone-hotspot');
      var birdHot = document.querySelector('#bird-hotspot');
      var lightHot = document.querySelector('#light-hotspot');
      // popups
      var alprPop = document.querySelector('#alpr-popup');
      var alprMobilePop = document.querySelector('#alpr-mobile-popup');
      var biometricPop = document.querySelector('#biometric-popup');
      var bodycamPop = document.querySelector('#bodycam-popup');
      var camera1Pop = document.querySelector('#camera1-popup');
      var camera2Pop = document.querySelector('#camera2-popup');
      var dronePop = document.querySelector('#drone-popup');
      var birdPop = document.querySelector('#bird-popup');
      var lightPop = document.querySelector('#light-popup');
      // move hotspots to their correct positions
      //
      // these hotspots need to be positioned differently
      // for desktop/mobile, or they appear incorrectly positioned
      // for desktop/mobile
      if ( !AFRAME.utils.device.checkHeadsetConnected() ){
        alprHot.setAttribute('position', { x: 10.379, y: 26.918, z: -7.485 });
        alprMobileHot.setAttribute('position', { x: 3.622, y: 2.229, z: 12.881 });
        bodycamHot.setAttribute('position', { x: -4.420, y: 0.567, z: -6.036 });
        camera1Hot.setAttribute('position', { x: 23.244, y: 58.391, z: -35.322 });
        droneHot.setAttribute('position', { x: -3.999, y: 30.295, z: 28.948 });
        // hotspots positions for headsets/cardboard
      } else {
        alprHot.setAttribute('position', { x: 10.379, y: 26.918, z: -11.27 });
        alprMobileHot.setAttribute('position', { x: 3.622, y: 1.58, z: 8.019 });
        bodycamHot.setAttribute('position', { x: -2.85, y: 0.577, z: -6.036 });
        camera1Hot.setAttribute('position', { x: 23.244, y: 58.391, z: -39.778 });
        droneHot.setAttribute('position', { x: -3.999, y: 33.763, z: 28.948 });
      }
      // these hotspots have the same position regardless of device
      biometricHot.setAttribute('position', { x: -14.982, y: -9.975, z: -25.215 });
      camera2Hot.setAttribute('position', { x: 67.684, y: 28.461, z: 17.549 });
      birdHot.setAttribute('position', { x: 9.039, y: 40, z: 17.084 });
      lightHot.setAttribute('position', { x: -19.031, y: 9.249, z: -8.468 });

      // move popups to their correct positions from beneath the "magic carpet (exit)"
      alprPop.setAttribute('position', { x: 7.482, y: 1.642, z: 0.368 });
      alprMobilePop.setAttribute('position', { x: 4.076, y: 5.453, z: 6.580 });
      biometricPop.setAttribute('position', { x: -8.806, y: 0.992, z: -0.1 });
      bodycamPop.setAttribute('position', { x: -6.627, y: 1.118, z: -4.589 });
      camera1Pop.setAttribute('position', { x: 3.300, y: 2.988, z: -8.154 });
      camera2Pop.setAttribute('position', { x: 7.0, y: 1.4, z: 3.612 });
      dronePop.setAttribute('position', { x: -4.509, y: 3.731, z: 8.831 });
      birdPop.setAttribute('position', { x: 0.5, y: 6.8, z: 10 });
      lightPop.setAttribute('position', { x: -3.026, y: 4.122, z: -0.366 });
    }

    var containerEl = document.getElementById('sts-live');
    var sceneEl = document.querySelector('a-scene');
    var introAudioEl = document.getElementById('intro-audio');
    var ambienceAudio = document.getElementById('ambience');
    var getReady = document.getElementById('get-ready');
    var getStartedButton = document.getElementById('get-started');

    var enterVREl;
    var audioStarted = false;
    var userPressEvent = 'ontouchstart' in window ? 'touchend' : 'mousedown';
    var userPressDown = onUserPressDown.bind(this);
    var sceneLoaded = onSceneLoaded.bind(this);

    function onUserPressDown() {
      if (audioStarted) {
        return;
      }
      introAudioEl.play();
      ambienceAudio.play();
      audioStarted = true;

      if (enterVREl) {
        enterVREl.removeEventListener(userPressEvent, userPressDown);
      }
      sceneEl.removeEventListener(userPressEvent, userPressDown);
    }

    function onSceneLoaded() {
      enterVREl = sceneEl.components['vr-mode-ui'].enterVREl;
      getReady.style.display = 'none';
      introAudioEl.load();
      ambienceAudio.load();
      // start audio after geseture on enter VR button.
      enterVREl.addEventListener(userPressEvent, userPressDown);
      sceneEl.removeEventListener('loaded', onSceneLoaded);
      browserReposition();
    }

    // start audio after user gesture on scene.
    sceneEl.addEventListener(userPressEvent, userPressDown);
    sceneEl.addEventListener('loaded', sceneLoaded);

    // container is only visible once get-started button is clicked.
    getStartedButton.addEventListener('click', function () {
      containerEl.setAttribute('visible', true);
      introAudioEl.pause();
    });

    if (AFRAME.utils.device.isMobile() && !AFRAME.utils.device.isGearVR()){
      containerEl.setAttribute('visible', true);
    }
  }
});
