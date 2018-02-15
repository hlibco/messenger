import { onSignupSuccess, onSigninSuccess } from './handlers'
import { catchUncaughtException } from './utils/exception'

const cote = require('cote')({ redis: { url: '//localhost:6379' } })

const responder = new cote.Responder({ name: 'messenger service', key: 'messenger' })

/**
 * Event handlers
 */
responder.on('signup:success', onSignupSuccess)
responder.on('signin:success', onSigninSuccess)

// Catch all events (for log purposes)
// responder.on('*', onAny)

/**
 * Uncaught exception (Sentry)
 */
catchUncaughtException()
