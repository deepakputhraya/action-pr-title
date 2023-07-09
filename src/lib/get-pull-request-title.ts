import type { WebhookPayload } from '@actions/github/lib/interfaces'

interface Core {
  getInput: (value: string, options: { required: boolean }) => string
  setFailed: (message: string) => void
}

interface Github {
  getOctokit: Function
  context: {
    payload: WebhookPayload
  }
}

interface PullRequest {
  title: string
}

export async function getPullRequestTitle (core: Core, github: Github): Promise<PullRequest | undefined> {
  const authToken = core.getInput('github-token', { required: true })

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
    return pullRequest
  } else {
    core.setFailed('Could not determine title of pull request')
  }
}
