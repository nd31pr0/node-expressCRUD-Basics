const express = require("express")
fs = require('fs');
const app = express();
app.use(express.json());


//Get request for student data.
app.get("/student/all", (req, res) =>{
    try{
        const data = fs.readFileSync("student.json", "utf8");
        const studentData = JSON.parse(data);
        console.log(studentData)
        res.status(200).send(studentData);

    } catch(err) {
        res.status(500).json({error: true, message:"something went wrong"});
    }});



//CRUD 
//Create a student
app.post('/student', (req, res) => {
    const newStudent = []
    let studentLength = 0;
    let currentStudentData = [];

    
    try {
        const data = fs.readFileSync('student.json', 'utf8');
        currentStudentData = JSON.parse(data);
        studentLength = currentStudentData.length;
        
    } catch(err) {
        res.status(500).json({error: true, message:"something went wrong "})
    }
    newStudent.id = studentLength + 1;
    newStudent.name = req.body.name;
    newStudent.age = req.body.age;
    const content = [...currentStudentData, newStudent];
    console.log(content)
    try {
        fs.writeFileSync('student.json', JSON.stringify(content, "", 4));

    } catch(err){
        console.error(err);
    }
    res.status(200).send(content);
    
});



//edit student with id
app.put('/student/:id', (req, res) => {
    console.log(req.params);
    console.log(req.body);

    const newStudent = {};
    let currentStudentData = [];

    try {
        const data = fs.readFileSync("students.json", "utf8");
        currentStudentData = JSON.parse(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: true, message: "something went wrong"});
    }

    currentStudentData = currentStudentData.map((student) => {
        if(student.id == req.params.studentId ){
            const editedStudent = { 
                name: req.body.name || student.name,
                age: req.body.age || student.age}
            return editedStudent;  
        }
        return student;
    });
    console.log(currentStudentData);
    try {
        fs.writeFileSync(
            "students.json",
            JSON.stringify(currentStudentData, "", 4)
        )
    }catch(err){
        console.log(err);
    }
})

//DELETE a student with studentId
app.delete('/student/:studentId', (req, res) => {
    let currentStudentData = []
    try {
        const data = fs.readFileSync("student.json", "utf8");
        currentStudentData = JSON.parse(data);
    }catch (err) {
        console.log(err);
        res.status(500).json({error: true, message: "something went wrong"})
    }
    currentStudentData = currentStudentData.filter((student) => {
        if (student.id == req.params.studentId) {
            return false;
        }
        return true;
    })
    try {
        fs.writeFileSync(
            "student.json",
            JSON.stringify(currentStudentData, "", 4)
            
        );
    }catch(err) {
        console.error(err);
    }
})

app.listen(9001, ()=> {
    console.log("server running on port 9001")
})