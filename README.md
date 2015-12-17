# webpack-assets

Collect asset URLs from webpack stats.

```javascript
import collect from 'webpack-assets';
import { readFileSync } from 'fs';

const assets = collect(JSON.parse(readFileSync('stats.json', 'utf8')));
console.log(assets);
```
