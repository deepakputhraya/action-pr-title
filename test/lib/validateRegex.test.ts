import { validateRegex } from "../../src/lib/validateRegex"
import { test } from "tap"

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
            return
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
            return
        }
    }

    validateRegex(pullRequest, core)
})