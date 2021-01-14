export default function webApi() {
  let vEvent = 'visibilitychange';

  if (document.webkitHidden != undefined) {
    vEvent = 'webkitvisibilitychange';
  }

  function visibilityChanged() {
    if (document.hidden || document.webkitHidden) {
      document.title = '客官，别走啊~';
    } else {
      document.title = '客官，你又回来了呢~';
    }
  }

  document.addEventListener(vEvent, visibilityChanged, false);
}
