# Harceli

Monitor changes in files and react to them in the way you need.

## Install
```
npm i -g harceli
```

## How to use?

1. Create a **harceli.config.json** file in your project's directory.
Example:
```json
{
    "watched": [
        { "files": ["exampleFile.js"], "on_write": "echo test!"}
    ]
}
```
2. Run **harceli**
```
harceli 
```

Now, everytime you change and save your watched files, the on_write command shall be evaluated.