const { test, expect } = require('@playwright/test');

test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('nav.navbar');

    const allBooksLink = await page.$('a[href="/catalog"]');

    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "Login" link is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('nav.navbar');

    const loginButton = await page.$('a[href="/login"]');

    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);
});

test('Verify "Register" link is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('nav.navbar');

    const registerButton = await page.$('a[href="/register"]');

    const isRegisterButtonVisible = await registerButton.isVisible();

    expect(isRegisterButtonVisible).toBe(true);
});

test('Verify "All Books" link is visible after user login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'petar@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();

    expect(isAllBooksLinkVisible).toBe(true);
});

test('Verify "My Books" link is visible after login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const myBooksLink = await page.$('a[href="/profile"]');
    const isMyBooksLinkVisible = await myBooksLink.isVisible();

    expect(isMyBooksLinkVisible).toBe(true);
});

test('Verify "Add Book" link is visible after login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const addBookLink = await page.$('a[href="/create"]');
    const isaddBookLinkVisible = await addBookLink.isVisible();

    expect(isaddBookLinkVisible).toBe(true);
});

test('Verify "user email" is visible after login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const userEmail = await page.$('#user span');
    const isUserEmailVisible = await userEmail.isVisible();

    expect(isUserEmailVisible).toBe(true);
});

test('Login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    
    await expect(page).toHaveURL('http://localhost:3000/catalog');
    await expect(page.locator('a[href="/catalog"]')).toBeVisible()
});

test('Login with empty input fields', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await expect(page).toHaveURL('http://localhost:3000/login');
    await expect(page.locator('a[href="/login"]')).toBeVisible();
});

test('Login with empty email field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await expect(page).toHaveURL('http://localhost:3000/login');
});

test('Login with empty password field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await expect(page).toHaveURL('http://localhost:3000/login');
});

test('Register with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    const email = `user${Date.now()}@abv.bg`;

    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    
    await expect(page).toHaveURL('http://localhost:3000/catalog');
    await expect(page.locator('a[href="/catalog"]')).toBeVisible();
});

test('Register with empty input fields', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '');
    await page.fill('input[name="confirm-pass"]', '');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    
    await expect(page).toHaveURL('http://localhost:3000/register');
});

test('Register with empty email field', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '12345');
    await page.fill('input[name="confirm-pass"]', '12345');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    
    await expect(page).toHaveURL('http://localhost:3000/register');
});

test('Register with empty password field', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    await page.fill('input[name="email"]', 'gogo@abv.bg');
    await page.fill('input[name="password"]', '');
    await page.fill('input[name="confirm-pass"]', '12345');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    
    await expect(page).toHaveURL('http://localhost:3000/register');
});

test('Register with empty confirm password field', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    await page.fill('input[name="email"]', 'gogo@abv.bg');
    await page.fill('input[name="password"]', '12345');
    await page.fill('input[name="confirm-pass"]', '');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    
    await expect(page).toHaveURL('http://localhost:3000/register');
});

test('Register with different password fields', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    await page.fill('input[name="email"]', 'gogo@abv.bg');
    await page.fill('input[name="password"]', '12345');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Passwords don\'t match!');
        await dialog.accept();
    });
    
    await expect(page).toHaveURL('http://localhost:3000/register');
});

test('Add book with correct data', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');

    await page.waitForSelector('#create-form');

    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');

    await page.waitForURL('http://localhost:3000/catalog');

    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Add book with empty title field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');

    await page.waitForSelector('#create-form');

    await page.fill('#title', '');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');   
    expect(dialog.message()).toContain('All fields are required!');
    await dialog.accept();
    });

    await expect(page).toHaveURL('http://localhost:3000/create');
});

test('Add book with empty description field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');

    await page.waitForSelector('#create-form');

    await page.fill('#title', 'Test Book');
    await page.fill('#description', '');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');   
    expect(dialog.message()).toContain('All fields are required!');
    await dialog.accept();
    });

    await expect(page).toHaveURL('http://localhost:3000/create');
});

test('Add book with empty image URL field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');

    await page.waitForSelector('#create-form');

    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', '');
    await page.selectOption('#type', 'Fiction');

    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');   
    expect(dialog.message()).toContain('All fields are required!');
    await dialog.accept();
    });

    await expect(page).toHaveURL('http://localhost:3000/create');
});

test('Login and verify all books are displayed', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.waitForSelector(' .dashboard');

    const bookElements = await page.$$(' .other-books-list li');

    expect(bookElements.length).toBeGreaterThan(0);
});

test('Login and verify no books are displayed', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.waitForSelector(' .dashboard');

    const noBooksMessage = await page.textContent(' .no-books');

    expect(noBooksMessage).toBe('No books in database');
});

test('Login and navigate to Details page', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a.button');

    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');
});

test('Guest navigate to Details page', async ({ page }) => {
    await page.goto('http://localhost:3000/catalog');

    const detailsButton = page.locator('.other-books-list a.button');
    await expect(detailsButton.first()).toBeVisible();

    await detailsButton.first().click();

    const bookTitle = page.locator('.book-information h3');
    await expect(bookTitle).toHaveText('Test Book');
});

test('Creator sees Edit and Delete buttons for own book', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    const bookCard = page.locator('.other-books-list li', {
        hasText: 'Outlander'
    });

    await bookCard.locator('a.button').click();

    await expect(page.locator('a[href*="/edit"]')).toBeVisible();
    await expect(page.getByText('Delete')).toBeVisible();
});

test('Non-Creator does not see Edit and Delete buttons', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    const bookCard = page.locator('.other-books-list li', {
        hasText: 'Outlander'
    });

    await bookCard.locator('a.button').click();

    await expect(page.locator('a[href*="/edit"]')).toHaveCount(0);
    await expect(page.getByText('Delete')).toHaveCount(0);
});

test('Non-Creator should see Like button', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    const bookCard = page.locator('.other-books-list li', {
        hasText: 'Outlander'
    });

    await bookCard.locator('a.button').click();

    await expect(page.locator('a.button', { hasText: 'Like' })).toBeVisible();
});

test('Creator should not see Like button', async ({ page }) => {
await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    const bookCard = page.locator('.other-books-list li', {
        hasText: 'Outlander'
    });

    await bookCard.locator('a.button').click();

    await expect(page.locator('a.button', { hasText: 'Like' })).toHaveCount(0);
});

test('Verify visibility of Logout button after user login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    
    const isLogoutLinkVisible = await logoutLink.isVisible();

    expect(isLogoutLinkVisible).toBe(true);
});

test('Verify redirection of Logout link after user login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();

    const redirectedURL = page.url();
    expect(redirectedURL).toBe('http://localhost:3000/catalog');
});