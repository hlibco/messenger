import test from 'ava'

import SMS from '../../transports/sms'
// import Config from '../../config'
import { CustomError } from '../../errors'

const sms = new SMS('4158889999', 'US', 'Message...', 'default')

test('Valid country and scope', t => {
  const outgoingPhoneNumber = () => sms.getOutgoingPhoneNumber('US')

  t.notThrows(outgoingPhoneNumber)
})

test('Invalid country', t => {
  const error = t.throws(() => {
    sms.getOutgoingPhoneNumber('PT')
  }, CustomError)

  t.is(error.message, 'invalid_country')
})

test('Invalid scope', t => {
  const error = t.throws(() => {
    sms.getOutgoingPhoneNumber('US', 'wrong_scope')
  }, CustomError)

  t.is(error.message, 'scope_has_no_outgoing_phone_number')
})
