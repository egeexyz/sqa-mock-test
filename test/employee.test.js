/* eslint no-undef: "off" */
// var assert = require('assert')
const Browser = require('zombie')
Browser.localhost('localhost', 8080)

// describe('Add Employee', () => {
//   const browser = new Browser()
//   let employee
//   beforeEach(async () => {
//     employee = {
//       firstName: '',
//       lastName: '',
//       dependants: ''
//     }
//     await Login(browser)
//   })
//   it('Should add correctly formated employee', async () => {
//     employee.firstName = 'Test'
//     employee.lastName = 'Ering'
//     employee.dependants = '2'

//     await browser.assert.elements('.table-striped tbody tr', 1)
//     await AddEmployee(browser, employee)
//     browser.assert.text('#employee-table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)', employee.firstName)
//     browser.assert.text('#employee-table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)', employee.lastName)
//     browser.assert.text('#employee-table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)', employee.dependants)
//     await browser.assert.elements('.glyphicon-wrench', 2)
//   })
//   it('Should add correctly calculate discounts employee', async () => {
//     employee.firstName = 'Test'
//     employee.lastName = 'Ering'
//     employee.dependants = '2'

//     await browser.assert.elements('.table-striped tbody tr', 1)
//     await AddEmployee(browser, employee)
//     await browser.assert.elements('.glyphicon-wrench', 2)
//   })
//   it('Should not allow empty employee', async () => {
//     await browser.assert.elements('.glyphicon-wrench', 1)
//     await AddEmployee(browser, employee)
//     // browser.assert.elements('.glyphicon-wrench', 1)
//   })
//   it('Should not add partially filled-out employee', async () => {
//     employee.firstName = 'testering'

//     await browser.assert.elements('.glyphicon-wrench', 1)
//     await AddEmployee(browser, employee)
//     // await browser.assert.elements('.glyphicon-wrench', 1)
//   })
//   it('Should not allow duplicate employees', async () => {
//     employee.firstName = 'Zack'
//     employee.lastName = 'Siler'
//     employee.dependants = 1

//     await browser.assert.elements('.table-striped tbody tr', 1)
//     await AddEmployee(browser, employee)
//     // await browser.assert.elements('.glyphicon-wrench', 1)
//   })
//   it('Should not allow letters as dependants', async () => {
//     employee.firstName = 'Johnny'
//     employee.lastName = 'Smith'
//     employee.dependants = 'a'

//     await browser.assert.elements('.table-striped tbody tr', 1)
//     await AddEmployee(browser, employee)
//     // await browser.assert.elements('.glyphicon-wrench', 1)
//   })

//   // Business Requirements Below

//   it('Should not allow employee first names which start with lowercase a', async () => {
//     employee.firstName = 'aaron'
//     employee.lastName = 'Smith'
//     employee.dependants = '1'

//     await browser.assert.elements('.table-striped tbody tr', 1)
//     await AddEmployee(browser, employee)
//     // await browser.assert.elements('.glyphicon-wrench', 1)
//   })
//   it('Should not allow employee first names which start with uppercase A', async () => {
//     employee.firstName = 'Aaron'
//     employee.lastName = 'Smith'
//     employee.dependants = '1'

//     await browser.assert.elements('.table-striped tbody tr', 1)
//     await AddEmployee(browser, employee)
//     // await browser.assert.elements('.glyphicon-wrench', 1)
//   })
// })

describe('Edit Employee', () => {

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
  it('Should remove employee', async () => {
    employee.firstName = 'Remove'
    employee.lastName = 'Me'
    employee.dependants = '3'

    await AddEmployee(browser, employee)
    await browser.assert.text('#employee-table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)', employee.firstName)
    // await browser.click('#employee-table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(9) >span#btnDelete')
    // browser.assert.elements('.glyphicon-wrench', 1)
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
  await browser.fill('#employees-form .form-group:nth-child(1) .form-control', employee.firstName)
  await browser.fill('#employees-form .form-group:nth-child(2) .form-control', employee.lastName)
  await browser.fill('#employees-form .form-group:nth-child(3) .form-control', employee.dependants)
  await browser.pressButton('Submit')
}
