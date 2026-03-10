/**
 * Frontend structured logger — [MODULE] prefixed console logs.
 * Use: logger('AUTH').info('OTP requested') 
 */
const logger = (module: string) => ({
    info: (...args: unknown[]) => console.log(`[${module}]`, ...args),
    warn: (...args: unknown[]) => console.warn(`[${module}]`, ...args),
    error: (...args: unknown[]) => console.error(`[${module}]`, ...args),
    debug: (...args: unknown[]) => console.debug(`[${module}]`, ...args),
})

export default logger
