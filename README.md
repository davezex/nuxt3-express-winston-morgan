# SETUP
```bash
yarn install
yarn dev
```

## Testing
While app is running:
- in your console you should see "Server running on port 5000"
- open postman and send a request to "http://localhost:5000/<anything>"
- in you console you should see a log when the request is sent

## Important
- in the logs the words "error, debug, info, warn" are not based on the request/response status
- currently they are set based on the request method to display log options