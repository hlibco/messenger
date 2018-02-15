import Config from '../config'
import Event from '../event'

const cote = require('cote')({ redis: { url: '//localhost:6379' } })
const debug = require('debug')('messenger:client')

const messengerRequester = new cote.Requester({ name: 'messenger requester', key: 'messenger' })

/**
 * Create and dispatch event
 */
const event = new Event('signup:success', {
  to: {
    /**
     * Do not use the country code (US +1) to guess the country.
     * US and Canada have country code +1.
     *
     * Twilio's outgoing phoneNumber has to be from the same country
     * as the recipient we are reaching out (to lower the cost per SMS).
     *
     * @see https://countrycode.org/
     */
    phoneCountry: Config.get('mock.phone.country'),
    phoneNumber: Config.get('mock.phone.number')
  }
})

debug('Send event: ', event.toObject())

event.send(messengerRequester, response => {
  debug('Messenger response: ', response)
}).catch(err => {
  debug('Error sending event: ', err)
})
