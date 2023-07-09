interface PullRequest {
  title: string
}

interface Core {
  getInput: (value: string) => string
  setFailed: (value: string) => void
}

export function validateLength (pullRequest: PullRequest, core: Core): void {
  const minLength = parseInt(core.getInput('min-length'), 10)
  const maxLength = parseInt(core.getInput('max-length'), 10)

  if (!Number.isNaN(minLength) && minLength !== -1) {
    if (pullRequest.title.length < minLength) {
      core.setFailed(`Pull Request title "${pullRequest.title}" is smaller than the minimum length specified - ${minLength}`)
      return
    }
  }

  if (!Number.isNaN(maxLength) && maxLength !== -1) {
    if (pullRequest.title.length > maxLength) {
      core.setFailed(`Pull Request title "${pullRequest.title}" is smaller than the maximum length specified - ${maxLength}`)
    }
  }
}
