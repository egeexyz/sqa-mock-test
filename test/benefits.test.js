/* eslint no-undef: "off" */
// var assert = require('assert')
const Browser = require('zombie')
const browser = new Browser()
const payChecks = 26
const dependentRate = 500
const baseBenefitRate = 1000

let employee
Browser.localhost('localhost', 8080)

describe('Calculate Standard Benefits', () => {
  beforeEach(async () => {
    employee = {
      firstName: '',
      lastName: '',
      dependants: 0,
      grossPay: 2000,
      netPay: 2000,
      benefitCost: 0
    }
    await Login(browser)
  })
  it('should calculate correctly without dependents', async () => {
    employee.firstName = 'No'
    employee.lastName = 'Dependents'

    await AddEmployee(browser, employee)
    await calculateBenefitCost(employee)
    calculateNetPay(employee)

    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants.toString())
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(7)', parseFloat(employee.benefitCost).toFixed(2))
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(8)', parseFloat(employee.netPay).toFixed(2))
  })
  it('should calculate correctly with multiple dependents', async () => {
    employee.firstName = 'Lotsa'
    employee.lastName = 'Dependents'
    employee.dependants = '8'

    await AddEmployee(browser, employee)
    await calculateBenefitCost(employee)
    calculateNetPay(employee)

    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants.toString())
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(7)', parseFloat(employee.benefitCost).toFixed(2))
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(8)', parseFloat(employee.netPay).toFixed(2))
  })
  it('should scale correctly with negative net pay', async () => {
    employee.firstName = 'Outta'
    employee.lastName = 'Hand'
    employee.dependants = '103'

    await AddEmployee(browser, employee)
    await calculateBenefitCost(employee)
    calculateNetPay(employee)

    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants.toString())
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(7)', parseFloat(employee.benefitCost).toFixed(2))
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(8)', parseFloat(employee.netPay).toFixed(2))
  })
  it('should update correctly when adding dependents', async () => {
    employee.firstName = 'Increasing'
    employee.lastName = 'Dependents'
    employee.dependants = '0'

    await AddEmployee(browser, employee)
    await calculateBenefitCost(employee)
    calculateNetPay(employee)

    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants.toString())
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(7)', parseFloat(employee.benefitCost).toFixed(2))
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(8)', parseFloat(employee.netPay).toFixed(2))

    employee.dependants = '5'

    await browser.click('#employee-table > tbody > tr:nth-child(2) td:nth-child(9) > span#btnEdit')
    await FillEmployeeForm(browser, employee)
    await browser.pressButton('Submit')
    await calculateBenefitCost(employee)
    calculateNetPay(employee)

    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants.toString())
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(7)', parseFloat(employee.benefitCost).toFixed(2))
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(8)', parseFloat(employee.netPay).toFixed(2))
  })
  it('should update correctly when removing dependents', async () => {
    employee.firstName = 'Removing'
    employee.lastName = 'Dependents'
    employee.dependants = '10'

    await AddEmployee(browser, employee)
    await calculateBenefitCost(employee)
    calculateNetPay(employee)

    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants.toString())
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(7)', parseFloat(employee.benefitCost).toFixed(2))
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(8)', parseFloat(employee.netPay).toFixed(2))

    employee.dependants = '9'

    await browser.click('#employee-table > tbody > tr:nth-child(2) td:nth-child(9) > span#btnEdit')
    await FillEmployeeForm(browser, employee)
    await browser.pressButton('Submit')
    await calculateBenefitCost(employee)
    calculateNetPay(employee)

    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants.toString())
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(7)', parseFloat(employee.benefitCost).toFixed(2))
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(8)', parseFloat(employee.netPay).toFixed(2))
  })
})

describe('Calculate Discounted Benefits', () => {
  beforeEach(async () => {
    employee = {
      firstName: '',
      lastName: 'Smith',
      dependants: 0,
      grossPay: 2000,
      netPay: 2000,
      benefitCost: 0
    }
    await Login(browser)
  })
  it('Should give 10% discounts to first names which start with "a"', async () => {
    employee.firstName = 'aaron'

    await AddEmployee(browser, employee)
    await calculateBenefitCost(employee)
    calculateNetPay(employee)

    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants.toString())
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(7)', parseFloat(employee.benefitCost).toFixed(2))
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(8)', parseFloat(employee.netPay).toFixed(2))
  })
  it('Should give 10% discounts to first names which start with uppercase "A"', async () => {
    employee.firstName = 'Aaron'

    await AddEmployee(browser, employee)
    await calculateBenefitCost(employee)
    calculateNetPay(employee)

    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants.toString())
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(7)', parseFloat(employee.benefitCost).toFixed(2))
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(8)', parseFloat(employee.netPay).toFixed(2))
  })
  it('Should give 10% discounts to first names which start with "a" with dependants', async () => {
    employee.firstName = 'Aaron'
    employee.dependants = '11'

    await AddEmployee(browser, employee)
    await calculateBenefitCost(employee)
    calculateNetPay(employee)

    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(5)', employee.dependants.toString())
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(7)', parseFloat(employee.benefitCost).toFixed(2))
    browser.assert.text('#employee-table > tbody > tr:nth-child(2) td:nth-child(8)', parseFloat(employee.netPay).toFixed(2))
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
  await browser.fill('#employees-form .form-group:nth-child(1) .form-control', employee.firstName)
  await browser.fill('#employees-form .form-group:nth-child(2) .form-control', employee.lastName)
  await browser.fill('#employees-form .form-group:nth-child(3) .form-control', employee.dependants)
}

const calculateBenefitCost = (employee) => {
  const dependantCost = employee.dependants * dependentRate
  const benefitCost = baseBenefitRate + dependantCost
  const baseBenefitsCost = benefitCost / payChecks
  const normalizedName = employee.firstName.toLowerCase()

  if (normalizedName.startsWith('a')) {
    const discount = baseBenefitsCost * 0.10
    employee.benefitCost = baseBenefitsCost - discount
  } else {
    employee.benefitCost = baseBenefitsCost
  }
}
const calculateNetPay = (employee) => {
  employee.netPay = employee.grossPay - employee.benefitCost
}
