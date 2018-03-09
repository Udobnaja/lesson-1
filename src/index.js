
//
// import { FEED_DATA } from './api/feed/data';
// import { FEED_TYPES } from "./js/feed-types";

//
// class FeedCard extends HTMLElement {
//   constructor() {
//     super();
//
//     this.attachShadow({mode: "open"});
//
//     this.shadowRoot.innerHTML = `<slot></slot>`
//   }
//
//   static get observedAttributes() {
//     return [
//       "data",
//     ]
//   }
//
//   connectedCallback(attrName, oldVal, newVal){
//
//   }
// }
//
// customElements.define("feed-card", FeedCard);
//
// if ('content' in document.createElement('template')) {
//
//   const parent = document.querySelector('#feed');
//   const template = document.querySelector('#feed-card');
//
//   for (let item of FEED_DATA){
//     let container = template.content.querySelector('.feed__item').cloneNode(true);
//     container.classList.add(FEED_TYPES[item.size]);
//
//     let description = container.querySelector('.feed__description');
//     let title = container.querySelector('.feed__title');
//     let img = container.querySelector('.feed__img');
//     let chanel = container.querySelector('.feed__chanel');
//
//     title.textContent = item.title;
//     title.style.color = item.titleColor;
//
//     if (item.description){
//       if (description){
//         description.textContent = item.description;
//         if(!item.image){
//           container.classList.add(`${FEED_TYPES[item.size]}_text`);
//         }
//       }
//     } else {
//       description.remove();
//     }
//
//
//     if (item.image){
//       let [imageName, imageExt] = item.image.split('.');
//       let picture = `
//             <source srcset="${imageName}@2x.${imageExt}" media="(max-width: 1280px)">
//             <source srcset="${imageName}@3x.${imageExt}">
//             <img src="${item.image}"
//                  srcset="${imageName}@2x.${imageExt} 2x, ${imageName}@3x.${imageExt} 3x"
//                  alt="${item.title}">`;
//       img.innerHTML = picture;
//     } else {
//       img.remove();
//     }
//
//     if (item.channelName){
//       chanel.textContent = item.channelName;
//     } else {
//       chanel.remove();
//     }
//
//     let clone = document.importNode(container, true);
//
//     parent.appendChild(clone);
//
//   }
//
// }

