let form = document.getElementById("loan-form");

form.addEventListener("submit", calculateResults);

function calculateResults(e) {
  e.preventDefault();

  let amount = document.getElementById("amount");
  let interest = document.getElementById("interest");
  let years = document.getElementById("years");
  let monthlyPayment = document.getElementById("monthly-payment");
  let totalPayment = document.getElementById("total-payment");
  let totalInterest = document.getElementById("total-interest");

  let principal = parseFloat(amount.value);
  let calculatedInterest = parseFloat(interest.value / 100 / 12);
  let calculatedPayments = parseFloat(years.value * 12);

  let x = Math.pow(1 + calculatedInterest, calculatedPayments);
  let monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    showError("Please check your numbers");
  }
}

function showError(message) {
  let errorDiv = document.createElement("div");

  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(message));

  let card = document.querySelector(".card");
  let heading = document.querySelector(".heading");

  card.insertBefore(errorDiv, heading);

  setTimeout(function () {
    errorDiv.remove();
  }, 3000);
}
