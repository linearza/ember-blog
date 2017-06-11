export function initialize( /* application */ ) {
  // application.inject('route', 'foo', 'service:foo');
  if (/Android/.test(navigator.appVersion)) {
    window.addEventListener("resize", function() {
      if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
        document.activeElement.scrollIntoView();
      }
    })
  }

}

export default {
  name: 'field-focus',
  initialize
};
