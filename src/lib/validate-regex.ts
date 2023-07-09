interface PullRequest {
  title: string
}

interface Core {
  getInput: (value: string) => string
  setFailed: (value: string) => void
}

export function validateRegex (pullRequest: PullRequest, core: Core): void {
  const regexString = core.getInput('regex')
  if (regexString === '') {
    return
  }
  const slashPos = regexString.lastIndexOf('/')
  const regex = RegExp(regexString.slice(1, slashPos), regexString.slice(slashPos + 1))

  if (!regex.test(pullRequest.title)) {
    core.setFailed(`Pull Request title "${pullRequest.title}" failed to pass match regex - /${regex.source}/${regex.flags}`)
  }
}
