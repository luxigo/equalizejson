#!/usr/bin/env node
  /*
    Copyright (C) 2021 luc.deschenaux@freesurf.ch

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const fs=require('fs');
const encoding='utf8';

async function main(){
  var stream;
  var chunks=[];
  if (process.argv.length > 2) {
    stream=fs.createReadStream(process.argv[2])
  } else {
    stream=process.stdin;
  }
  for await (const chunk of stream) chunks.push(chunk);
  var json=JSON.parse(Buffer.concat(chunks).toString(encoding));
  var keys={}
  // we want all the fields from all the records so we build a key list
  json.forEach(function(obj){
    Object.keys(obj).forEach(function(k){
      keys[k]=true;
    });
  });

  // eventually we update every record to include all the fields
  var allkeys=Object.keys(keys);
  json.forEach(function(o){
    var objkeys=Object.keys(o);
    if (objkeys.length<allkeys.length){
      allkeys.forEach(function(k){
        if (o[k]===undefined) {
          o[k]='';
        }
      })
    }
  })
  console.log(JSON.stringify(json,false,4)); 
}

main()

