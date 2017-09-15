# eslint-plugin-webgl-logic

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

```sh
$ npm install eslint
```

If you installed `ESLint` globally, you have to install the eslint-plugin-webgl-logic plugin globally too. Otherwise, install it locally.

```sh
$ npm install eslint-plugin-webgl-logic
```

# Configuration

Add `plugins` section and specify eslint-plugin-webgl-logic as a plugin.

```json
{
  "plugins": [
    "webgl-logic"
  ]
}
```

Add rules

```json
{
  "rules": {
    "webgl-logic/noAsyncAwait": 2,
		"webgl-logic/noMathRandom": 2
  }
}
```

# License

eslint-plugin-webgl-logic is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
