(function () {
    const currentDocument = document.currentScript.ownerDocument;
    function _createFeedList(self, feed) {
        let feedElement = currentDocument.createElement('feed-item');
        feedElement.data = feed;
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
                let feedElement = _createFeedList(this, feed);
                container.appendChild(feedElement);
            });
        }
    }

    customElements.define('feed-list', FeedList);
})();
