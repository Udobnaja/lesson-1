require('./styles.scss');

import { FEED_DATA } from './js/data';
var images = require.context('./img', true);


if ('content' in document.createElement('template')) {

    const parent = document.querySelector('#feed');

  for (let item of FEED_DATA){
    let template;

    switch (item.size){
      case 's':
        template = document.querySelector('#small-feed-item');
        break;
      case 'm':
        template = document.querySelector('#medium-feed-item');
        break;
      case 'l':
      default:
        template = document.querySelector('#large-feed-item');
        break;
    }

    let title = template.content.querySelector('.feed__title');

    title.textContent = item.title;
    title.style.color = item.titleColor;

    let description;

    if (item.description){
      description = template.content.querySelector('.feed__description');
      description.textContent = item.description;
    //   другой шаблон там где нет тега
    }

    let img;

    if (item.image){
      img = template.content.querySelector('img');
      img.src = item.image;
    }

    let clone = document.importNode(template.content, true);

    parent.appendChild(clone);

  }


}

console.log(FEED_DATA);
