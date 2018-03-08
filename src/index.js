require('./styles.scss');

import { FEED_DATA } from './js/data';
import { FEED_TYPES } from "./js/feed-types";

if ('content' in document.createElement('template')) {

  const parent = document.querySelector('#feed');
  const template = document.querySelector('#feed-card');

  for (let item of FEED_DATA){
    let container = template.content.querySelector('.feed__item').cloneNode(true);
    container.classList.add(FEED_TYPES[item.size]);


    let title = container.querySelector('.feed__title');

    title.textContent = item.title;
    title.style.color = item.titleColor;

    let description = container.querySelector('.feed__description');

    if (item.description){
      if (description){
        description.textContent = item.description;
        if(!item.image){
          container.classList.add(`${FEED_TYPES[item.size]}_text`);
        }
      }
    } else {
      description.remove();
    }

    let img = container.querySelector('picture');

    if (item.image){
      let [imageName, imageExt] = item.image.split('.');
      let picture = `
            <source srcset="${imageName}@2x.${imageExt}" 
                media="(min-width: 500px)">
            <source srcset="${imageName}@3x.${imageExt}" 
                media="(min-width: 700px)">
            <img src="${item.image}"
                 srcset="${imageName}@2x.${imageExt} 2x, ${imageName}@3x.${imageExt} 3x"
                 alt="${item.title}">`;
      img.innerHTML = picture;
    } else {
      img.remove();
    }

    let clone = document.importNode(container, true);

    parent.appendChild(clone);

  }

}

