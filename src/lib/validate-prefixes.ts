interface PullRequest {
  title: string
}

interface Core {
  getInput: (value: string) => string
  setFailed: (value: string) => void
}

export function validatePrefixes (pullRequest: PullRequest, core: Core): void {
  const prefixes = core.getInput('prefixes')

  if (prefixes === '') {
    return
  }

  if (prefixes.split(',').findIndex(prefix => pullRequest.title.startsWith(prefix)) === -1) {
    core.setFailed(`Pull Request title "${pullRequest.title}" did not matched with a prefix - "${prefixes}"`)
  }
}
