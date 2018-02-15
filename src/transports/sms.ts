import * as Joi from 'joi'
import * as Twilio from 'twilio'

import Config from '../config'
import { CustomError } from '../errors'

const debug = require('debug')('messenger:sms')

export interface IMessage {
  to: string
  body: string
  from: string
}

export interface ISend {
  message: IMessage,
  response: any
}

export class SMS {
  private from

  constructor (private to: string, country: string, private body: string, scope: string = 'default') {
    // Do not send messages to real users while not in production
    if (Config.get('env') !== 'production') {
      country = Config.get('mock.phone.country')
      this.to = Config.get('mock.phone.number')
    }

    // Remove break lines
    this.body = (this.body).replace(/(\r\n|\n|\r)/gm, '')

    // Remove duplicated spaces
    this.body = (this.body).replace(/ +(?= )/g, '')

    this.from = this.getOutgoingPhoneNumber(country, scope)

    debug({ country, to: this.to, from: this.from, body: this.body })
  }

  getOutgoingPhoneNumber (country: string, scope: string = 'default'): string | CustomError {
    const countries = Config.get('coverage.countries')
    let phoneNumber

    try {
      Joi.attempt(country, Joi.string().valid(countries).required())
    } catch (err) {
      throw new CustomError('invalid_country', `Country ${country} is not in the list ${countries}.`)
    }

    try {
      phoneNumber = Config.get('phoneNumbers.outgoing')[scope || 'default'][country]
      if (typeof phoneNumber === 'undefined') {
        throw new CustomError('scope_has_no_outgoing_phone_number', `No phoneNumber available in ${country}.`)
      }
    } catch (err) {
      throw new CustomError('scope_has_no_outgoing_phone_number', `No phoneNumber available in ${country}.`)
    }

    return phoneNumber
  }

  async send (): Promise<ISend> {
    const message: IMessage = {
      body: this.body,
      from: this.from,
      to: this.to
    }

    if (Config.get('env') === 'test') {
      debug('Skip sending SMS (test mode)')
      return {
        message,
        response: {}
      }
    }

    try {
      // Create client
      const client = Twilio(
        Config.get('twilio.ACCOUNT_SID'),
        Config.get('twilio.AUTH_TOKEN')
      )

      // Send SMS
      const response = await client.messages.create(message)

      // @TODO Normalize Twilio's response

      return {
        message,
        response
      }
    } catch (err) {
      throw new CustomError('sms_error', err).context(message)
    }
  }
}

export default SMS
