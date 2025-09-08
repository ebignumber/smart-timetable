// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Teachers
export const getTeachers = () => API.get('/teachers');
export const addTeacher = (teacher) => API.post('/teachers', teacher);

// Subjects
export const getSubjects = () => API.get('/subjects');
export const addSubject = (subject) => API.post('/subjects', subject);

// Classrooms
export const getClassrooms = () => API.get('/classrooms');
export const addClassroom = (classroom) => API.post('/classrooms', classroom);

// Timetables
export const saveTimetable = (timetableData) => API.post('/timetables', timetableData);
export const getTimetables = () => API.get('/timetables');
