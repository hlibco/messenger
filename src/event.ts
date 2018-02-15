import * as cote from 'cote'
import * as uuid from 'uuid/v4'

export interface IEvent {
  id: string
  type: string
  payload: Object
}

export class Event {
  private id
  constructor (private type: string, private payload: Object) {
    this.id = uuid()
  }

  /**
   * Convert event to object
   * @return IEvent
   */
  toObject (): IEvent {
    return {
      id: this.id,
      type: this.type,
      payload: this.payload
    }
  }

  /**
   * Send a request to the service listening for this event type
   * @param requester cote.Requester
   * @param cb callback function
   * @return Promise<object>
   */
  async send (requester: cote.Requester, cb = arg => arg) {
    return requester.send(this.toObject(), res => {
      cb(JSON.parse(res))
    })
  }

  /**
   * Publish the event to all subscribers of this event type
   * @param publisher cote.Publisher
   * @return void
   */
  publish (publisher: cote.Publisher): void {
    publisher.publish(this.type, this.toObject())
  }
}

export default Event
