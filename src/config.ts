import { Store } from 'confidence'

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const criteria = {
  env: process.env.NODE_ENV
}

const config = {
  env: process.env.NODE_ENV,
  port: {
    $filter: 'env',
    $default: process.env.MESSENGER_PORT,
    production: process.env.MESSENGER_PORT
  },
  mock: {
    phone: {
      country: process.env.MESSENGER_MOCK_PHONE_COUNTRY,
      number: process.env.MESSENGER_MOCK_PHONE_NUMBER
    }
  },
  phoneNumbers: {
    outgoing: {
      default: {
        US: '+14159094401'
      }
    }
  },
  coverage: {
    countries: ['US']
  },
  sentry: {
    dsn: process.env.MESSENGER_SENTRY_DSN
  },
  twilio: {
    AUTH_TOKEN: process.env.MESSENGER_TWILIO_AUTH_TOKEN,
    ACCOUNT_SID: process.env.MESSENGER_TWILIO_ACCOUNT_SID
  }
}

// Store config in Confindence
const store = new Store(config)
export default {
  get (key) {
    key = '/' + key.replace(/\./g, '/').replace(/^\/+/g, '')
    return store.get(key, criteria)
  },
  meta (key) {
    return store.meta(key)
  }
}
