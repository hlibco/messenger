const debug = require('debug')('messenger:handlers/any')

/**
 * Get all events handler
 * @param event Object
 * @return Promise<void>
 */
export async function any (event) {
  debug('Event received: ', event)
}
