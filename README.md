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