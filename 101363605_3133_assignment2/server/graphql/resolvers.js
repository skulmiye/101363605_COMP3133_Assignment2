const User = require('../models/user');
const Employee = require('../models/employee');

const resolvers = {
    Query: {
        // Query | Login | Allow user to access the system
        // http://localhost:8084/graphql/user/login
        login: async (_, { usernameOrEmail, password }) => {
            try {
                const isEmail = usernameOrEmail.includes('@');
                let user;
                if (isEmail) {
                    user = await User.findOne({ email: usernameOrEmail });
                } else {
                    user = await User.findOne({ username: usernameOrEmail });
                }
                if (!user) {
                    return null;
                }
                const isPasswordValid = user.password === password;
                if (!isPasswordValid) {
                    return null;
                }
                return user;
            } catch (error) {
                console.error(error);
                throw new Error('Internal server error');
            }
        },
        // Query | Get all employees | User can get all employee list
        // http://localhost:8084/graphql/emp/employees
        getAllEmployees: async () => {
            try {
                const employees = await Employee.find({});
                return employees;
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching all employees');
            }
        },
        // Query | Search employee by eid | User can get employee details by employee id 
        // http://localhost:8084/graphql/emp/employees
        searchEmployeeById: async (_, { eid }) => {
            try {
                const employee = await Employee.findById(eid);
                if (!employee) {
                    throw new Error(`Employee not found with id ${eid}`);
                }
                return employee;
            } catch (error) {
                console.error(error);
                throw new Error('Error searching employee by ID');
            }
        }
    },
    Mutation: {
        // Mutation | Signup | Allow user to create new account
        // http://localhost:8084/graphql/user/signup
        signup: async (_, { username, email, password }) => {
            try {
                const newUser = new User({ username, email, password });
                await newUser.save();
                return newUser;
            } catch (error) {
                console.error(error);
                throw new Error('Error creating user');
            }
        },
        // Mutation | Add New employee | User can create new employee 
        // http://localhost:8084/graphql/emp/employees
        addEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
            try {
                const newEmployee = new Employee({ first_name, last_name, email, gender, salary });
                await newEmployee.save();
                return newEmployee;
            } catch (error) {
                console.error(error);
                throw new Error('Error adding new employee');
            }
        },
        // Mutation | Update employee by eid | User can update employee details
        // http://localhost:8084/graphql/emp/employees
        updateEmployee: async (_, { eid, first_name, last_name, email, gender, salary }) => {
            try {
                const updatedEmployee = await Employee.findByIdAndUpdate(eid, { first_name, last_name, email, gender, salary }, { new: true });
                if (!updatedEmployee) {
                    throw new Error(`Employee not found with id ${eid}`);
                }
                return updatedEmployee;
            } catch (error) {
                console.error(error);
                throw new Error('Error updating employee by ID');
            }
        },
        // Mutation | Delete employee by eid | User can delete employee by employee id 
        // http://localhost:8084/graphql/emp/employees
        deleteEmployee: async (_, { eid }) => {
            try {
                const deletedEmployee = await Employee.findByIdAndDelete(eid);
                if (!deletedEmployee) {
                    throw new Error(`Employee not found with id ${eid}`);
                }
                return true;
            } catch (error) {
                console.error(error);
                throw new Error('Error deleting employee by ID');
            }
        }
    }
};

module.exports = resolvers;
