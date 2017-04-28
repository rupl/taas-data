# Taxonomy as a Service workflow

1. Make updates to your spreadsheets as desired.
1. Say `JebbBot taas build <source-name>` in the taxonomies flowdock channel.
1. After the job completes, your changes will appear on the [pull requests](https://github.com/UN-OCHA/taas-data/pulls) page for human review!
1. If your changes do not appear, you can use the link to Jenkins provided by JebbBot to view the console and see what's happened.

More verbose technical guidance for editors is available [in this document](https://docs.google.com/document/d/1OzsH_AxGGjak1g0bN4y5hg16LWMZS0Qe1cTQA-W2Jq4/edit).

## Things to watch for

- Don't make copies of the spreadsheets, as the processor won't look at copies.
- Don't change heading names, as the processor will throw an error if it can't find the columns it's looking for.
- If a pull request doesn't appear, you can check the console log to see what's gone wrong.
