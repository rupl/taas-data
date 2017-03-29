# Taxonomy as a Service workflow

1. Make updates to your spreadsheets as desired.
1. Visit the TaaS project in jenkins. This URL will have been supplied to you separately.
1. Hit the "Build Now" button on the left. You'll see a new job appear.
1. After the job completes, your changes will appear on the [pull requests](https://github.com/UN-OCHA/taas-data/pulls) page for human review!

## Things to watch for

- Don't make copies of the spreadsheets, as the processor won't look at copies.
- Don't change heading names, as the processor will throw an error if it can't find the columns it's looking for.
- If a pull request doesn't appear, you can check the console log to see what's gone wrong.
