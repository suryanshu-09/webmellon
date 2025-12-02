import pino from "pino";

/**
 * Structured logger using Pino
 * - Uses JSON output for structured logging
 * - Log level can be controlled via LOG_LEVEL environment variable
 * - Transport disabled to avoid Next.js worker path issues
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  browser: {
    asObject: true,
  },
});

/**
 * Create a child logger with additional context
 * @param context - Additional context to include in all log messages
 */
export function createLogger(context: Record<string, unknown>) {
  return logger.child(context);
}
