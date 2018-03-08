const template = document.createElement('template');

export class FeedCard extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  render(data){

  }
}

window.customElements.define('feed-card', FeedCard);