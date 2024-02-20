const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {

  console.log('inside async delete')
  try {
    
 const idParam= req.params.id
console.log('id inside async',idParam )

//employee = employee.filter(empl => empl.id !== id);
const index = employee.findIndex(empl=> empl.id === idParam);

if (index !== -1) {

  employee.splice(index, 1);
  res.status(200).json({ message: "Success! : Employee deleted" });
  
}
} catch (error) {
    console.error('Error deleting employee:', error);
   res.status(500).json({ error: 'ERROR: Employee not deleted' });
   next(error)
  }
 
  
};

// TODO
exports.createEmployee = async (req, res, next) => {
  console.log('inside async create')
  try {
    
 const {id , name}= req.body
console.log(id , name)
 const isDuplicated = employee.some(empl => empl.id === id);
 if (isDuplicated) {
   return res.status(400).json({ error: 'Existing Employee with same ID' });
 }

 employee.push( {id , name});
 
} catch (error) {
    console.error('Error creating employee:', error);
   res.status(500).json({ error: 'ERROR: Employee not created' });
   next(error)
  }
 
  
};