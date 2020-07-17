require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5f1110b165b8625fb74cb2db').then(task => {
//   console.log(task)
//   return Task.countDocuments({ completed: false })
// }).then(numberOfIncompleteTasks => {
//   console.log('Incomplete Task No: ', numberOfIncompleteTasks)
// }).catch(e => {
//   console.log(e)
// })

const deleteTaskAndCount = async (_id) => {
  const userToDelete = await Task.findOneAndDelete({ _id })
  const count = await Task.countDocuments({ completed: false })

  return count;
}

deleteTaskAndCount('5f113a9cd787ec7802a66c95').then(result => {
  console.log(result)
}).catch(error => {
  console.log(error)
})
