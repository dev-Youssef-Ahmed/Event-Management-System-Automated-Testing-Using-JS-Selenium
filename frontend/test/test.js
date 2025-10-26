import { Builder, By, until, Key } from 'selenium-webdriver';
import { expect } from 'chai';
import { ClassNames } from '@emotion/react';

let driver;
const URL = 'http://localhost:3000';

const USER_USERNAME   = 'user100_username';
const USER_EMAIL      = 'user100_email@user.com';
const USER_PASSWORD   = 'user100_password';

const ADMIN_USERNAME  = 'admin_username';
const ADMIN_EMAIL     = 'admin_email@admin.com';
const ADMIN_PASSWORD  = 'admin_password';

const WRONG_EMAIL     = 'wrong_email@wrong.com'
const WRONG_PASSWORD  = 'wrong_password';

const EVENT_TO_BE_DELETED = 0;

/*
 * use describe.only(.....) to run only this test suite
 * use it.only(.....) to run only this test case
*/

describe("Register Page Unit Tests", function () {
  /**************************************** TestSuit Started! ****************************************/

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });
  
  beforeEach(async function () {
    await driver.get(URL);
    
    const registerLink = await driver.findElement(By.xpath('//*[@id="root"]/header/div/a[3]'));
    await registerLink.click();
  });

  after(async function() {
    await driver.quit();
  });

  /****************************
   * Test ID: TestCase1
   * Description: Verify username field is not empty.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it('Should check for username field' , async function () {
    await driver.sleep(500);
    const registerButton = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));
    await registerButton.click();
    
    
    await driver.sleep(1000);
    let errorElement = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div')), 5000);
    expect(await errorElement.getText()).to.equal('Username field is required!');
  });

  /****************************
   * Test ID: TestCase2
   * Description: Verify username field is not empty.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it('Should check that username must be at least 3 characters', async function() {
    const usernameInput         = await driver.findElement(By.id('username'));
    const passwordInput         = await driver.findElement(By.id('password'));
    const emailInput            = await driver.findElement(By.id('email'));
    const confirmPasswordInput  = await driver.findElement(By.id('confirmPassword'));
    const registerButton        = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));

    await usernameInput.sendKeys('us');
    await emailInput.sendKeys(USER_EMAIL);
    await passwordInput.sendKeys(USER_PASSWORD);
    await confirmPasswordInput.sendKeys(USER_PASSWORD);
    await registerButton.click();

    let errorElement = await driver.wait(until.elementLocated(By.className('error-banner')));

    expect(await errorElement.getText()).to.equal('Username field must be at least 3 characters');
  });

  /****************************
   * Test ID: TestCase3
   * Description: Verify password field is not empty.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it('Should check password field is not empty' , async function () {
    const usernameInput   = await driver.findElement(By.id('username'));
    const emailInput      = await driver.findElement(By.id('email'));
    const registerButton  = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));

    await usernameInput.sendKeys(USER_USERNAME);
    await emailInput.sendKeys(USER_EMAIL);
    await registerButton.click();

    let errorElement = await driver.wait(until.elementLocated(By.className('error-banner')));

    expect(await errorElement.getText()).to.equal('Password field is required!');
  });

  /****************************
   * Test ID: TestCase4
   * Description: Verify password is 8 characters or more.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it('Should check that password is 8 characters or more' , async function () {
    const usernameInput         = await driver.findElement(By.id('username'));
    const emailInput            = await driver.findElement(By.id('email'));
    const passwordInput         = await driver.findElement(By.id('password'));
    const confirmPasswordInput  = await driver.findElement(By.id('confirmPassword'));
    const registerButton        = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));

    await usernameInput.sendKeys(USER_USERNAME);
    await emailInput.sendKeys(USER_EMAIL);
    await passwordInput.sendKeys('pass');
    await confirmPasswordInput.sendKeys('pass');
    await registerButton.click();

    let errorElement = await driver.wait(until.elementLocated(By.className('error-banner')));

    expect(await errorElement.getText()).to.equal('Password must be at least 8 characters long!');
  });

  /****************************
   * Test ID: TestCase5
   * Description: Verify password has at least 3 number.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it('Should check that password has at least 3 numbers' , async function () {
    const usernameInput         = await driver.findElement(By.id('username'));
    const emailInput            = await driver.findElement(By.id('email'));
    const passwordInput         = await driver.findElement(By.id('password'));
    const confirmPasswordInput  = await driver.findElement(By.id('confirmPassword'));
    const registerButton        = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));

    await usernameInput.sendKeys(USER_USERNAME);
    await emailInput.sendKeys(USER_EMAIL);
    await passwordInput.sendKeys('password12');
    await confirmPasswordInput.sendKeys('password12');
    await registerButton.click();

    let errorElement = await driver.wait(until.elementLocated(By.className('error-banner')));

    expect(await errorElement.getText()).to.equal('Password must have at least 3 numbers');
  });

  /****************************
   * Test ID: TestCase6
   * Description: Verify passwords are matching.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it('Should check passwords are matching' , async function () {
    const usernameInput         = await driver.findElement(By.id('username'));
    const emailInput            = await driver.findElement(By.id('email'));
    const passwordInput         = await driver.findElement(By.id('password'));
    const confirmPasswordInput  = await driver.findElement(By.id('confirmPassword'));
    const registerButton        = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));

    await usernameInput.sendKeys(USER_USERNAME);
    await emailInput.sendKeys(USER_EMAIL);
    await passwordInput.sendKeys(USER_PASSWORD);
    await confirmPasswordInput.sendKeys(WRONG_PASSWORD);
    await registerButton.click();

    let errorElement = await driver.wait(until.elementLocated(By.className('error-banner')));

    expect(await errorElement.getText()).to.equal("Passwords don't match!");
  });

  /****************************
   * Test ID: TestCase7
   * Description: XXX.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it("should XXX", async function () {
    /* TODO : Check XXX */
  });
  
  /**************************************** TestSuit Ended! ****************************************/
});

describe("Login Page Unit Tests", function () {
  /**************************************** TestSuit Started! ****************************************/

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  beforeEach(async function () {
    await driver.get(URL);
    
    const loginLink = await driver.findElement(By.xpath('//*[@id="root"]/header/div/a[2]'));
    await loginLink.click();
  });

  after(async function() {
    await driver.quit();
  });
  
  /****************************
   * Test ID: TestCase8
   * Description: Verify that an invalid login attempt shows the "Invalid login credentials" error as JS popup.
   * Test Procedure:
   * 1. Enter incorrect username and password,
   * 2. Click login and verify the error message.
   ****************************/
  it('should show "Invalid login credentials" pop-up with incorrect login', async function() {
    const emailInput    = await driver.findElement(By.id(':r0:'));
    const passwordInput = await driver.findElement(By.id(':r1:'));
    const loginButton   = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));
    
    await emailInput.sendKeys(WRONG_EMAIL);
    await passwordInput.sendKeys(WRONG_PASSWORD);
    await loginButton.click();

    await driver.wait(until.alertIsPresent(), 5000);
    let alert       = await driver.switchTo().alert();
    const alertText = await alert.getText();
    await alert.accept();

    expect(alertText).to.equal('Invalid login credentials');
  });

  
  /****************************
   * Test ID: TestCase10
   * Description: Verify an error box-message with blank password field.
   * Test Procedure:
   * 1. Enter email,
   * 2. Leave password empty,
   * 3. Click login and verify the error message.
  ****************************/
 it('Should show error box-message for blank password field', async function() {
   const emailInput    = await driver.findElement(By.id(':r0:'));
   const passwordInput = await driver.findElement(By.id(':r1:'));
   const loginButton   = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));
   
   await emailInput.sendKeys(USER_EMAIL);
   await loginButton.click();
   
   driver.wait(until.elementIsVisible(passwordInput), 1000);
   
   const validationMessage = await passwordInput.getAttribute('validationMessage');
   
   expect(validationMessage).to.equal('Please fill out this field.');
  });
  
  /****************************
   * Test ID: TestCase11
   * Description: Verify an error box-message with blank email field.
   * Test Procedure:
   * 1. Enter password,
   * 2. Leave email Empty,
   * 3. Click login and verify the error message.
  ****************************/
 it('Should Show Error Message for blank Email', async function() {
   const emailInput    = await driver.findElement(By.id(':r0:'));
   const passwordInput = await driver.findElement(By.id(':r1:'));
   const loginButton   = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));
   
   await passwordInput.sendKeys(USER_PASSWORD);
   await loginButton.click();
   
   driver.wait(until.elementIsVisible(emailInput), 1000);
   
   const validationMessage = await emailInput.getAttribute('validationMessage');
   
   expect(validationMessage).to.equal('Please fill out this field.');
  });
  
  /****************************
   * Test ID: TestCase12
   * Description: Verify have access to Admin's dashboard after a valid login.
   * Test Procedure:
   * 1. Enter admin's email,
   * 2. Enter admin's password,
   * 3. Click login,
   * 4. Verify the dashboard page appeared.
  ****************************/
 it("should have access to Admin's dashboard after a valid login", async function () {
   const emailInput    = await driver.findElement(By.id(':r0:'));
   const passwordInput = await driver.findElement(By.id(':r1:'));
   const loginButton   = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));
   
   await emailInput.sendKeys(ADMIN_EMAIL);
   await passwordInput.sendKeys(ADMIN_PASSWORD);
   await loginButton.click();
   
   await driver.sleep(500);
   
   const dashboardOnBar = await driver.findElement(By.xpath('//*[@id="root"]/header/div/a[2]'));
   
   expect(await dashboardOnBar.getText()).to.equal('DASHBOARD');
   
   await driver.sleep(500);
   const logoutButton  = await driver.findElement(By.xpath('//*[@id="root"]/header/div/button'));
   await logoutButton.click();
  });
  
  
  /****************************
   * Test ID: TestCase9
   * Description: Verify a valid user login attempt.
   * Test Procedure:
   * 1. Enter correct username and password,
   * 2. Click login.
   ****************************/
  it('Allow the User to login with valid credentials', async function () {
    const emailInput    = await driver.findElement(By.id(':r0:'));
    const passwordInput = await driver.findElement(By.id(':r1:'));
    const loginButton   = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));
    
    await emailInput.sendKeys(USER_EMAIL);
    await passwordInput.sendKeys(USER_PASSWORD);
    await loginButton.click();
    
    await driver.sleep(500);
    const logoutButton  = await driver.findElement(By.xpath('//*[@id="root"]/header/div/button'));
    expect(await logoutButton.getText()).to.equal('LOGOUT');
  });
  /**************************************** TestSuit Ended! ****************************************/
});

describe("Admin Functionality Unit Tests", function () {
  /**************************************** TestSuit Started! ****************************************/

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  beforeEach(async function () {
    await driver.get(URL);

    const loginLink = await driver.findElement(By.xpath('//*[@id="root"]/header/div/a[2]'));
    await loginLink.click();

    const emailInput    = await driver.findElement(By.id(':r0:'));
    const passwordInput = await driver.findElement(By.id(':r1:'));
    const loginButton   = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));
  
    await emailInput.sendKeys(ADMIN_EMAIL);
    await passwordInput.sendKeys(ADMIN_PASSWORD);
    await loginButton.click();
  });
  
  after(async function() {
    await driver.quit();
  });
  afterEach(async function() {
    const logoutButton = await driver.findElement(By.xpath('//*[@id="root"]/header/div/button'));
    await logoutButton.click();
  });

  /****************************
   * Test ID: TestCase14
   * Description: Verify Dashboard page visited.
   * Test Procedure:
   * 1. Enter incorrect username and password,
   * 2. Click login and verify the error message.
   ****************************/
  it("should confirm Dashboard page visited", async function () {
    await driver.sleep(500);
    const dashboardButton = await driver.findElement(By.xpath("//a[text()='Dashboard']"));
    await dashboardButton.click();

    await driver.sleep(1000);
   
    const pageTitle = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div[2]/h4'));
    expect(await pageTitle.getText()).to.equal('Create New Event');
  });

  /****************************
   * Test ID: TestCase15
   * Description: Verify admin is allowed to create an event.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it("should allow admin to create an event", async function () {
    await driver.sleep(500);
    const initialEventsCounter  = await driver.findElements(By.xpath('//button[text()="Delete"]'));
    const dashboardButton       = driver.findElement(By.xpath("//a[text()='Dashboard']"));
    await dashboardButton.click();

    await driver.sleep(500);
    const eventNameInput    = await driver.findElement(By.id(':r2:'));
    const descriptionInput  = await driver.findElement(By.id(':r3:'));
    const dateInput         = await driver.findElement(By.id(':r4:'));
    const timeInput         = await driver.findElement(By.id(':r5:'));
    const locationInput     = await driver.findElement(By.id(':r6:'));
    const createEventButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div[2]/form/div/div[6]/button'));

    await driver.sleep(500);
    await eventNameInput.sendKeys('Breadfast Event');
    await descriptionInput.sendKeys('Welcome to Breadfast !');
    await dateInput.sendKeys('2801');
    await driver.sleep(50);
    await dateInput.sendKeys(Key.ARROW_RIGHT);
    await dateInput.sendKeys('2025');
    await timeInput.sendKeys('10:59AM');
    await locationInput.sendKeys('Cairo, Egypt');
    await createEventButton.click();

    await driver.sleep(500);

    const finalEventsCounter = await driver.findElements(By.xpath('//button[text()="Delete"]'));
    expect(finalEventsCounter.length).to.equal((initialEventsCounter.length)+1);
  });


  /****************************
   * Test ID: TestCase16
   * Description: Verify admin can delete an existing event.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it('should delete an existing event', async function() {
    await driver.sleep(500);
    const initialDeleteButtons = await driver.findElements(By.xpath('//button[text()="Delete"]'));
    await initialDeleteButtons[EVENT_TO_BE_DELETED].click();

    await driver.sleep(1000);
    
    const currentDeleteButtons = await driver.findElements(By.xpath('//button[text()="Delete"]'));    
    expect(currentDeleteButtons.length).to.equal(((initialDeleteButtons.length)-1));
  });

  /****************************
   * Test ID: TestCase17
   * Description: Verify show a clear message at home page when there is no events.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it('should show a clear message at home page when there is no events', async function () {
    await driver.sleep(1000);

    let DeleteButtonsCounter = await driver.findElements(By.xpath('//button[text()="Delete"]'));
    
    while(DeleteButtonsCounter.length > 0){
      await DeleteButtonsCounter[0].click();
      await driver.sleep(1000);
      DeleteButtonsCounter = await driver.findElements(By.xpath('//button[text()="Delete"]'));
    }
    
    const messageNoEvents = await driver.findElement(By.xpath("//p[text()='No Events Found']"));
    expect(await messageNoEvents.getText()).to.equal('No Events Found');
  });

  /**************************************** TestSuit Ended! ****************************************/
});

describe("User Functionality Unit Tests", function () {
  /**************************************** TestSuit Started! ****************************************/

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  beforeEach(async function () {
    await driver.get(URL);
  });

  after(async function() {
    await driver.quit();
  });

  /****************************
   * Test ID: TestCase19
   * Description: Verify XXX.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it('should confirm number of events in users page equal to them in admins page', async function(){
    const loginLink = await driver.findElement(By.xpath('//*[@id="root"]/header/div/a[2]'));
    await loginLink.click();

    const emailInput    = await driver.findElement(By.id(':r0:'));
    const passwordInput = await driver.findElement(By.id(':r1:'));
    const loginButton   = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));
  
    await emailInput.sendKeys(ADMIN_EMAIL);
    await passwordInput.sendKeys(ADMIN_PASSWORD);
    await loginButton.click();

    await driver.sleep(500);
    const adminEventsCounter  = await driver.findElements(By.xpath('//button[text()="DELETE"]'));
    const logoutButton        = await driver.findElement(By.xpath('//*[@id="root"]/header/div/button'));
    await logoutButton.click();
  
    await driver.sleep(500);

    const emailUserInput    = await driver.findElement(By.id(':r2:'));
    const passwordUserInput = await driver.findElement(By.id(':r3:'));
    const loginUserButton   = await driver.findElement(By.xpath('//button[@type="submit"]'));


    await emailUserInput.sendKeys(USER_EMAIL);
    await passwordUserInput.sendKeys(USER_PASSWORD);
    await loginUserButton.click();

    const rsvpsAvailableCounter = await driver.findElements(By.xpath("//button[text()='RSVP']"));
    const rsvpsDoneCounter      =  await driver.findElements(By.xpath("//p[contains(text(), 'You have RSVPed to this event.')]"));

    expect((rsvpsAvailableCounter.length + rsvpsDoneCounter.length)).to.equal(adminEventsCounter.length);
  });

  /****************************
   * Test ID: TestCase20
   * Description: Verify XXX.
   * Test Procedure:
   * 1. ,
   * 2. .
   ****************************/
  it.only('should ensure that a RSVP done', async function(){

    // beforeEach
    const loginLink = await driver.findElement(By.xpath('//*[@id="root"]/header/div/a[2]'));
    await loginLink.click();
    
    let emailInput    = await driver.findElement(By.id(':r0:'));
    let passwordInput = await driver.findElement(By.id(':r1:'));
    let loginButton   = await driver.findElement(By.xpath('//*[@id="root"]/div/form/button'));
    
    await emailInput.sendKeys(USER_EMAIL);
    await passwordInput.sendKeys(USER_PASSWORD);
    await loginButton.click();
    
    await driver.sleep(500);
    let rsvpsDoneInitialCounter =  await driver.findElements(By.xpath("//button[text()='RSVP']"));

    if(rsvpsDoneInitialCounter.length === 0){
      // log out from user acc.
      const logoutButton        = await driver.findElement(By.xpath('//*[@id="root"]/header/div/button'));
      await logoutButton.click();
      await driver.sleep(500);
      await driver.navigate().refresh();
      await driver.sleep(500);

      // log in from admin acc.
      await emailInput.sendKeys(ADMIN_EMAIL);
      await passwordInput.sendKeys(ADMIN_PASSWORD);
      await loginButton.click();
      await driver.sleep(500);
      
      // Press dashboard button
      const dashboardButton = driver.findElement(By.xpath("//a[text()='Dashboard']"));
      await dashboardButton.click();
      await driver.sleep(500);
      const eventNameInput    = await driver.findElement(By.id(':r2:'));
      const descriptionInput  = await driver.findElement(By.id(':r3:'));
      const dateInput         = await driver.findElement(By.id(':r4:'));
      const timeInput         = await driver.findElement(By.id(':r5:'));
      const locationInput     = await driver.findElement(By.id(':r6:'));
      const createEventButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div[2]/form/div/div[6]/button'));
      await driver.sleep(500);
      await eventNameInput.sendKeys('Breadfast Event');
      await descriptionInput.sendKeys('Welcome to Breadfast !');
      await dateInput.sendKeys('2801');
      await driver.sleep(50);
      await dateInput.sendKeys(Key.ARROW_RIGHT);
      await dateInput.sendKeys('2025');
      await timeInput.sendKeys('10:59AM');
      await locationInput.sendKeys('Cairo, Egypt');
      await createEventButton.click();
      await driver.sleep(500);

      // log out from admin acc.
      const adminLogoutButton = await driver.findElement(By.xpath('//*[@id="root"]/header/div/button'));
      await adminLogoutButton.click();
      await driver.sleep(500);

      // log in from user acc.
      await emailInput.sendKeys(USER_EMAIL);
      await passwordInput.sendKeys(USER_PASSWORD);
      await loginButton.click();
      await driver.sleep(500); 
    }

    await driver.sleep(500);
    rsvpsDoneInitialCounter =  await driver.findElements(By.xpath("//button[text()='RSVP']"));
    await rsvpsDoneInitialCounter.click();
    
    await driver.sleep(500);
    
    const rsvpsDoneFinalCounter =  await driver.findElements(By.xpath("//button[text()='RSVP']"));
    expect(rsvpsDoneFinalCounter.length).to.equal((rsvpsDoneInitialCounter.length)-1);

    const rsvpConfirmBox = await driver.findElement(By.className('MuiAlert-message css-zioonp-MuiAlert-message'));

    await driver.wait(until.elementIsVisible(rsvpConfirmBox), 5000);

    expect(await rsvpConfirmBox.getText()).to.equal('RSVP Confirmed!');
  });

  /**************************************** TestSuit Ended! ****************************************/
});