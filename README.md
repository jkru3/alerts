# set up your environment:
mkdir webpage-monitor-test
cd webpage-monitor-test
npm init -y
npm install axios cheerio node-cron nodemailer express

# run the test server:
`node test-server.js`
This will start a local web server at http://localhost:3000 that updates every 30 seconds

# usage
`node monitor.js`

# TODO:
- [ ] figure out if possible to scrape with specified locations
- [ ] ANDURIL -> alphabetizes it's roles. scrape so that you figure out EXACTLY when a role is posted