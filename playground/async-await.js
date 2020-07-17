const add = (a, b) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(a + b)
      }, 2000)
  })
}

const doWork = async () => {
  // you will have access
  const sum = await add(1, 99)
  const sum2 = await add(sum, 50)
  const sum3 = await add(sum2, 3)

  return sum3
}

doWork().then(result => {
  console.log(result)
}).catch(err => {
  console.log(err)
})

