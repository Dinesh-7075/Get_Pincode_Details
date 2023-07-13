let postalCodeDataByName = [];

async function fetchPincodeDetails() {
  let postOfficeBranchName;
  function userInput() {
    postOfficeBranchName = document.getElementById("searchInput").value.trim();
  }
  userInput();
  //   console.log(postOfficeBranchName);

  let endpoint = `https://api.postalpincode.in/postoffice/${postOfficeBranchName}`;

  if (postOfficeBranchName != null) {
    const nullPincode = document.getElementById("nullPincode");
    const SearchFilter = document.getElementById("SearchFilter");
    try {
      const response = await fetch(endpoint, { method: "GET" });
      postalCodeDataByName = await response.json();
      console.log(`Postal data fetched for ${postOfficeBranchName}`);
      console.log(postalCodeDataByName);
      renderTable(postalCodeDataByName);
      nullPincode.style.visibility = "hidden";
      SearchFilter.style.visibility = "visible";
    }
    catch {
      nullPincode.style.visibility = "visible";
      SearchFilter.style.visibility = "hidden";
      nullPincode.innerHTML = "Please enter correct Post Office Branch Name......";
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

//search function
const searchInputByName = document.getElementById("SearchFilter");
searchInputByName.addEventListener("keyup", () => {
  const searchTerm = searchInputByName.value.toLowerCase();
  if (searchTerm == "") {
    renderTable(postalCodeDataByName);
    return;
  }
  console.log(postalCodeDataByName, "hello");
  const filteredStudents = postalCodeDataByName[0].PostOffice.filter(function (item) {
    return item.Name.toLowerCase().includes(searchTerm);
  });
  console.log(filteredStudents);
  const newData = [
    {
      PostOffice: filteredStudents,
    },
  ];
  renderTable(newData);
})

/* Coded by DineshReddy */