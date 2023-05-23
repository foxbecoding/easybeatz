import qs from 'qs'

// router: {
//   // other options...
//   // parseQuery: qs.parse,
//   // stringifyQuery: qs.stringify,
//   parseQuery (query) {
//     // let Qs = require('qs');
//     return qs.parse(query)
//   },
//   stringifyQuery( query) {
//     // let Qs = require('qs');
//     let result = qs.stringify(query, { format: 'RFC1738' })
//     return result ? ('?' + result) : ''
//   },   
// }

export default({
  router: {
    parseQuery: qs.parse,
    stringifyQuery: qs.stringify,
  }
})
