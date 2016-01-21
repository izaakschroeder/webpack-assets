# webpack-assets

Collect asset URLs from webpack stats.

![build status](http://img.shields.io/travis/izaakschroeder/webpack-assets/master.svg?style=flat)
![coverage](http://img.shields.io/coveralls/izaakschroeder/webpack-assets/master.svg?style=flat)
![license](http://img.shields.io/npm/l/webpack-assets.svg?style=flat)
![version](http://img.shields.io/npm/v/webpack-assets.svg?style=flat)
![downloads](http://img.shields.io/npm/dm/webpack-assets.svg?style=flat)

```javascript
import collect from 'webpack-assets';
import { readFileSync } from 'fs';

const assets = collect(JSON.parse(readFileSync('stats.json', 'utf8')));
console.log(assets);
```
