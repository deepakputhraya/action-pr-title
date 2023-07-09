'use strict'

import core from '@actions/core'
import github from '@actions/github'
import { validateRegex } from './lib/validate-regex'
import { validatePrefixes } from './lib/validate-prefixes'
import { validateLength } from './lib/validate-length'

async function run (): Promise<void> {
  try {
    const authToken = core.getInput('github-token', { required: true })

    if (github.context.eventName !== 'pull_request') {
      core.info(`Not supported event: ${github.context.eventName}`)
      return
    }

    if (github.context.payload.pull_request != null) {
      const owner = github.context.payload.pull_request.base.user.login
      const repo = github.context.payload.pull_request.base.repo.name

      const client = github.getOctokit(authToken)
      // The pull request info on the context isn't up to date. When
      // the user updates the title and re-runs the workflow, it would
      // be outdated. Therefore fetch the pull request via the REST API
      // to ensure we use the current title.
      const { data: pullRequest } = await client.rest.pulls.get({
        owner,
        repo,
        pull_number: github.context.payload.pull_request.number
      })

      core.info(`Checking pull-request title: "${pullRequest.title}"`)

      validateRegex(pullRequest, core)
      validatePrefixes(pullRequest, core)
      validateLength(pullRequest, core)
    }
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run()
