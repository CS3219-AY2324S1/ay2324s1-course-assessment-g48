import { NextFunction, Request, Response } from "express"

export const questionRouter = require('express').Router()
import Question from '../models/Question'

// "/" = application's root directory -> displays main page
questionRouter.get('/', (request : Request, response: Response) => {
    response.send('<h1>Hello World!</h1>')
})

// Gets question from mongodb
questionRouter.get('/api/questions', async (request: Request, response: Response) => {
    Question.find({}).then((question) => {
        response.json(question)
    })
})

// // Fetch individual question by id
// questionRouter.get('/api/questions/:id', (request: Request, response: Response, next : NextFunction) => {
//     Question.findById(request.params.id)
//         .then((question) => {
//             if (question) {
//                 response.json(question)
//             } else {
//                 response.status(404).end()
//             }
//         })
//         .catch((err) => {
//             // console.log(err);
//             // response.status(400).send({ error: "malformatted id" });
//             next(err)
//         })
// })
// // Deleting data as a user, try doing it through postman
// questionRouter.delete('/api/notes/:id', async (request, response) => {
//     await Question.findByIdAndRemove(request.params.id)
//     response.status(204).end()
// })

// Adding notes
questionRouter.post('/api/question', async (request: Request, response: Response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    const question = new Question({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })
  })
//     const savedNote = await question.save()
//     user.notes = user.notes.concat(savedNote._id)
//     response.status(201).json(savedNote)
// })
// // Updating notes
// questionRouter.put('/api/:id', (request, response, next) => {
//     const { content, important } = request.body

//     Question.findByIdAndUpdate(
//         request.params.id,
//         { content, important },
//         { new: true, runValidators: true, context: 'query' }
//     )
//         .then((updatedNote) => {
//             response.json(updatedNote)
//         })
//         .catch((err) => next(err))
// })