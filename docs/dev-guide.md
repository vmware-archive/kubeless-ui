# Kubeless UI development setup

## Development setup

Install dependencies It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic installs.

```bash
yarn install    # Install project dependencies
yarn test       # Run test cases
yarn run dev    # Launch and watch server
```

*(`npm` will also work if you really want)*

Dev server with Hot Module Replacement should run at http://localhost:3000

## Production setup

You can bundle the app in `dist/` folder

This will also run linter and tests.

```bash
yarn run build
```

Now you just have to serve the `dist/` folder with node (`yarn run start`) or with an nginx.

## Making contributions

1. Fork the repository and clone it locally.

2. Create a branch
```bash
git checkout -b <branch-name>
```

2. Make sure you follow the instructions in the Development setup section

3. Connect your local to the original “upstream” repository by adding it as a remote.
```bash
git remote add upstream git@github.com:kubeless/kubeless-ui.git
```

4. Pull in changes from “upstream” often so that you stay up to date so that when you submit your pull request, merge conflicts will be less likely.
```bash
git fetch upstream
```

5. To make our local copy of master fetch latest changes from the upstream repository
```bash
git branch --set-upstream-to=upstream/master
```
Now your local copy will be tracking the changes made on the upstream/master branch

6. When you make your changes, look at things formatting, comment styles, test cases so that the format of your changes matches that of the repo you are contributing to. It makes the merging process much simpler.

7. When you are ready to commit your changes,
```
git add .
git commit -m <message-of-commit>
git push origin <branch-name-created-above>
```

8. Create Pull Request to merge your recently pushed branch to the kubeless-ui/master branch
  - Reference any relevant issues or supporting documentation in your PR (ex. “Closes #37.”)
