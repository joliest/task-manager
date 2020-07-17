const add = (a, b) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(a + b)
      }, 2000)
  })
}

// add(1, 2).then((sum) => {
//   console.log('sum1', sum)
//   add(sum, 5).then(sum2 => {
//       console.log('sum2', sum2)
//   }).catch(e => {
//       console.log(e)
//   })
// }).catch(e => {
//   console.log(e)
// })

add(1, 1).then(sum1 => {
  console.log('sum1: ', sum1)
  // 1] Return
  return add(sum1, 4)
  // 2] Results above will be used here
}).then((sum2) => {
  console.log('sum2: ', sum2)
}).catch(e => {
  console.log(e)
})