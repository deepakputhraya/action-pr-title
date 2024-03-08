# Branch naming rules
<img alt="GitHub Actions status" src="https://github.com/iress/action-pr-title/workflows/main/badge.svg">

Github action to enforce Pull Request title conventions

_**Note:** This repo is a fork from https://github.com/deepakputhraya/action-pr-title/ which doesn't seem maintain._

## Usage

See [action.yml](./action.yml)

```yaml
steps:
- uses: iress/action-pr-title@main
  with:
    regex: '([a-z])+\/([a-z])+' # Regex the title should match.
    allowed_prefixes: 'feature,fix,JIRA' # title should start with the given prefix
    disallowed_prefixes: 'feat/,hotfix' # title should not start with the given prefix
    prefix_case_sensitive: false # title prefix are case insensitive
    min_length: 5 # Min length of the title
    max_length: 20 # Max length of the title
    github_token: ${{ github.token }} # Default: ${{ github.token }}
```

### Note:
Ensure to add `types` to the Pull requests webhook event as by default workflows are triggered only 
for `opened`, `synchronize`, or `reopened` pull request events. Read more about 
it [here](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows#pull_request). 
```yaml
on:
  pull_request:
    types: [opened, edited, synchronize, reopened]
```

Triggering the action on anything other than `pull_request` will cause a failure.

## License
The scripts and documentation in this project are released under the [MIT License](./LICENSE)
