const enquiryForm = document.querySelector(".enquiry-form")


enquiryForm.addEventListener("submit", async (e) => {
  const submitButton = enquiryForm.querySelector("button[type='submit']");
  e.preventDefault()

  submitButton.setAttribute("disabled", true);

  const formData = new FormData(e.target);

  const name = formData.get("name");
  const phoneNumber = formData.get("Phone no");

  try {

    const resp = await fetch('https://alem-server.vercel.app/alem-hotel-enquiry', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phoneNumber,
      })
    })

    const data = await resp.json()

    if (data.success) {
      enquiryForm.querySelector(".alert-success").removeAttribute("hidden");
    }
  } catch (error) {
      enquiryForm.querySelector(".alert-danger").innerText = "Oops, Something went wrong!";
      enquiryForm.querySelector(".alert-danger").removeAttribute("hidden")

    console.log("Error ", error.message);
    
  } finally {
    submitButton.removeAttribute("disabled");
   
  }


})
