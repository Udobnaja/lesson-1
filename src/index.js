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

    let description;

    if (item.description){
      description = container.querySelector('.feed__description');
      if (description){
        description.textContent = item.description;
      }
    }

    let img;

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
      img = container.querySelector('picture');
      img.innerHTML = picture;
    }

    let clone = document.importNode(container, true);

    parent.appendChild(clone);

  }

}

