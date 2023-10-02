const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    )
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://deployment87:${password}@cluster0.outjekj.mongodb.net/?retryWrites=true&w=majority`

// const noteSchema = new mongoose.Schema({
//     content: String,
//     date: Date,
//     important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

mongoose
    .connect(url)
  .then((result) => {
    console.log('connected')
  })

//     const note = new Note({
//         content: "GET and POST are the most important methods of HTTP protocol",
//         date: new Date(),
//         important: true,
//     })

//     return note.save()
//   })
//   .then(() => {
//     console.log('note saved!')
//     return mongoose.connection.close()
//   })
//   .catch((err) => console.log(err))

// Note.find({}).then((result) => {
//     result.forEach((note) => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })


mongoose.connection.close()