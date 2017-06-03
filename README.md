# MagicMirrorModule-Debug

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/). This module provides debugging information while developing your MagicMirror module. The module will show all `console.log` information from node_helper.js and module.js scripts in a div section below the MagicMirror interface.

## Installation

1. Navigate into your MagicMirror's `modules` folder and run:
```
$ git clone https://github.com/QNimbus/MMM-Debug.git
```
1. Install the dependencies: 
```
$ cd MMM-Debug && npm install --only=production
```

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Debug',
            config: {
                // See below for configurable options
                maxEntries: 25,   
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `maxEntries` | *Optional* Maximum debug log entries to display<br><br>**Default value:** 25<br>**Type:** `int`<br>

## Building from TypeScript source


## Screenshots

Todo....