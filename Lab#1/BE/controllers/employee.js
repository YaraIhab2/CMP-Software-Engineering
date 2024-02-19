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
    
 const {id }= req.body
console.log(id )

employee = employee.filter(employee => employee.id !== id);
 
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
