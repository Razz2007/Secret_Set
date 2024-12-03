const buttons = document.querySelectorAll(".text-boton");
const audio = document.getElementById("clickSound");

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        audio.play(); // Reproduce el sonido
        
        if (button.getAttribute("href")) {
            event.preventDefault(); 
            setTimeout(() => {
                window.location.href = button.getAttribute("href");
            }, 300); 
        }
    });
});





