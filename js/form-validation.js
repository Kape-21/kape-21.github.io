document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");
  if (!form) return;

  const fields = ["name", "age", "phone", "symptoms"];
  const emailField = document.getElementById("email");
  const messageBox = document.getElementById("form-message");

  function showError(input, message) {
    const error = input.parentElement.querySelector(".error-msg");
    if (error) {
      error.textContent = message;
      error.classList.remove("hidden");
    }
    input.classList.add("border-rose-500");
  }

  function clearError(input) {
    const error = input.parentElement.querySelector(".error-msg");
    if (error) {
      error.classList.add("hidden");
    }
    input.classList.remove("border-rose-500");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    fields.forEach((id) => {
      const input = document.getElementById(id);
      if (!input) return;
      const value = input.value.trim();
      if (!value) {
        showError(input, "This field is required.");
        valid = false;
      } else {
        clearError(input);
      }
    });

    const phone = document.getElementById("phone");
    if (phone) {
      const value = phone.value.trim();
      if (value && value.length < 8) {
        showError(phone, "Please enter a valid phone number.");
        valid = false;
      }
    }

    if (emailField && emailField.value.trim()) {
      const value = emailField.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        showError(emailField, "Please enter a valid email.");
        valid = false;
      } else {
        clearError(emailField);
      }
    }

    if (!valid) {
      if (messageBox) {
        messageBox.textContent = "Please correct the highlighted fields.";
        messageBox.className = "text-xs mt-1 text-rose-600";
        messageBox.classList.remove("hidden");
      }
      return;
    }

    if (messageBox) {
      messageBox.textContent =
        "Thank you. Your details have been captured. Our team will contact you shortly.";
      messageBox.className = "text-xs mt-1 text-emerald-600";
      messageBox.classList.remove("hidden");
    }

    form.reset();
  });
});
