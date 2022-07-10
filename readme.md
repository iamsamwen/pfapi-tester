# pfapi-tester

a command line tester for strapi-plugin pfapi

## how to install

```bash
npm install pfapi-tester -g
```

## get help and demo run

```
> pfapi-tester -h

Options:
  -b, --base_url <url>  base url, for example: http://localhost:1337
  -p, --path <path>     url path & query string, for example: /pfapi/pf/northern-cities
  -k, --api_key <key>   pfapi api key
  -c, --concurrent      run concurrently
  -f, --fetch_items     fetch each item if there items in response
  -w, --walk_through    walk through all pages
  -t, --times <3>       run how many times (default: "3")
  -d, --delay <ms>      simulate delay within api
  -g, --etag            send if-none-match with etag
  -e, --expires         send if-modified-since with expires
  -s, --sleep <ms>      sleep for ms after each request
  -r, --ss_rand         disable server caches on each request
  -v, --verbose         print verbose details
  -h, --help            display help for command


> pfapi-tester -p /pfapi/pf/northern-cities -t 10

++++++++++
{
  times: 10,
  path: '/pfapi/pf/northern-cities',
  base_url: '...'
}
{
  total: 10,
  not_ok_count: 0,
  ok_count: 10,
  ave_p_response_time: 1.79,
  ave_x_response_time: 2.83,
  ave_total_time: 131.49,
  min_p_response_time: 0.85,
  min_x_response_time: 1.76,
  min_total_time: 112.38,
  max_p_response_time: 7.11,
  max_x_response_time: 8.41,
  max_total_time: 227.87
}
```

**p_response_time**: pfapi response time in ms.

**x_response_time**: strapi response time in ms. 

**total_time**: total time used for the http request in ms.

## .env

setup .env in you work directory can save put into option -b and -k, on each run.

```bash
BASE_URL=http://localhost:1337
API_KEY=Pfapi-Demo-XXXXXX
```

## x-response-time

setup strapi to send x-response-time in the response headers:

```bash
yarn add koa-response-time
```

add following code in file src/index.js

```javascript
...
const responseTime = require('koa-response-time');

module.exports = {
...
  bootstrap({ strapi }) {
    strapi.server.app.use(responseTime({ hrtime: true }));
  },
};
```
