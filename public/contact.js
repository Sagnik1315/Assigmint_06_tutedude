document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("JS loaded!");
    const name= document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!name||!email||!message){
      alert("Please fill in all fields!");
      return;
    }
    const emailPat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPat.test(email)){
      alert("Please enter a valid email address!");
      return;
    }
    alert("Thank you for contacting us! We will get back to you soon.");
    this.reset();
    setTimeout(() => {
        window.location.href = "index.html";   // change if your home file name is different
    }, 1000);
  });
//   function showPopup(text){
//     const popup = document.createElement("div");
//     popup.className = "popup";
//     popup.textContent = text;
//     document.body.appendChild(popup);
//     setTimeout(() => {
//       popup.classList.add("visible");
//     }, 10);
//     setTimeout(()=>{
//       popup.classList.remove("visible");
//       setTimeout(()=> popup.remove(),300);
//     },2000);  
//   }
  