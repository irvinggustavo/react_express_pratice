import React, { Component } from 'react';
import axios from 'axios';

// Update the code below to get and update data from the back-end server.
// Note that this is the front-end server, and you will have to configure
// the back-end server to allow cross-origin resource sharing.

class App extends Component {
  state = {
    students: []
  };

  componentDidMount() {
    axios.get('http://localhost:8080/students')
    .then(res => {
      this.setState({
        students : res.data
      });
      console.log(res.data)
    })
  }

  addStudent = (e) => {
    e.preventDefault();
    // Add students to the back-end server, and then update
    // the state with the response
  };

  render() {
    const students = this.state.students.map((student) => {
      return (
        <li key={student.id} className="list-group-item">
          {`${student.name}: ${student.program}, ${student.grade}`}
        </li>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h2>Add Student</h2>
            <form onSubmit={this.addStudent} ref={form => this.form = form}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter Student Name" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="program">Program</label>
                <input type="text" id="program" placeholder="Enter Program" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="">Grade</label>
                <input type="text" id="grade" placeholder="Enter Grade" className="form-control" />
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="col-8">
            <h2>Students</h2>
            <ul className="list-group">
              {students}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
