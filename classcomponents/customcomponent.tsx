import * as React from "react";
import { Component } from "react";
import { Employee } from "../models/employee";

interface IProps {
  message?: string;
  data?:Employee // the object type
  getSelectedData?:(emp:Employee)=>void // the method for communication
}
interface IState {
  EmpNo: number;
  EmpName: string;
  DeptName: string;
  Designation: string;
  Departments: Array<string>;
  Designations: Array<string>;
  Employees: Array<Employee>;
  Headers: Array<string>;
  Employee: Employee;
  [key: string]: any; // the key is the name of each IState property
}

class CustomComponent extends Component<IProps, IState> {
  // state object definition with initialization
  state: IState = {
    EmpNo: 0,
    EmpName: "",
    DeptName: "",
    Designation: "",
    Departments: ["IT", "HRD", "ADMIN"],
    Designations: ["Manager", "Lead", "Developer"],
    Employee: new Employee(0, "", "", ""),
    Headers: [],
    Employees: new Array<Employee>()
  };
  constructor(props) {
    super(props);

    // iterate over an Employee object and read its properties
    for(const p in this.state.Employee) {
      this.state.Headers.push(p);
    }
  }

  // the following method will be invoked and executed for onChange
  // event of InPut Element as well as Select element
  handleChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    //[evt.target.name] --> Object.keys() for IState
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(`Value entered is ${evt.target.value}`);
  };
  clear = () => {
    this.setState({ EmpNo: 0 });
    this.setState({ EmpName: "" });
    this.setState({ DeptName: "" });
    this.setState({ Designation: "" });
  };

  showData = (emp:Employee) => {
    this.setState({ EmpNo: emp.EmpNo });
    this.setState({ EmpName: emp.EmpName });
    this.setState({ DeptName: emp.DeptName });
    this.setState({ Designation: emp.Designation });
  };

  save = () => {
    // define a templ array like Employees
    const tempArray = this.state.Employees.slice();
    //  push data in the temp array
    tempArray.push({
      EmpNo: this.state.EmpNo,
      EmpName: this.state.EmpName,
      DeptName: this.state.DeptName,
      Designation: this.state.Designation
    });
    // set the state for Employees using the tempArray
    this.setState({Employees:tempArray});
    console.log(`Data in Employees is ${JSON.stringify(this.state.Employees)}`);
  };
  render() {
    return (
      <div className="container">
        <h2>Employees Information</h2>
        <div className="form-group">
          <label htmlFor="EmpNo">EmpNo</label>
          <input
            type="text"
            className="form-control"
            value={this.state.EmpNo}
            name="EmpNo"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="EmpName">EmpName</label>
          <input
            type="text"
            className="form-control"
            value={this.state.EmpName}
            name="EmpName"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="DeptName">Department</label>
          <select
            className="form-control"
            name="DeptName"
            value={this.state.DeptName}
            onChange={this.handleChange}
          >
            <option>Select DeptName</option>
            {this.state.Departments.map((d, i) => (
              <option key={i}>{d}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Designation">Designations</label>
          <select
            className="form-control"
            name="Designation"
            value={this.state.Designation}
            onChange={this.handleChange}
          >
            <option>Select Designation</option>
            {this.state.Designations.map((d, i) => (
              <option key={i}>{d}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input type="button" value="New" className="btn btn-warning"
            onClick={this.clear} />
          <input type="button" value="Save" className="btn btn-success" 
          onClick={this.save}/>
        </div>
        <hr />
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              {this.state.Headers.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          </thead>
          <tbody>
              {
                this.state.Employees.map((emp,i) => (
                  <TableRowComponent getSelectedData={this.showData} key={i} data={emp}/>
                ))
              }
          </tbody>
        </table>
      </div>
    );
  }
}


class TableRowComponent extends Component<IProps, IState> {
  constructor(props){
    super(props);
    console.log(`in child ${JSON.stringify(this.props.data)}`);
  }
  onRowClick=()=>{
    this.props.getSelectedData(this.props.data);
  }
   render(){
     return(
        <tr onClick={this.onRowClick}>
           <td>{this.props.data.EmpNo}</td>
           <td>{this.props.data.EmpName}</td>
           <td>{this.props.data.DeptName}</td>
           <td>{this.props.data.Designation}</td>
        </tr>
     );
   }
}


export default CustomComponent;
