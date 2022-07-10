'use strict';

const util = require('util');
const opts = require('./get-options');
const results = require('./get-results');

const keys = ['p_response_time', 'x_response_time', 'total_time'];

module.exports = (print = true) => {

    const ave = keys.reduce((p, c) => ({...p, [c]: 0}), {});
    const min = keys.reduce((p, c) => ({...p, [c]: Infinity}), {});
    const max = keys.reduce((p, c) => ({...p, [c]: -Infinity}), {})

    const stats = {ave, min, max};

    let ok_count = 0, not_ok_count = 0;
    for (const result of results) {
        if (result.status < 400) {
            ok_count++;
            for (const [name, value] of Object.entries(stats)) {
                for (const key of keys) {
                    if (name === 'min' && value[key] > result[key]) value[key] = result[key];
                    if (name === 'max' && value[key] < result[key]) value[key] = result[key];
                    if (name === 'ave') value[key] += result[key];
                }
            }
        } else {
            not_ok_count++;
        }

    }
    
    for (const key of keys) {
        ave[key] = Math.round((ave[key] / ok_count) * 100) / 100;
    }

    const total = results.length;
    const result = {total, not_ok_count, ok_count};
    for (const [key, object] of Object.entries({ave, min, max})) {
        for (const [name, value] of Object.entries(object)) {
            result[`${key}_${name}`] = value;
        }
    }

    if (print) {
        console.log();
        const { api_key, ...rest} = opts;
        console.log(util.inspect(rest,  { depth: null, colors: true }));
        console.log(util.inspect(result,  { depth: null, colors: true }));
    }

    return result;
}