const data = {
  employee: require("../models/employees.json"),
  setEmployee: function (data) {
    this.employee = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employee);
};

const createEmployee = (req, res) => {
  const newEmployee = {
    id: data.employee?.length
      ? ++data.employee[data.employee.length - 1].id
      : 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  if (!newEmployee.firstName || !newEmployee.lastName) {
    return res.status(400).json({ message: "first and lastname required" });
  }

  data.setEmployee([...data.employee, newEmployee]);
  res.status(201).json(newEmployee);
};

const updateEmployee = (req, res) => {
  const selectedEmployee = data.employee.find(
    (person) => person.id === req.body.id
  );
  if (!selectedEmployee) {
    return res
      .status(404)
      .json({ message: `employee with id: ${req.body.id} not found` });
  }

  const newEmployee = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }

  const currEmployees = data.employee.filter(
    (person) => person.id !== parseInt(req.body.id)
  );
  const rawNewEmployees = [...currEmployees, newEmployee];

  data.setEmployee(
    rawNewEmployees.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(newEmployee);
};

const deleteEmployee = (req, res) => {
  const selectedEmployee = data.employee.find((person) => person.id === req.body.id)
  if (!selectedEmployee) {
    return res
      .status(404)
      .json({ message: `employee with id ${req.body.id} not found` });
  }
  const currEmployees = data.employee.filter(
    (person) => person.id !== req.body.id
  );
  currEmployees.forEach((person, idx) => {
    person.id = idx + 1;
  });

  data.setEmployee([...currEmployees]);
  res.json(currEmployees);
};

const getEmployeeByID = (req, res) => {
  const selectedEmployee = data.employee.find(
    (person) => person.id === req.params.id
  );
  if (!selectedEmployee) {
    return res
      .status(404)
      .json({ message: `employee with id ${req.body.id} not found` });
  }

  res.json(selectedEmployee);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeByID,
};
