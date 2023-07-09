import type { WebhookPayload } from '@actions/github/lib/interfaces'

interface Core {
  info: (message: string) => void
}

interface Github {
  context: WebhookPayload
}

export function isValidPullRequestEvent (core: Core, github: Github): boolean {
  if (github.context.eventName !== 'pull_request') {
    core.info(`Not supported event: ${github.context.eventName as string}`)
    return false
  }
  return true
}
