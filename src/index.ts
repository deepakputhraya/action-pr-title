'use strict'

import core from '@actions/core'
import github from '@actions/github'
import { validateRegex } from './lib/validateRegex'

function validateTitlePrefix (title: string, prefix: string, caseSensitive: boolean): boolean {
  if (!caseSensitive) {
    prefix = prefix.toLowerCase()
    title = title.toLowerCase()
  }
  return title.startsWith(prefix)
}

async function run (): Promise<void> {
  try {
    const authToken = core.getInput('github_token', { required: true })
    const eventName = github.context.eventName

    if (eventName !== 'pull_request') {
      core.info(`Not supported event: ${eventName}`)
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

      const title = pullRequest.title

      core.info(`Pull Request title: "${pullRequest.title}"`)

      // Check if title pass regex
      validateRegex(pullRequest, core)

      // Check min length
      const minLen = parseInt(core.getInput('min_length'))
      if (title.length < minLen) {
        core.setFailed(`Pull Request title "${title}" is smaller than min length specified - ${minLen}`)
        return
      }

      // Check max length
      const maxLen = parseInt(core.getInput('max_length'))
      if (maxLen > 0 && title.length > maxLen) {
        core.setFailed(`Pull Request title "${title}" is greater than max length specified - ${maxLen}`)
        return
      }

      // Check if title starts with an allowed prefix
      let prefixes = core.getInput('allowed_prefixes')
      const prefixCaseSensitive = (core.getInput('prefix_case_sensitive') === 'true')
      core.info(`Allowed Prefixes: ${prefixes}`)
      if (prefixes.length > 0 && !prefixes.split(',').some((el) => validateTitlePrefix(title, el, prefixCaseSensitive))) {
        core.setFailed(`Pull Request title "${title}" did not match any of the prefixes - ${prefixes}`)
        return
      }

      // Check if title starts with a disallowed prefix
      prefixes = core.getInput('disallowed_prefixes')
      core.info(`Disallowed Prefixes: ${prefixes}`)
      if (prefixes.length > 0 && prefixes.split(',').some((el) => validateTitlePrefix(title, el, prefixCaseSensitive))) {
        core.setFailed(`Pull Request title "${title}" matched with a disallowed prefix - ${prefixes}`)
      }
    }
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run()
