import { Selector } from 'testcafe';

fixture('Test herokuapp checkboxes')
    .page('https://the-internet.herokuapp.com/')
    .meta('feature', 'herokuapp')
    .meta('tag', 'checkboxes');

test('Check checkboxes on herokuapp', async t => {
    await t.expect(Selector('[class="heading"]').withText('Welcome to the-internet').exists).ok('Main page should be opened');
    await t.click(Selector('li a[href^="/"]').withText('Checkboxes'));

    const checkbox1 = Selector('input[type="checkbox"]').nth(0);
    await t.click(checkbox1);

    const checkbox2 = Selector('input[type="checkbox"]').nth(1);
    await t.click(checkbox2);

    await t.expect(checkbox1.checked).ok('Checkbox 1 should be checked');
    await t.expect(checkbox2.checked).notOk('Checkbox 2 should be unchecked');
}).meta('tag', 'C39');;
