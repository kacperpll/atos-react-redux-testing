const db = require('./db.json')

export const getBenefits = () => db.benefits

export const getDepartments = () => db.departments

export const getEmployees = () => db.employees

export const getGeo = () => db.geo

export const getOffices = () => db.offices

export const getProjects = () => db.projects
