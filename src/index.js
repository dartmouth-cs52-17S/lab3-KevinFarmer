import $ from 'jquery';
import './style.scss';

let i = 0;

setInterval(() => {
  $('#main').html(`You've been on this website for ${i} seconds.`);
  i += 1;
}, 1000);
