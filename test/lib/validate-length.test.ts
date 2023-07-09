import { validateLength } from '../../src/lib/validate-length'
import { test } from 'tap'

test('validateLength is skipped if no min-length and max-length are passed', t => {
  t.plan(2)
  const pullRequest = {
    title: 'chore: Update'
  }

  const core = {
    getInput: (value: string): string => {
      t.ok(['min-length', 'max-length'].includes(value))
      return ''
    },
    setFailed: (message: string): void => {
      t.fail(message)
    }
  }

  validateLength(pullRequest, core)
})

test('validateLength on min-length should pass valid title', t => {
  t.plan(2)
  const pullRequest = {
    title: '12345'
  }

  const core = {
    getInput: (value: string): string => {
      t.ok(['min-length', 'max-length'].includes(value))
      return value === 'min-length'
        ? '5'
        : '-1'
    },
    setFailed: (message: string): void => {
      t.fail(message)
    }
  }

  validateLength(pullRequest, core)
})

test('validateLength on min-length should call setFailed on invalid title', t => {
  t.plan(3)
  const pullRequest = {
    title: '12345'
  }

  const core = {
    getInput: (value: string): string => {
      t.ok(['min-length', 'max-length'].includes(value))
      return value === 'min-length'
        ? '6'
        : '-1'
    },
    setFailed: (message: string): void => {
      t.equal(message, 'Pull Request title "12345" is smaller than the minimum length specified - 6')
    }
  }

  validateLength(pullRequest, core)
})

test('validateLength on max-length should pass valid title', t => {
  t.plan(2)
  const pullRequest = {
    title: '12345'
  }

  const core = {
    getInput: (value: string): string => {
      t.ok(['min-length', 'max-length'].includes(value))
      return value === 'max-length'
        ? '5'
        : '-1'
    },
    setFailed: (message: string): void => {
      t.fail(message)
    }
  }

  validateLength(pullRequest, core)
})

test('validateLength on min-length should call setFailed on invalid title', t => {
  t.plan(3)
  const pullRequest = {
    title: '12345'
  }

  const core = {
    getInput: (value: string): string => {
      t.ok(['min-length', 'max-length'].includes(value))
      return value === 'max-length'
        ? '4'
        : '-1'
    },
    setFailed: (message: string): void => {
      t.equal(message, 'Pull Request title "12345" is smaller than the maximum length specified - 4')
    }
  }

  validateLength(pullRequest, core)
})
