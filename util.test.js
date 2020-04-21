const {generateText, checkAndGenerate} = require('./util')
const puppeteer = require('puppeteer')

//unit test
//can check more than one in a single unit test
test('should output name and age', ()=> {
    const text = generateText('hairy', 25);
    expect(text).toBe('hairy (25 years old)');
    const text2 = generateText('silly', 30)
    expect(text2).toBe('silly (30 years old)')
})
//testing the opposite
test('opposite_should output name and age', ()=> {
    const opposite = generateText()
    expect(opposite).toBe('undefined (undefined years old)')

})

//integration test
test('should generate a valid text output', ()=> {
    const text = checkAndGenerate('Max', 29);
    expect(text).toBe('Max (29 years old)')
})

//e2e test
test('should create an element with text and correct class', async()=> {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
        
    })
    const page = await browser.newPage()
    await page.goto('C:/Users/Lu Khei/Documents/dev-practices/js-testing-introduction/index.html')
    await page.click('input#name');
    await page.type('input#name', 'Anna')
    await page.click('input#age')
    await page.type('input#age', '23')
    await page.click('#btnAddUser')
    const finalText = await page.$eval('.user-item', el => el.textContent)
    expect(finalText).toBe('Anna (23 years old)')
})

   