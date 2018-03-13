(function () {
  const currentDocument = document.currentScript.ownerDocument;

  const feedTypes = {
    s: 'feed__item_size_s',
    m: 'feed__item_size_m',
    l: 'feed__item_size_l'
  };

  function _createFeedItem(self, template, data) {
    const titleNode = template.querySelector('.feed__title');
    const channelNode = template.querySelector('.feed__chanel');
    const pictureNode = template.querySelector('.feed__img');
    const descriptionNode = template.querySelector('.feed__description');

    let {title, titleColor, image, size, description, channelName} = data;
    let [img, ext] = (image) ? image.split('.') : '';

    self.className = `feed__item ${feedTypes[size]}`;
    if (!image) {
      self.classList.add(`${feedTypes[size]}_text`);
    }
    titleNode.textContent = title;
    titleNode.style.color = titleColor;

    if (image) {
      let html = `
            <source srcset="${img}@2x.${ext}, ${img}@3x.${ext} 3x" media="(min-width: 768px)">
            <img src="${image}"
                srcset="${img}@2x.${ext} 2x, ${img}@3x.${ext} 3x"
                alt="${title}"></picture>`;

      pictureNode.innerHTML = html;
    } else {
      pictureNode.remove();
    }

    if (description) {
      descriptionNode.textContent = description;
    } else {
      descriptionNode.remove();
    }

    if (channelName) {
      channelNode.textContent = channelName;
    } else {
      channelNode.remove();
    }

    return document.importNode(template, true);
  }

  class FeedItem extends HTMLElement {
    constructor() {
      super();

      let _data = {};

      Object.defineProperty(this, 'data', {
        get: () => _data,
        set: (data) => {
          _data = data;
          this.render();
        }
      });
    }

    render() {
      const template = currentDocument.querySelector('#feed-item-template');
      const cloneTemplate = template.content.cloneNode(true);
      const feedItem = _createFeedItem(this, cloneTemplate, this.data);

      this.appendChild(feedItem);
    }
  }

  customElements.define('feed-item', FeedItem);

})();