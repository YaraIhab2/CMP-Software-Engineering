//const { getEmployees } = require("../BE/controllers/employee")

function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button

let submitButton = document.querySelector('[type="submit"]');
submitButton.addEventListener("click", createEmployee);

console.log(submitButton)
// TODO
// add event listener to delete button
//let deleteButtons = document.getElementsByClassName('btn btn-danger btn-sm');
//console.log (deleteButtons)
//for (let i = 0 ; i < deleteButtons.length; i++) {
var clickedDeleteButton = 0
  
document.addEventListener('click', 
function(e) {
  if (e.target.classList.contains('btn') && e.target.classList.contains('btn-danger') && e.target.classList.contains('btn-sm')) {
    // This is a delete button
  console.log('inside Deelete event listener')
     clickedDeleteButton = e.target;
    deleteEmployee();
  }
}


)

// TODO
function createEmployee (){
  console.log ('inside create employee function')
  // get data from input field
  let inputNameElement  = document.getElementById('name');
  let inputIdElement = document.getElementById('id');
// send data to BE
console.log(inputIdElement.value, inputNameElement.value)

 
  fetch('http://localhost:3000/api/v1/employee', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
     },
    body: JSON.stringify (
      {
      id : inputIdElement.value,
      name: inputNameElement.value
      }
    ),
  })

  .then(response => {
    if (response.ok) {
      console.log('Employee is created');
  // call fetchEmployees
  fetchEmployees();
      
    }
    
    
else {
  console.log ('ERROR')
      throw new Error('FAILURE: Employee not created');
     
}
  })
  
  .catch(error => {
    console.error('Error creating employee:', error);
  });
  
  
  

  
}

// TODO
function deleteEmployee (){
  console.log ('inside delete function')
  console.log (clickedDeleteButton)

  // get id
  var row = clickedDeleteButton.closest('tr'); 
  console.log (row)

  const idCell = row.querySelector('td:first-child') 
  console.log (idCell)


  const idToDelete = parseInt(idCell.textContent.trim());

  console.log (idToDelete)
  // send id to BE

  fetch(`http://localhost:3000/api/v1/employee/${idToDelete}` , { 
    method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json'
  //    },
  //  body: JSON.stringify ({id : idToDelete}),
  })

  .then(response => {
    if (response.ok) {
      console.log('Employee is deleted');
  //call fetchEmployees
  // row.parentNode.removeChild(row);
  // clickedDeleteButton.parentNode.removeChild(clickedDeleteButton);
  fetchEmployees();
      
    }
    
    
else {
  console.log ('ERROR')
      throw new Error('FAILURE: Employee not deleted');
     
}
  })
  
  .catch(error => {
    console.error('Error deleting employee:', error);
  });
  
}

fetchEmployees()