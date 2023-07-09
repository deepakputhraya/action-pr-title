'use strict'

import core from '@actions/core'
import github from '@actions/github'
import { validateRegex } from './lib/validate-regex'
import { validatePrefixes } from './lib/validate-prefixes'
import { validateLength } from './lib/validate-length'
import { getPullRequestTitle } from './lib/get-pull-request-title'
import { isValidPullRequestEvent } from './lib/is-valid-pull-request-event'

async function run (): Promise<void> {
  try {
    if (isValidPullRequestEvent(core, github)) {
      const pullRequest = await getPullRequestTitle(core, github)
      if (pullRequest != null) {
        core.info(`Checking pull-request title: "${pullRequest.title}"`)
        validateRegex(pullRequest, core)
        validatePrefixes(pullRequest, core)
        validateLength(pullRequest, core)
      }
    }
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run()
