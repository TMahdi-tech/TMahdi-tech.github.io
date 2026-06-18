const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add('show');

        }

        /*else{

            entry.target.classList.remove('show');

        }*/

    });

});
 
const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el) => observer.observe(el));
 

//ids from html
 const darkmodetgl =document.getElementById("togglebtn");
 const body = document.body;
 darkmodetgl.addEventListener("click", () =>{
    body.classList.toggle("dark-mode")
 });