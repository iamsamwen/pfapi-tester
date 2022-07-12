'use strict';

require('dotenv').config();
const commander = require('commander');

const { BASE_URL, API_KEY } = process.env;

commander
  .usage('[OPTIONS]...')
  .option('-b, --base_url <url>', 'base url, for example: http://localhost:1337')
  .requiredOption('-p, --path <path>', 'url path & query string, for example: /pfapi/pf/northern-cities')
  .option('-k, --api_key <key>', 'pfapi api key')
  .option('-c, --concurrent', 'run concurrently')
  .option('-f, --fetch_items', 'fetch each item if there items in response')
  .option('-w, --walk_through', 'walk through all pages')
  .option('-t, --times <3>', 'run how many times', '3')
  .option('-d, --delay <ms>', 'simulate delay within api')
  .option('-g, --etag', 'send if-none-match with etag')
  .option('-e, --expires', 'send if-modified-since with expires')
  .option('-s, --sleep <ms>', 'sleep for ms after each request')
  .option('-r, --ss_rand', 'disable server caches on each request')
  .option('-l, --legend', 'print legend of stats')
  .option('-v, --verbose', 'print verbose details')
  .parse(process.argv);

const opts = commander.opts();

if (opts.delay) opts.delay = Number(opts.delay);
if (opts.sleep) opts.sleep = Number(opts.sleep);
if (opts.times) opts.times = Number(opts.times);
else opts.times = 3;

if (!opts.base_url) opts.base_url = BASE_URL;
if (!opts.api_key) opts.api_key = API_KEY;

module.exports = opts;