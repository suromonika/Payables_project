1. Clone the repository.
2. Install dependencies in backend and frontend folders: `npm install`
3. In backend folder create .env file with:
`PORT = 5005
MONGODB_URI = mongodb+srv://<USERNAME>:<PASSWORD>@payables.ucdgwjg.mongodb.net/payables?retryWrites=true&w=majority
CURRENCIES_URI = https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/`

For a test user that cannot add new data entries but can see the dummy data, you can use :
`MONGODB_URI = mongodb+srv://TEST-USER:ljPKAGFoOSv9wO3l@payables.ucdgwjg.mongodb.net/payables?retryWrites=true&w=majority`

4. To run the project: 1. Backend folder: `npm run dev`
                       2. Frontend/client folder: `npm start`

