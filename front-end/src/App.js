import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    students: [],
  };

  componentDidMount() {
    axios.get("http://localhost:8080/students").then((res) => {
      this.setState({
        students: res.data,
      });
    });
  }

  addStudent = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/students", {
        name: this.form.name.value,
        program: this.form.program.value,
        grade: this.form.grade.value,
      })
      .then(
        axios.get("http://localhost:8080/students").then((res) => {
          this.setState({
            students: res.data,
          });
        })
      );
    this.form.name.value = "";
    this.form.program.value = "";
    this.form.grade.value = "";
  };

  clikHandler = (e) => {
    let i = e.target.id;
    let student = this.state.students[i];

    axios.delete("http://localhost:8080/students/" + student.id).then((res) => {
      this.setState({
        students: res.data,
      });
    });
  };

  render() {
    const students = this.state.students.map((student, i) => {
      return (
        <li key={student.id} className="list-group-item" name="student">
          {`${student.name}: ${student.program}, ${student.grade}`}
          <input
            type="submit"
            value="Remove"
            onClick={this.clikHandler}
            id={i}
          />
        </li>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h2>Add Student</h2>
            <form onSubmit={this.addStudent} ref={(form) => (this.form = form)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Student Name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="program">Program</label>
                <input
                  type="text"
                  id="program"
                  placeholder="Enter Program"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Grade</label>
                <input
                  type="text"
                  id="grade"
                  placeholder="Enter Grade"
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="col-8">
            <h2>Students</h2>
            <ul className="list-group">{students}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
