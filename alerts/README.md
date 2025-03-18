# set up your environment:
mkdir webpage-monitor-test
cd webpage-monitor-test
npm init -y
npm install axios cheerio node-cron nodemailer express

# run the test server:
node test-server.js
This will start a local web server at http://localhost:3000
Optional: Disable email notifications for testing
You can disable email notifications by changing the enabled flag to false in the config:

# run monitor
node monitor.js

# TODO:
- [ ] **follow companies, connect with employees, and log career sites**
- [ ] adjust the 2-second rate limit if we have 80 websites on here (up checks to 30 mins)
- [ ] manage memory for logs
- [ ] put on a lambda instance so we can run this 24/7