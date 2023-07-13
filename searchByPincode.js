let postalCodeData = [];
    
async function fetchPincodeDetails() {
  let pincode;
  function userInput() {
    pincode = document.getElementById("searchInput").value.trim();
  }
  userInput();
  // console.log(pincode);
  let endpoint = `https://api.postalpincode.in/pincode/${pincode}`;

  if (pincode != null) {
    const nullPincode = document.getElementById("nullPincode");
    const SearchFilter = document.getElementById("SearchFilter");
    try {
      const response = await fetch(endpoint, { method: "GET" });
      postalCodeData = await response.json();
      console.log(`Postal data fetched for ${pincode}`);
      console.log(postalCodeData);
      renderTable(postalCodeData);
      nullPincode.style.visibility = "hidden";
      SearchFilter.style.visibility = "visible";
    } catch {
      nullPincode.style.visibility = "visible";
      SearchFilter.style.visibility = "hidden";
      nullPincode.innerHTML = "Please enter your Six digit Postal code......";
    }
  }
}

function renderTable(data) {
  console.log(data, "display function called");
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  data.forEach((item) => {
    //  console.log(item);
    item.PostOffice.forEach((loc) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td id="data1" width="20">${loc.Name}</td>
              <td>${loc.District}</td>
              <td>${loc.State}</td>
              <td>${loc.Country}</td>
              <td>${loc.BranchType}</td>
              <td>${loc.Pincode}</td>
                `;
      tableBody.appendChild(row);
    });
  });
}

// //search function
const searchInput = document.getElementById("SearchFilter");
searchInput.addEventListener("keyup", () => {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm == "") {
    renderTable(postalCodeData);
    return;
  }
  console.log(postalCodeData, "hello");
  const filteredStudents = postalCodeData[0].PostOffice.filter(function (item) {
    return item.Name.toLowerCase().includes(searchTerm);
  });
  console.log(filteredStudents);
  const newData = [
    {
      PostOffice: filteredStudents,
    },
  ];
  renderTable(newData);
});

/* Coded by DineshReddy */
