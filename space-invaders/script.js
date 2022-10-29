 const mouseOverContainer = document.getElementsByTagName("body")[0];
const element = document.getElementById("element");

mouseOverContainer.onmousemove = function(e) {
  let box = element.getBoundingClientRect();
  let calcY = e.clientX - (box.width / 100000);
    
  element.style.transform  = "rotateY(" + calcY + "deg) ";
}