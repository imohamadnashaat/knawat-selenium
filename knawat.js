const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const {User} = require('./user');


class Knawat {
    constructor(driver, url = 'knawat.com', user = new User()) {
        this.driver = driver
        this.url = url
        this.appURL = 'https://app.' + url
        this.passportURL = 'https://passport.' + url
        this.user = user
        this.sleep = s => new Promise(time => setTimeout(time, s * 1000))
    }

    async signup() {
        let signupURL = this.passportURL + '/en/register'
        // Landing page
        await this.driver.get(signupURL);
        await this.driver.wait(until.titleIs('Sign Up'), 10000);
        await this.sleep(1);
        // Auth0 page
        const name = await this.driver.findElement(By.name('name'));
        const email = await this.driver.findElement(By.name('email'));
        const password = await this.driver.findElement(By.name('password'));
        const phone = await this.driver.findElement(By.name('phone'));
        const auth0_login_button = await this.driver.findElement(By.id('mui-4'));
        await this.driver.findElement(By.className('selected-flag')).click()
        await this.driver.findElement(By.className('flag tr')).click()
        // Sned data
        await name.sendKeys(this.user.firstName + ' ' + this.user.lastName);
        await email.sendKeys(this.user.email);
        await password.sendKeys(this.user.password);
        await phone.sendKeys(this.user.phoneNumber)
        await this. sleep(1)
        await auth0_login_button.click();
        // Wait for 2 sec 
        await this.sleep(2);
        this.testData()
    }

    async login() {
        let loginURL = this.passportURL + '/en/login'   
        // Landing page
        await this.driver.get(loginURL);
        await this.driver.wait(until.titleIs('Login'), 10000);
        // # Auth0 page
        const email = await this.driver.findElement(By.name('email'));
        const password = await this.driver.findElement(By.name('password'));
        const auth0_login_button = await this.driver.findElement(By.id('mui-3'));
        await email.sendKeys(this.user.email);
        await password.sendKeys(this.user.password);
        await auth0_login_button.click();
        await this.sleep(20);
        this.testData()
    }

    async createCatalogiStore() {
        const storeURL = this.appURL + '/store/create/catalogi?store='
        let fullStoreURL = ''
        if (this.appURL == 'https://app.knawat.com') {
            fullStoreURL = 'https://' + this.user.timestamp + '.catalogi.net/'
        }
        else {
            fullStoreURL = 'https://' + this.user.timestamp + '.catalogi.xyz/'
        }
        const fullURL = storeURL + fullStoreURL
        await this.driver.switchTo().newWindow('tab');
        await this.driver.get(fullURL);
        await this.sleep(20)
        console.log('Store URL', fullStoreURL)
    }
    
    async createWoocommerceStore() {
        const storeURL = this.appURL + '/store/create/woocommerce?store='
        let fullStoreURL = ''
        fullStoreURL = 'https://' + this.user.timestamp + '.io/'
        const fullURL = storeURL + fullStoreURL
        await this.driver.switchTo().newWindow('tab');
        await this.driver.get(fullURL);
        await this.sleep(20)
        console.log('Store URL', fullStoreURL)
    }
    
    async createCatalogiStorePR(storePR) {
        const storeURL = this.appURL + '/store/create/catalogi_pr?store='
        const fullStoreURL = storePR
        const fullURL = storeURL + fullStoreURL
        await this.driver.switchTo().newWindow('tab');
        await this.driver.get(fullURL);
        await this.sleep(2)
        console.log('Store URL', fullStoreURL)
    }

    testData() {
        console.log('<<< Test data >>>');
        for (const [key, value] of Object.entries(this.user)) {
            console.log(`${key}: ${value}`);
        }
    }
}


module.exports = { Knawat };