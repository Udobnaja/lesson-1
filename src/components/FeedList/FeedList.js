(function () {
    const currentDocument = document.currentScript.ownerDocument;
    const feedTypes = {
        s: 'feed__item_size_s',
        m: 'feed__item_size_m',
        l: 'feed__item_size_l'
    };

    function _createFeedListElement(self, feed) {
        let feedElement = currentDocument.createElement('article');
        let [img, ext] = (feed.image) ? feed.image.split('.') : '';


        feedElement.className = `feed__item ${feedTypes[feed.size]}`;
        if (!feed.image) {
            feedElement.classList.add(`${feedTypes[feed.size]}_text`);
        }
        feedElement.innerHTML = `
          <h2 class="feed__title" style="color: ${feed.titleColor}">${feed.title}</h2>
          ${(feed.image) ? `<picture class="feed__img">
                                <source srcset="${img}@2x.${ext}" media="(max-width: 1280px)">
                                <source srcset="${img}@3x.${ext}">
                                <img src="${feed.image}"
                                    srcset="${img}@2x.${ext} 2x, ${img}@3x.${ext} 3x"
                                    alt="${feed.title}"></picture>` : ''}
          ${(feed.description) ? `<p class="feed__description">${feed.description}</p>` : ''}
          
          <div class="feed__controls">
             ${feed.channelName ? `<span class="feed__chanel">${feed.channelName}</span>` : ''}
             <div class="feed__control feed__control_more"></div>
             <div class="feed__control feed__control_like"></div>
           </div>
        `;

        return feedElement;
    }

    class FeedList extends HTMLElement {
        constructor() {
            super();

            let _list = [];

            Object.defineProperty(this, 'list', {
                get: () => _list,
                set: (list) => {
                    _list = list;
                    this.render();
                }
            });
        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({mode: 'open'});
            const template = currentDocument.querySelector('#feed-list-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
        }

        render() {
            let container = this.shadowRoot.querySelector('section');
            container.innerHTML = '';

            this.list.forEach(feed => {
                let feedElement = _createFeedListElement(this, feed);
                container.appendChild(feedElement);
            });
        }
    }

    customElements.define('feed-list', FeedList);
})();
