# Github action to enforce Pull Request title conventions

Github action to enforce Pull Request title conventions

## Usage

See [action.yml](./action.yml)

```yaml
name: pull request title check
on:
  pull_request:
    types: [opened, edited, synchronize, reopened]

jobs:
  pull-request-title-check:
    runs-on: ubuntu-latest
    steps:
    - uses: fastify/action-pr-title@v0
      with:
        regex: '/([a-z])+\/([a-z])+/' # Regex the title should match.
        prefixes: 'feature,chore,fix' # title should start with the given prefix
        min-length: 5 # Min length of the title
        max-length: 20 # Max length of the title
        github-token: ${{ github.token }} # Default: ${{ github.token }}
```

### Note:
Ensure to add `types` to the Pull requests webhook event as by default workflows are triggered only 
for `opened`, `synchronize`, or `reopened` pull request events. Read more about 
it [here](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request). 

```yaml
```

Triggering the action on anything other than `pull_request` will do nothing.



## License
The scripts and documentation in this project are released under the [MIT License](./LICENSE)
