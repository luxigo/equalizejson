# equalizejson
For an input array of objects in JSON format, gather property names in objects (non-recursively) then create missing properties in other object instances (non-recursively) with value set to "".

## license
AGPL-3.0 or later

## how to
if not yet installed, install nodejs (with nvm I suggest), eg:
```
wget https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
nvm install --lts
```

install equalizejson:
```
npm install -g equalizejson
```

convert with eg:
```
equalizejson this.json 
```

useful before converting a json to csv with eg:
```
npm i -g json2csv
equalizejson this.json | json2csv
```

