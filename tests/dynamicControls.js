import { Selector } from 'testcafe';

fixture('Dynamic Controls')
    .page('https://the-internet.herokuapp.com/')
    .meta('tag', 'C41')

const testData = ['Hello', 'Ne boley'];

testData.forEach(data => {
    test(`Check Dynamic Controls on herokuapp for ${data}`, async t => {
        await t.expect(Selector('[class="heading"]').withText('Welcome to the-internet').exists).ok('Main page should be opened');
        await t.click(Selector('li a[href^="/"]').withText('Dynamic Controls'));

        await t.click(Selector('button[onclick="swapInput()"]'));

        const inputField = Selector('input[type="text"]');

        await t.expect(inputField.hasAttribute('disabled')).notOk({ timeout: 5000 });

        await t.typeText(inputField, data);

        await t.expect(inputField.value).eql(data, `Input field should contain '${data}'`);

        const checkbox = Selector('input[type="checkbox"]').nth(0);
        await t.click(checkbox);

        await t.expect(checkbox.checked).ok('Checkbox 1 should be checked');

        const removeButton = Selector('button[onclick="swapCheckbox()"]').withText('Remove');
        await t.click(removeButton);
        await t.expect(checkbox.exists).notOk('Checkbox 1 should not be present', { timeout: 5000 });

        const message = Selector('p[id="message"]');
        await t.expect(message.textContent).contains("It's gone!", "Message should contain 'It's gone!'");

        const addButton = Selector('button[onclick="swapCheckbox()"]').withText('Add');
        await t.click(addButton);

        await t.expect(checkbox.exists).ok('Checkbox 1 should be present', { timeout: 5000 });

        await t.expect(message.textContent).contains("It's back!", "Message should contain 'It's back!'");
    });
});
