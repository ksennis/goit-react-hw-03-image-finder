import axios from 'axios';

export function fetchImages(imageDescription, page) {

  return  axios.get(`https://pixabay.com/api/?q=${imageDescription}&page=${page}&key=31628127-262f2d43a2a151032d1eaa569&image_type=photo&orientation=horizontal&per_page=12`)
     
  }