import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

function setCurrentTime(timing) {
  console.log('timing', timing);
  try {
    localStorage.setItem('videoplayer-current-time', timing);
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
}

function getCurrentTime() {
  try {
    return Number(localStorage.getItem('videoplayer-current-time'));
  } catch (error) {
    console.error('Error retrieving from localStorage', error);
    return 0;
  }
}

const throttledSetCurrentTime = throttle(setCurrentTime, 1000, {
  trailing: true,
});

player.on('timeupdate', function (data) {
  throttledSetCurrentTime(data.seconds);
});

player.setCurrentTime(getCurrentTime());
