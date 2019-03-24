import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {AngularFirestoreCollection, AngularFirestore} from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {User, FirebaseUserModel, Student, Tutor, Note, Result} from '../models'
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  studentRef: AngularFirestoreCollection<Student>
  tutorRef: AngularFirestoreCollection<Tutor>
  noteRef: AngularFirestoreCollection<Note>
  resultRef: AngularFirestoreCollection<Result>
  usersRef: AngularFirestoreCollection<User>
  
  constructor(
    private aft: AngularFirestore,
    private auth: AuthService) { 
    this.studentRef = this.aft.collection('students')
    this.tutorRef = this.aft.collection('tutors')
    this.noteRef = this.aft.collection('notes')
    this.resultRef = this.aft.collection('results')
    this.usersRef = this.aft.collection('users')
  }

  getCurrentUser(){
    return this.usersRef.doc(this.auth.userKey).valueChanges();
  }

  // Get all Begin

  getAllStudents(){
     return this.studentRef.snapshotChanges();
  }

  getAllTutors(){
    return this.tutorRef.snapshotChanges();
  }

  getAllNotes(){
    return this.noteRef.snapshotChanges();
  }

  getAllResults(){
    return this.resultRef.snapshotChanges();
  }

  getAllUsers(){
    return this.usersRef.snapshotChanges();
  }

  // End Get All

  // Begin Updates
  updateStudentByID(id,newData){
    return this.aft.collection('students').doc(id).update(newData);
  }

  updateTutorByID(id,newData){
    return this.aft.collection('tutors').doc(id).update(newData);
  }

  updateNoteByID(id,newData){
    return this.aft.collection('notes').doc(id).update(newData);
  }

  updateResultByID(id,newData){
    return this.aft.collection('results').doc(id).update(newData);
  }

  updateUserByID(id,newData){
    return this.aft.collection('users').doc(id).update(newData);
  }

  //End Updates

  //Begin get by Id

  getStudentByID(id){
    return this.aft.collection('students').doc(id).valueChanges()
  }

  getTutorByID(id){
    return this.aft.collection('tutors').doc(id).valueChanges()
  }

  getNoteByID(id){
    return this.aft.collection('notes').doc(id).valueChanges()
  }

  getResultsByID(id){
    return this.aft.collection('results').doc(id).valueChanges()
  }

  getUserByID(id){
    return this.aft.collection('users').doc(id).valueChanges();
  }

  //End get By ID

  //Delete by Id begin

  deleteStudentByID(id){
    return this.aft.collection('students').doc(id).delete();
  }

  deleteTutorByID(id){
    return this.aft.collection('tutors').doc(id).delete();
  }

  deleteNoteByID(id){
    return this.aft.collection('notes').doc(id).delete();
  }

  deleteResultByID(id){
    return this.aft.collection('results').doc(id).delete();
  }

  deleteUserByID(id){
    return this.aft.collection('users').doc(id).delete();
  }

  //Special Gets

  getStudentByPersonalId(personalId){
    return this.aft.collection('students', ref=>ref.where('personalId','==',personalId)).snapshotChanges()
  }
  
  getStudentNotes(student_key){
    return this.aft.collection('notes', ref=>ref.where('student_key','==',student_key)).snapshotChanges()
  }

  getStudentResults(student_key){
    return this.aft.collection('results', ref=>ref.where('student_key','==',student_key)).snapshotChanges()
  }

  getTutorStudents(tutor_key){
    return this.aft.collection('students', ref=>ref.where('tutor_key','==',tutor_key)).snapshotChanges()
  }

  //Begin ADD

  addStudent(student){
    this.aft.collection('students').add(student).then(data=>{
      console.log("Estudiante agregado",data)
    });
  }

  addTutor(tutor){
    this.aft.collection('tutors').add(tutor).then(data=>{
      console.log("tutor agregado",data)
    });
  }

  addNote(note){
    this.aft.collection('notes').add(note).then(data=>{
      console.log("note agregado",data)
    });
  }

  addResult(result){
    this.aft.collection('results').add(result).then(data=>{
      console.log("result agregado",data)
    });
  }

  addUser(user){
    this.aft.collection('users').add(user).then(data=>{
      console.log("ouser agregada",data)
    });
  }

  // End Add
}
