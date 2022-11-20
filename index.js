const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const {Knawat} = require('./knawat');
const {User} = require('./user');


(async function main() {
    try{
        const driver = await new Builder().forBrowser(Browser.CHROME).build()
        const user = new User()
        let url = 'knawat.xyz'
        const knawat = new Knawat(driver, url, user)
        // Signup
        await knawat.signup()
        // Create stores
        await knawat.createCatalogiStore()
        await knawat.createWoocommerceStore()
        // Login
        const driver2 = await new Builder().forBrowser(Browser.CHROME).build()
        const knawat2 = new Knawat(driver2, url, user)
        await knawat2.login()

    }catch(err){
        console.log(err.message)
    }finally {
        console.log('Finally...')
    }
})();