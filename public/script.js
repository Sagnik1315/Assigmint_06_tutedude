let cart = {};

function addToCart(service, price) {
  const button = event.target;

  if (!cart[service]) {
    // Add item
    cart[service] = price;

    // Update button text
    button.textContent = "Remove Item ❌";

    button.setAttribute("onclick", `removeFromCart('${service}',${price})`);

  } else {
    alert(service + " already added!");
  }

  renderCart();
}

function removeFromCart(service, price) {
  const button = event.target;

  if (cart[service]) {
    // Remove item
    delete cart[service];

    // Change button text back
    button.textContent = "  Add Item ➕";

    button.setAttribute("onclick", `addToCart('${service}',${price})`);
  }

  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cart");
  const totalEl = document.getElementById("total");

  cartList.innerHTML = "";  // Clear table rows first
  let total = 0;
  let i = 1;

  for (let item in cart) {
    if (item && cart[item]) {  // Only proceed if valid
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i}</td>
        <td>${item}</td>
        <td>₹${cart[item]}</td>
      `;
      cartList.appendChild(tr);
      total += cart[item];
      i++;
    }
  }

  totalEl.textContent = total;
}


// Form submission (optional)
// document.getElementById("booking-Form").addEventListener("submit", function(e) {
//   e.preventDefault();

//   if (Object.keys(cart).length === 0) {
//     alert(
//       "Please add at least one item before booking!"
//     );
//     return;
//   }

//   document.getElementById("confirmation").textContent ="";

//   this.reset();
//   cart = {};
//   renderCart();

//   // Properly reset every service button to Add Item state
//   document.querySelectorAll("#service-list button").forEach(btn => {
//     btn.innerHTML = 'Add Item <span class="icon">➕</span>';
//     const serviceName = btn.getAttribute("data-service");
//     const price = btn.getAttribute("data-price");
//     btn.setAttribute("onclick", `addToCart('${serviceName}', ${price}, this)`);
//   });
// });

// document.getElementById('booking-Form').addEventListener('submit', function(event) {
//   event.preventDefault();

//   let email = document.getElementById("email").value.trim();
//   if (!email ) {
//       alert("Please enter your email!");
//       return;
//   }


//   emailjs.send("service_wduvro9", "template_84w40yp", {
//     to_email: userEmail   // ✅ must match your template variable
//   })
//   .then(function(response) {
//     console.log('SUCCESS!', response.status, response.text);
//     document.getElementById('confirmation').innerText = 
//       "✅ Email sent successfully to " + userEmail;
//   }, function(error) {
//     console.log('FAILED...', error);
//     document.getElementById('confirmation').innerText = 
//       "❌ Something went wrong. Please try again later.";
//   });

//   this.reset();  // reset form after sending
// });

// final
// document.getElementById("booking-Form").addEventListener("submit", function (event) {
//   event.preventDefault();

//   // Check cart
//   if (Object.keys(cart).length === 0) {
//     alert("Please add at least one item before booking!");
//     return;
//   }

//   // Check email
//   const email = document.getElementById("email").value.trim();
//   if (email === "") {
//     alert("Please enter your email!");
//     return;
//   }

//   // Send via EmailJS
//   emailjs.send("service_wduvro9", "template_84w40yp", {
//     to_email: email
//   })
//     .then(function (response) {
//       console.log('SUCCESS!', response.status, response.text);
//       document.getElementById('confirmation').innerText =
//         "✅ Email sent successfully to " + email;
//     }, function (error) {
//       console.log('FAILED...', error);
//       document.getElementById('confirmation').innerText =
//         "❌ Something went wrong. Please try again later.";
//     });

//   // Reset
//   this.reset();
//   cart = {};
//   renderCart();
// });
document.getElementById("booking-Form").addEventListener("submit", function (event) {
  event.preventDefault();

  // ✅ Check if cart has items
  if (Object.keys(cart).length === 0) {
    const confirmBox = document.getElementById('confirmation');
    confirmBox.className = "error";
    confirmBox.innerHTML = `
      <ion-icon name="information-circle-outline"></ion-icon>
      <span>Add the items to the cart to book</span>
    `;
    return;
  }

  // ✅ Get form data
  const name = document.querySelector('input[placeholder="John Doe"]').value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.querySelector('input[placeholder="0000000000"]').value.trim();

  // ✅ Validate form (see next section for details)
  if (!name || !email || !phone) {
    alert("Please fill in all fields!");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number!");
    return;
  }

  // ✅ Create order summary
  let orderDetails = "";
  let total = 0;
  Object.entries(cart).forEach(([service, price]) => {
    orderDetails += `${service}: ₹${price}\n`;
    total += price;
  });

  const message = `
    🧺 Laundry Booking Details
    --------------------------
    Name: ${name}
    Email: ${email}
    Phone: ${phone}

    Services Selected:
    ${orderDetails}
    --------------------------
    Total Amount: ₹${total}
  `;

  // ✅ Send via EmailJS
  emailjs.send("service_wduvro9", "template_84w40yp", {
    to_email: email,
    from_name: name,
    message: message
  })
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      document.getElementById('confirmation').innerHTML =
        `<span style="color:green;">✅ Thank you for booking the service. We will get back to you soon!</span>`;
    }, function (error) {
      console.log('FAILED...', error);
      document.getElementById('confirmation').innerHTML =
        `<span style="color:red;">❌ Something went wrong. Please try again later.</span>`;
    });

  // ✅ Reset form and cart
  this.reset();
  cart = {};
  renderCart();

  // ✅ Reset “Add Item” buttons
  document.querySelectorAll("#service-list button").forEach(btn => {
    btn.textContent = "Add Item ➕";
    const onclickAttr = btn.getAttribute("onclick");
    const matches = onclickAttr ? onclickAttr.match(/'(.+?)',(\d+)/) : null;
    if (matches) {
      const serviceName = matches[1];
      const price = matches[2];
      btn.setAttribute("onclick", `addToCart('${serviceName}', ${price})`);
    }
  });
});

// ✅ Newsletter Subscribe Functionality
document.getElementById("subscribe-btn").addEventListener("click", function () {
  const name = document.getElementById("subscriber-name").value.trim();
  const email = document.getElementById("subscriber-email").value.trim();
  const confirmation = document.getElementById("subscribe-confirmation");

  if (!name || !email) {
    confirmation.innerHTML = `<span style="color:red;">⚠️ Please enter both name and email.</span>`;
    return;
  }

  confirmation.innerHTML = `<span style="color:white;">✅ Thank you, ${name}! You’ve successfully subscribed to our newsletter.</span>`;

  // Optional: Clear inputs
  document.getElementById("subscriber-name").value = "";
  document.getElementById("subscriber-email").value = "";
});



// smooth scrool 

$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

