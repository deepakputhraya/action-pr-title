import { validateRegex } from '../../src/lib/validate-regex'
import { test } from 'tap'

test('validateRegex is skipped if no regex is passed', t => {
  t.plan(1)
  const pullRequest = {
    title: 'valid'
  }

  const core = {
    getInput: (value: string): string => {
      t.equal(value, 'regex')
      return ''
    },
    setFailed: (message: string): void => {
      t.fail(message)
    }
  }

  validateRegex(pullRequest, core)
})

test('validateRegex should pass valid title', t => {
  t.plan(1)
  const pullRequest = {
    title: 'valid'
  }

  const core = {
    getInput: (value: string): string => {
      t.equal(value, 'regex')
      return '/^valid$/'
    },
    setFailed: (message: string): void => {
      t.fail(message)
    }
  }

  validateRegex(pullRequest, core)
})

test('validateRegex should call setFailed on invalid title', t => {
  t.plan(2)
  const pullRequest = {
    title: 'invalid'
  }

  const core = {
    getInput: (value: string): string => {
      t.equal(value, 'regex')
      return '/^valid$/'
    },
    setFailed: (message: string): void => {
      t.equal(message, `Pull Request title "${pullRequest.title}" failed to pass match regex - /^valid$/`)
    }
  }

  validateRegex(pullRequest, core)
})
