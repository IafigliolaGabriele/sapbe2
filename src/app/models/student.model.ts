import { Note } from './note.model'
import { Result } from './result.model'

export class Student {
    _key: String
    name: String
    percentage: number
    period: String
    personalId: number
    status: String
    tutor_key: String
    tutor_name: String
    type: String
    notes: [Note]
    results: [Result]
}
