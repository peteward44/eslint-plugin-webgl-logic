# eslint-plugin-closuredepth
Eslint plugin in order to provide warnings closure depth, and you can avoid the associated performance penalties

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

```sh
$ npm install eslint
```

If you installed `ESLint` globally, you have to install the closuredepth plugin globally too. Otherwise, install it locally.

```sh
$ npm install eslint-plugin-closuredepth
```

# Configuration

Add `plugins` section and specify ESLint-plugin-closuredepth as a plugin.

```json
{
  "plugins": [
    "closuredepth"
  ]
}
```

Add the rule, where 'limit' is your desired maximum depth

```json
{
  "rules": {
    "closuredepth/closuredepth": [ 2, { "limit": 3 } ]
  }
}
```

# License

ESLint-plugin-closuredepth is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
