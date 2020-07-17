require('../src/db/mongoose')
const User = require('../src/models/user')

// no need to add $set in mongoose
// User.findByIdAndUpdate('5f111322b0e7a861dd493ab8', { age: 1 }).then(updatedUser => {
//   console.log(updatedUser)
//   return User.countDocuments({ age: 1 });
// }).then(result => {
//   console.log(result)
// }).catch(e => {
//   console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })

  return count;
}

updateAgeAndCount('5f111322b0e7a861dd493ab8', 2).then(count => {
  console.log('Count: ', count)
}).catch(err => {
  console.log('Error: ', err)
})