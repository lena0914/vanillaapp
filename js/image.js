const IMAGE_LIST = ["img/1.jpg", "img/2.jpg", "img/3.jpg"];
let currentImg;
let pickedImg;

const pickImg = () => {
  pickedImg = IMAGE_LIST[Math.floor(Math.random() * IMAGE_LIST.length)];
  if (currentImg === pickedImg) {
    return pickImg();
  }
};

const changeImg = () => {
  pickImg();
  document.body.style.backgroundImage = `url(${pickedImg})`;
  currentImg = pickedImg;
  return changeImg;
};

setInterval(changeImg(), 60000);
