const form = document.querySelector(".booking-form");

form.addEventListener('submit', async (e) => {

  const submitButton = form.querySelector("button[type='submit']");

  e.preventDefault()

  submitButton.setAttribute("disabled", true);

  const formData = new FormData(e.target);

  const firstName = formData.get("nameFirst");
  const lastName = formData.get("nameLast");
  const phoneNumber = formData.get("Phone no");
  const email = formData.get("email");

  const room = formData.get("Select Room");

  const numberOfAdults = formData.get("adult guest");
  const numberOfChildren = formData.get("child guest");

  const checkInDate = formData.get("Check in date");
  const checkOutDate = formData.get("Check out date");

  const message = formData.get("message");


  try {

    const resp = await fetch('https://alem-server.vercel.app/alem-hotel-booking', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        email,
        room,
        numberOfAdults,
        numberOfChildren,
        checkInDate,
        checkOutDate,
        message,
      })
    })

    const data = await resp.json()
    console.log({ data });

    if (data.success) {
      form.querySelector(".alert-success").removeAttribute("hidden");
    }
  } catch (error) {
      form.querySelector(".alert-danger").innerText = "Oops, Something went wrong!";
      form.querySelector(".alert-danger").removeAttribute("hidden")

    console.log("Error ", error.message);
    
  } finally {
    submitButton.removeAttribute("disabled");
    window.scrollTo({
      top : 0
    })
  }


})