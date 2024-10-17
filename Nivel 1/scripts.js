// Asignar las imágenes locales a los bloques
document.getElementById('block1').style.backgroundImage = 'url("./images/1.png")';
document.getElementById('block2').style.backgroundImage = 'url("./images/2.png")';
document.getElementById('block3').style.backgroundImage = 'url("./images/3.png")';
document.getElementById('block4').style.backgroundImage = 'url("./images/4.png")';
document.getElementById('block5').style.backgroundImage = 'url("./images/5.png")';
document.getElementById('block6').style.backgroundImage = 'url("./images/6.png")';
document.getElementById('block7').style.backgroundImage = 'url("./images/7.png")';
document.getElementById('block8').style.backgroundImage = 'url("./images/8.png")';
document.getElementById('block9').style.backgroundImage = 'url("./images/9.png")';

window.onload = function() {
    let parent = document.getElementById('drag');
    let frag = document.createDocumentFragment(); // Crear un fragmento temporal
    let childrenArray = Array.from(parent.children); // Convertir los hijos en un array

    // Mezclar aleatoriamente el array
    while (childrenArray.length) {
        let randomIndex = Math.floor(Math.random() * childrenArray.length);
        frag.appendChild(childrenArray.splice(randomIndex, 1)[0]);
    }

    // Agregar los hijos mezclados de nuevo al contenedor
    parent.appendChild(frag);
};
