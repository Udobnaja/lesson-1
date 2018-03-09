(function () {
    const currentDocument = document.currentScript.ownerDocument;

    function _fetchAndPopulateData(self) {
        let feedList = self.shadowRoot.querySelector('#feed-list');
        fetch('/api/feed/data.json')
            .then((response) => response.text())
            .then((responseText) => {
                const list = JSON.parse(responseText).feed;
                self.feedList = list;
                feedList.list = list;
            })
            .catch((e) => {
                alert(e);
            });
    }

    class FeedController extends HTMLElement {
        constructor() {
            super();
            this.feedList = [];
        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({mode: 'open'});
            const template = currentDocument.querySelector('#feed-controller-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);

            _fetchAndPopulateData(this);
        }
    }

    customElements.define('feed-controller', FeedController);
})();
