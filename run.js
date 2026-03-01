const createTestCafe = require('testcafe');

const metaArgIndex = process.argv.indexOf('--test-meta');
const metaValue = metaArgIndex !== -1 ? process.argv[metaArgIndex + 1] : null;

let testcafe = null;

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();

        if (metaValue) {
            const [key, val] = metaValue.split('=');
            runner.filter((testName, fixtureName, fixturePath, testMeta, fixtureMeta) => {
                return testMeta[key] === val || fixtureMeta[key] === val;
            });
            console.log(`Run test with ${key} = ${val}`);
        }

        return runner
            .src(['tests/'])
            .browsers(['chrome'])
            .run({
                skipJsErrors: true,
                quarantineMode: false,
                stopOnFirstFail: false,
                speed: 1
            });
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
        process.exit(failedCount > 0 ? 1 : 0);
    })
    .catch(err => {
        console.error(err);
        if (testcafe) testcafe.close();
        process.exit(1);
    });
