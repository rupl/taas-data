# taas-data
UN-OCHA Taxonomy As A Service: Data Exports.

These are the results of running the code in the [TaaS repository](https://github.com/UN-OCHA/taas).

Visit http://vocabulary.unocha.org/ to see what exports are available, their sources, and further information.

## Updating this repo

- For updates to the `json` and `sheets` directories, please use our [automated jenkins workflow](docs/workflow.md).
- For all other files, send us a pull-request!

## Running Jekyll site locally

### Requirements

* [Ruby](https://www.ruby-lang.org/en/)
* [Bundler](http://bundler.io/)
* [Node](https://nodejs.org/)
* [Jekyll](https://jekyllrb.com)
* [Grunt CLI](https://gruntjs.com/getting-started)

### Installing

Clone the repo

```
git@github.com:UN-OCHA/taas-data.git
```

Install the required gems

```
cd taas-data
bundle
```

Install the front end dependencies

```
npm install
```

### Running

To run the Jekyll site and watch for changes to sass and js:

```
grunt serve
```

Go to http://localhost:4000/

### Deploying

1. Compile the front end resources (Grunt is used for this instead of the standard Jekyll way).
```
grunt
```

2. Commit your changes, including the minified css files.

3. Push to the master branch.
