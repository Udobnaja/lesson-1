(function () {
    if ('registerElement' in document &&
      'import' in document.createElement('link') &&
      'content' in document.createElement('template')) {
        console.log('platform ready');
    } else {
        const e = document.createElement('script');
        e.src = '/bower_components/webcomponentsjs/webcomponents-hi-sd-ce.min.js';
        document.body.appendChild(e);
    }
})();
