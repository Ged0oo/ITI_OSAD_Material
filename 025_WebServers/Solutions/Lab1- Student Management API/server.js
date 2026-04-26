const express = require("express");
const app = express();

app.use(express.json());

let students = [];
let courses = [];

app.get("/students", (req, res) => {
    res.json(students);
});

app.post("/students", (req, res) => {
    const student = req.body;
    students.push(student);
    res.status(201).json(student);
});

app.get("/courses", (req, res) => {
    res.json(courses);
});

app.post("/courses", (req, res) => {
    const course = req.body;
    courses.push(course);
    res.status(201).json(course);
});

app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        Object.assign(student, req.body);
        res.json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

app.put("/courses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if (course) {
        Object.assign(course, req.body);
        res.json(course);
    } else {
        res.status(404).json({ message: "Course not found" });
    }
});

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

app.delete("/courses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = courses.findIndex(c => c.id === id);
    if (index !== -1) {
        courses.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Course not found" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});