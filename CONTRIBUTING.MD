# Contributing Guidelines

## License and CLA

The Kubeless UI license is Apache Software License V2

We do not currently ask for a Contributor License Agreement to be signed.

## Support Channels

Whether you are a user or contributor, official support channels include:

- GitHub [issues](https://github.com/kubeless/kubeless-ui/issues/new)

Before opening a new issue or submitting a new pull request, it's helpful to search the project - it's likely that another user has already reported the issue you're facing, or it's a known issue that we're already aware of.

## How to become a contributor and submit your own code

### Setup your development environment

Consult the [Developer's guide](./docs/dev-guide.md) to setup yourself up.

### Contributing a patch

For detailed instructions, consult the [Developer's guide](./docs/dev-guide.md)

1. Submit an issue describing your proposed change to the repo in question.
2. The repo owners will respond to your issue promptly.
3. If your proposed change is accepted
  - Fork the repo
  - Clone the repo
  - Create a branch 
  - Install dependencies
  - Run tests to make sure they pass and if so you are ready to make your changes
  - Make your changes and
  - Test your code changes. Add tests for any new/additional functionality you add.
  - Push your changes to your fork with git push
4. Submit a pull request
  - Make sure you fill up the description clearly
  - Point out the particular issue your PR is mitigating, and ask for code review.
  - If your tests did not pass in Step 3, make sure to bring it up here so someone can help you out with it. The CI process will fail, so it will be picked up in any case.
  - Iterate on the solution
  - Get merged!

## Issues

Issues are used as the primary method for tracking anything to do with the Kubeless UI project.

### Issue Type

* Question: These are support or functionality inquiries that we want to have a record of for future reference. Generally these are questions that are too complex or large to store in the Slack channel or have particular interest to the community as a whole. Depending on the discussion, these can turn into "Feature" or "Bug" issues.
* Proposal: Used for items (like this one) that propose a new ideas or functionality that require a larger community discussion. This allows for feedback from others in the community before a feature is actually developed. This is not needed for small additions. Final word on whether or not a feature needs a proposal is up to the core maintainers. All issues that are proposals should both have a label and an issue title of "Proposal: [the rest of the title]." A proposal can become a "Feature" and does not require a milestone.
* Features: These track specific feature requests and ideas until they are complete. They can evolve from a "Proposal" or can be submitted individually depending on the size.
* Bugs: These track bugs with the code or problems with the documentation (i.e. missing or incomplete)
