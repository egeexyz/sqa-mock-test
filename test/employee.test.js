/* eslint no-undef: "off" */
// var assert = require('assert')
const Browser = require('zombie')
Browser.localhost('localhost', 8080)

describe('Add Employee', () => {
  const browser = new Browser()
  let employee
  beforeEach(async () => {
    employee = {
      firstName: '',
      lastName: '',
      dependants: ''
    }
    await Login(browser)
  })
  it('Should add correctly formated employee', async () => {
    employee.firstName = 'Test'
    employee.lastName = 'Ering'
    employee.dependants = '2'

    await browser.assert.elements('.table-striped tbody tr', 1)
    await AddEmployee(browser, employee)
    browser.assert.text('#employee-table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)', employee.firstName)
    browser.assert.text('#employee-table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)', employee.lastName)
    await browser.assert.elements('.glyphicon-wrench', 2)
  })
  it('Should not allow empty employee', async () => {
    await browser.assert.elements('.glyphicon-wrench', 1)
    await AddEmployee(browser, employee)
    browser.assert.elements('.glyphicon-wrench', 1)
  })
  it('Should not add partially filled-out employee', async () => {
    employee.firstName = 'testering'

    await browser.assert.elements('.glyphicon-wrench', 1)
    await AddEmployee(browser, employee)
    await browser.assert.elements('.glyphicon-wrench', 1)
  })
  it('Should not allow duplicate employees', async () => {
    employee.firstName = 'Zack'
    employee.lastName = 'Siler'
    employee.dependants = 1

    await browser.assert.elements('.table-striped tbody tr', 1)
    await AddEmployee(browser, employee)
    await browser.assert.elements('.glyphicon-wrench', 1)
  })
  it('Should not allow letters as dependants', async () => {
    employee.firstName = 'Johnny'
    employee.lastName = 'Smith'
    employee.dependants = 'a'

    await browser.assert.elements('.table-striped tbody tr', 1)
    await AddEmployee(browser, employee)
    await browser.assert.elements('.glyphicon-wrench', 1)
  })
})

describe('Edit Employee', () => {
  const browser = new Browser()
  beforeEach(async () => {
    employee = {
      firstName: '',
      lastName: '',
      dependants: ''
    }
    await Login(browser)
  })
  it('Should edit existing employee', async () => {
    employee.firstName = 'Zack'
    employee.lastName = 'Siler'
    employee.dependants = '1'

    await browser.assert.text('#employee-table > tbody > tr td:nth-child(2)', employee.firstName)
    await browser.assert.text('#employee-table > tbody > tr td:nth-child(3)', employee.lastName)
    await browser.assert.text('#employee-table > tbody > tr td:nth-child(5)', employee.dependants)

    employee.firstName = 'Zach'
    employee.lastName = 'Sillier'
    employee.dependants = '2'

    await browser.click('#employee-table > tbody > tr td:nth-child(9) > span#btnEdit')
    await FillEmployeeForm(browser, employee)
    await browser.pressButton('Submit')

    await browser.assert.text('#employee-table > tbody > tr td:nth-child(2)', employee.firstName)
    await browser.assert.text('#employee-table > tbody > tr td:nth-child(3)', employee.lastName)
    await browser.assert.text('#employee-table > tbody > tr td:nth-child(5)', employee.dependants)
  })
  it('Should edit new employee', async () => {
    console.warn('This test should be deprecated or updated once canned-data is removed')
    employee.firstName = 'Burger'
    employee.lastName = 'Ville'
    employee.dependants = '2'

    await AddEmployee(browser, employee)

    await browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(2)', employee.firstName)
    await browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(3)', employee.lastName)
    await browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants)

    employee.firstName = 'Five'
    employee.lastName = 'Guys'
    employee.dependants = '5'

    await browser.click('#employee-table > tbody > tr:nth-child(2) td:nth-child(9) > span#btnEdit')
    await FillEmployeeForm(browser, employee)
    await browser.pressButton('Submit')

    await browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(2)', employee.firstName)
    await browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(3)', employee.lastName)
    await browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants)
  })
})

describe('Remove Employee', () => {
  const browser = new Browser()
  beforeEach(async () => {
    employee = {
      firstName: '',
      lastName: '',
      dependants: ''
    }
    await Login(browser)
  })
  it('Should delete employee', async () => {
    employee.firstName = 'Remove'
    employee.lastName = 'Me'
    employee.dependants = '3'

    await AddEmployee(browser, employee)
    await browser.assert.text('#employee-table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)', employee.firstName)
    await browser.click('#employee-table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(9) >span#btnDelete')
    browser.assert.elements('.glyphicon-wrench', 1)
  })
})

const Login = async (browser) => {
  await browser.visit('/login')
  await browser.fill('.form-username', 'testUser')
  await browser.fill('.form-password', 'Test1234')
  await browser.pressButton('#btnLogin')
}

const AddEmployee = async (browser, employee) => {
  await browser.pressButton('#btnAddEmployee')
  await FillEmployeeForm(browser, employee)
  await browser.pressButton('Submit')
}

const FillEmployeeForm = async (browser, employee) => {
  await browser.fill('#employees-form .form-group:nth-child(1) .form-control', employee.firstName)
  await browser.fill('#employees-form .form-group:nth-child(2) .form-control', employee.lastName)
  await browser.fill('#employees-form .form-group:nth-child(3) .form-control', employee.dependants)
}
