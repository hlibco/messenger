# Messenger

This project is a general purpose messenger service extensible to use multiple transports (SMS / Email). For now, it only implements SMS using Twilio.

It includes an `example/client` that fires an event `signup:successful` handled by the `messenger`. Messenger will send an SMS to the `mock phone number` setup in the `.env` file.


## Features

1. Service discovery (`client` and `messenger` communicate using broadcasting network protocol or fallback to Redis. [cote docs](https://www.npmjs.com/package/cote) )
2. Communication between services (pub/sub) and (req/res)


### Setup

1. Create a `.env` file in the root of the project using `.env-template` as the template. A Twilio account is required.

```
## EXTERNAL SERVICES
## ------------------------------------
MESSENGER_TWILIO_ACCOUNT_SID=B08.....810
MESSENGER_TWILIO_AUTH_TOKEN=728.....62
MESSENGER_SENTRY_DSN=<OPTIONAL>

## MOCK
## ------------------------------------
MESSENGER_MOCK_USER_COUNTRY=US
MESSENGER_MOCK_USER_PHONE_NUMBER=415.....8278
```

2. Install dependencies `yarn install`


### Run

1. Open two terminals
2. Start the service in one terminal (`yarn start`)
3. Execute the client (emmit event) in the other terminal (`yarn client`)

The mock mobile phone number setup in the `.env` file should receive an SMS when the client runs.


### Commands

`yarn scripts` to list all scripts (commands) available

| yarn     | Description                                                               |
|----------|---------------------------------------------------------------------------|
| build    | (Trash and re)build the library                                           |
| client   | Run the example client (setup the `.env` file and `npm start` beforehand)  |
| cov      | Run tests and generate coverage report                                    |
| cov:html | Run tests, generate the HTML coverage report, and open it in a browser    |
| lint     | Lint all typescript source files                                           |
| start    | Start the service                                                         |
| tdd      | Watch source files, rebuild library on changes and run tests on watch mode |
| test     | Test source files without compiling                                        |
| unit     | Build the library, tests and run unit tests                               |


### TODO

Integrate Datadog with Sentry: [Read more](https://sentry.io/integrations/datadog/)
