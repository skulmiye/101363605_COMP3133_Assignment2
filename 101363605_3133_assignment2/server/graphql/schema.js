const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String!
        password: String!
    }

    type Employee {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
    }

    type Query {
        login(usernameOrEmail: String!, password: String!): User
        getAllEmployees: [Employee]!
        searchEmployeeById(eid: ID!): Employee
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User!
        addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee!
        updateEmployee(eid: ID!, first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee!
        deleteEmployee(eid: ID!): Boolean!
    }
`;

module.exports = typeDefs;
