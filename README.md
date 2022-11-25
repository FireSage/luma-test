# Luma shop test automation


## Setup
Clone the repository
Open the folder in your shell (such as bash or power shell)
Run 
```bash
npm install 
``` 
to install dependencies
Run 
```bash
npm run test
```
to run all tests


To run individual test suites
```bash
npm run test -- --spec ".\test\specs\[filename]"
```

e.g. for order history
```bash
npm run test -- --spec ".\test\specs\orderhistory.e2e.js"
```

for checkout
```bash
npm run test -- --spec ".\test\specs\checkout.e2e.js"
```

for Add to cart
```bash
npm run test -- --spec ".\test\specs\addtocart.e2e.js"
```

for register a new user
```bash
npm run test -- --spec ".\test\specs\register.e2e.js"
```

## Cross-browser testing
The project is configured for cross browser testing. Tests run in Google Chrome by default but changing this to run in other browsers or multiple browsers is simple. 
Browser configuration is stored in the capabilities array starting on line 56.
Simply comment/uncomment the various browser objects to run the test in the desired broswers. e.g to test in Firefox and Safari instead of Chrome simply comment the Chrome object and uncomment the Firefox and safari objects:
```json    capabilities: [{

        //    maxInstances: 5,
        //    browserName: 'chrome',
        //    acceptInsecureCerts: true
        },
            maxInstances: 5,
            browserName: 'firefox',
            acceptInsecureCerts: true
        },
        {
            maxInstances: 5,
            browserName: 'safari',
            acceptInsecureCerts: true
        }
        {
            maxInstances: 5,
            browserName: 'edge',
            acceptInsecureCerts: true
        }
    ], 
```