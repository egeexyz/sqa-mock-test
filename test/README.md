# Functional Test Cases

**Assumptions:**

* There are 26 paychecks in a year
* All employees are paid $2000 per paycheck before deductions
* The cost of benefits is $1000/year for each employee
* Each dependent incurs a cost of $500/year

## Log into application

**Assumptions:**

* Tester has access to valid user credentials
* Test has navigated to the login page

### Able to login as an authorized user

1. Fill in login form with known good user credentials
2. Press "Login" button

*Expected Result:* User is able to log into the application

### Able to login after previous attempt

1. Fill in login form with correct user but invalid password
2. Press "Login" button
3. Ensure validation banner appears
4. Fill in login form with known good user credentials
5. Press "Login" button

*Expected Result:* User is able to log into the application

### Unable to login for empty user

1. Do not fill login form with anything
2. Press "Login" button

*Expected Result:* "Invalid login attempt." banner appears & user is not logged in

### Unable to login for invalid username

1. Fill in login form with known good user credentials
2. Add or remove a character from the username field
3. Press "Login" button

*Expected Result:* "Invalid login attempt." banner appears & user is not logged in

### Unable to login for invalid password

1. Fill in login form with known good user credentials
2. Add or remove a character from the password field
3. Press "Login" button

*Expected Result:* "The password is incorrect" banner appears & user is not logged in

## Calculate Standard Benefits

**Assumptions:**

* Tester has access to employee dashboard
* Tester knows how to create valid employees
* Tester must **not** create employees with first names that start with A or a

General Formula:

* A employee without any dependents should show the benefit cost as **38.46** and as **1961.54**
* A employee with one dependent should show the benefit cost as **57.69** and as **1942.31**

### should calculate correctly without dependents

1. Create a new employee without dependents

*Expected Result:* The benefit cost should reflect the global assumptions

### should calculate correctly with multiple dependents

1. Create a new employee with dependents

*Expected Result:* The benefit cost should reflect the global assumptions

### should scale correctly with negative net pay

1. Create a new employee with greater than 103 dependents

*Expected Result:* The benefit cost should reflect the global assumptions

### should update correctly when adding dependents

1. Create a new employee with dependents
2. Edit the employee & add more dependents

*Expected Result:* The benefit cost should reflect the global assumptions

### should update correctly when removing dependents

1. Create a new employee with dependents
2. Edit the employee & several (or all) dependents

*Expected Result:* The benefit cost should reflect the global assumptions

## Calculate Discounted Benefits

**Assumptions:**

* Tester has access to employee dashboard
* Tester **must** create employees with first names that start with A or a

General Formula + Discount:

* A employee without any dependents should show the benefit cost as **34.62** and as **1965.38**
* A employee with one dependent should show the benefit cost as **51.92** and as **1948.08**

### Should give 10% discounts to first names which start with "a" without dependants

1. Create a new employee with a lowercase a as the first letter of their first name without dependants

*Expected Result:* The benefit cost should reflect the global assumptions + discounts

### Should give 10% discounts to first names which start with uppercase "A" without dependants

1. Create a new employee with a uppercase A as the first letter of their first name without dependants

*Expected Result:* The benefit cost should reflect the global assumptions + discounts

### Should give 10% discounts to first names which start with lowercase "a" with dependants

1. Create a new employee with a lowercase a as the first letter of their first name

*Expected Result:* The benefit cost should reflect the global assumptions + discounts

### Should give 10% discounts to first names which start with lowercase "A" with dependants

1. Create a new employee with a lowercase a as the first letter of their first name

*Expected Result:* The benefit cost should reflect the global assumptions + discounts

### Should give 10% discounts to employees that change their first names to start with "A"

1. Create a new employee without "a" or "A" as the first letter of their first name
2. Verify the discount is not applied
3. Edit the employee and add "a" as the first letter of their first name

*Expected Result:* The benefit cost should reflect the global assumptions + discounts

### Should remove 10% discounts to employees that change their first names to start not with "A"

1. Create a new employee with "a" or "A" as the first letter of their first name
2. Verify the discount is applied
3. Edit the employee and replace the first letter of their first name with a letter other than "A" or "a"

*Expected Result:* The benefit cost should reflect the global assumptions *without* the discounts

## Add Employee

**Assumptions:**

* Tester has access to employee dashboard

### Correctly formated employee

1. Click "Add Employee" button
2. Fill in employee form with valid details
3. Click "Submit" button

*Expected Result:* The new employee appears in the employee table

### Empty employee

1. Click "Add Employee" button
2. Ensure Add Employee form is empty
3. Click "Submit" button

*Expected Result:* The new employee does not appear in the employee table

### Partially filled-out employee

1. Click "Add Employee" button
2. Fill in the "First Name" field but not the "Last Name" field
3. Click "Submit" button

*Expected Result:* The new employee does not appear in the employee table

### Duplicate employees

1. Click "Add Employee" button
2. Fill in employee form with valid details
3. Click "Submit" button
4. Click "Add Employee" button
5. Fill in employee form with the same details as step 2
6. Click "Submit" button

*Expected Result:* The new employee does not appear in the employee table

### Non-Intergers for dependants

1. Click "Add Employee" button
2. Fill in employee form with valid details
3. Add a letter or character to the dependenants field
4. Click "Submit" button

*Expected Result:* The new employee does not appear in the employee table

## Edit Employee

**Assumptions:**

* Tester has access to employee dashboard

### Edit existing employee

1. Click "Add Employee" button
2. Fill in employee form with valid details
3. Click "Submit" button
4. Click the "Edit" wrench icon in the entry for the new employee
5. Change the LastName to something different
6. Click "Submit" button

*Expected Result:* The employee appears in the employee table with the updated LastName

## Delete Employee

**Assumptions:**

* Tester has access to employee dashboard

### Remove existing employee

1. Click "Add Employee" button
2. Fill in employee form with valid details
3. Click "Submit" button
4. Click the "Delete" X icon in the entry for the new employee

*Expected Result:* The employee no longer appears in the employee table
