import * as cote from 'cote'
import SMS from '../transports/sms'
import { Reply } from '../utils/reply'

const debug = require('debug')('messenger:handlers/signup')

export interface IEvent extends cote.Event {
  id: string
  type: string,
  payload: {
    to: {
      phoneCountry: 'US',
      phoneNumber: string
    }
  }
}

/**
 * Singup successful handler
 * @param event IEvent
 * @param cb callback function
 * @return Promise<void>
 */
export async function success (event: IEvent, cb: Function) {
  debug('Signup event received: ', event)

  try {
    const body = `Yay! You signed up @ ${new Date()}`
    const message = new SMS(event.payload.to.phoneNumber, event.payload.to.phoneCountry, body)

    const outgoing = await message.send()
    debug(outgoing)

    if (outgoing.response.sid) {
      Reply.success(`Signup message ${outgoing.response.sid} was sent.`, event)(cb)
    } else {
      Reply.failure('Error sending message.', outgoing)(cb)
    }
  } catch (err) {
    debug(err)
    Reply.error(err, 'Error sending message.')(cb)
  }
}
