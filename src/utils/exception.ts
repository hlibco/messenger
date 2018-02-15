/**
 * Log uncaught exceptions on Sentry.io
 * Configure Sentry credentials on .env file during development.
 */
import * as Raven from 'raven'
import * as PrettyError from 'pretty-error'
import Config from '../config'

const ENV = Config.get('env')
const DSN = Config.get('sentry.dsn')

Raven.config(ENV === 'production' && DSN)
Raven.disableConsoleAlerts()

export default Raven

export function catchUncaughtException () {
  return Raven.install(err => {
    const pe = new PrettyError()
    pe.skipNodeFiles()
    console.log(pe.render(err))

    // Let's keep in business even with an unknown state. Not recommended.
    // process.exit(1)
  })
}
