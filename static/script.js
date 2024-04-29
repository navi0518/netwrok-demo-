$(document).ready(function () {
  // Function to handle form submission
  function submitForm(event) {
      event.preventDefault();
      var domain = $("#domainInput").val().trim();

      if (!isValidDomain(domain)) {
          showAlert("Invalid domain. Please enter a valid domain name.", "danger");
          return;
      }

      fetch("/analyze", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ domain: domain }),
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error(response.statusText);
              }
              return response.json();
          })
          .then((data) => {
              if (Object.keys(data).length > 0) {
                  displayResult(data);
                  $("#resultContainer").show(); // Show result container
              } else {
                  $("#resultContainer").hide(); // Hide result container if no results
              }
          })
          .catch((error) => {
              console.error("Error:", error);
              showAlert("An error occurred while analyzing the traffic.", "danger");
          });
  }

  // Submit the form when the form is submitted
  $("#analyzeForm").submit(submitForm);

  function isValidDomain(domain) {
      // Basic domain validation logic
      return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);
  }

  function showAlert(message, type) {
      var alertElement = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
      $("#alertContainer").html(alertElement);
  
      // Hide the alert after 3 seconds
      setTimeout(function () {
          $(".alert").alert("close"); // Close the alert
          $("#alertContainer").empty(); // Remove the alert from the DOM
      }, 3000);
  }

  function displayResult(data) {
      var resultContainer = $("#resultContainer");
      resultContainer.empty();

      // Display the analysis result
      var resultText = $("<p>").text("Analysis Result:");
      resultContainer.append(resultText);

      var resultList = $("<ul>");
      for (var key in data) {
          if (data.hasOwnProperty(key)) {
              var listItem = $("<li>").html(`<strong>${key}:</strong> ${data[key]}`); // Use strong tag for 'key'
              resultList.append(listItem);
          }
      }
      resultContainer.append(resultList);
  }
});
