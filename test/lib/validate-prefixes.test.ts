import { validatePrefixes } from '../../src/lib/validate-prefixes'
import { test } from 'tap'

test('validatePrefixes is skipped if no prefixes are passed', t => {
  t.plan(1)
  const pullRequest = {
    title: 'chore: Update'
  }

  const core = {
    getInput: (value: string): string => {
      t.equal(value, 'prefixes')
      return ''
    },
    setFailed: (message: string): void => {
      t.fail(message)
    }
  }

  validatePrefixes(pullRequest, core)
})

test('validatePrefixes should pass valid title', t => {
  t.plan(1)
  const pullRequest = {
    title: 'chore: Update'
  }

  const core = {
    getInput: (value: string): string => {
      t.equal(value, 'prefixes')
      return 'chore:'
    },
    setFailed: (message: string): void => {
      t.fail(message)
    }
  }

  validatePrefixes(pullRequest, core)
})

test('validatePrefixes should call setFailed on invalid title', t => {
  t.plan(2)
  const pullRequest = {
    title: 'fix: bug in parser'
  }

  const core = {
    getInput: (value: string): string => {
      t.equal(value, 'prefixes')
      return 'chore:'
    },
    setFailed: (message: string): void => {
      t.equal(message, 'Pull Request title "fix: bug in parser" did not matched with a prefix - "chore:"')
    }
  }

  validatePrefixes(pullRequest, core)
})
