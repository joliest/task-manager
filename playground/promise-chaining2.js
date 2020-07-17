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

const deleteTaskAndCount = async (id) => {
  const userToDelete = Task.findOneAndDelete({ id })
  const count = Task.countDocuments({ completed: false })

  return count;
}

deleteTaskAndCount('5f1110b165b8625fb74cb2db').then(result => {
  console.log(result)
}).catch(error => {
  console.log(error)
})
