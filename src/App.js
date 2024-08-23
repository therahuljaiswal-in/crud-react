import React, { useEffect, useState } from "react";
import { EmployeeData } from "./EmployeeData";

const App = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  };
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are You Sure You Want To DELETE item?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleSave = (e) => {
    let error = '';

    if(firstName === '')
      error += 'First name is requied, ';

    if(lastName === '')
      error += 'Last name is requied, ';

    if(age  <= 0 )
      error += 'Age is requied';


    if(error === '')
    {
      e.preventDefault();
      const dt = [...data];
      const newObject = {
        id: EmployeeData.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age,
      };
  
      dt.push(newObject);
      setData(dt);

    }
    else{
      alert(error);
    }

  };
  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;

    setData(dt);
    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge("");
    setIsUpdate(false);
  };

  return (
    <div className="app">
      <div>
        <h2 style={{display:"flex",
          width: "100%",
          height: "54px",
          alignItems:"center",
          justifyContent: "center",
          background:"Green",
          color:"White",
          marginBottom: "24px"

        }}>CRUD OPERATION</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems:"center",
          marginLeft:"20px",
          marginRight:"20px",
          marginBottom: "12px",
          marginTop: "36px",
          padding:"20px"
        }}
      >
        <div>
          <label>
            First Name :
            <input
              type="text "
              placeholder="Enter First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name :
            <input
              type="text "
              placeholder="Enter Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>
        <div>
          <label>
            Age :
            <input
              type="text "
              placeholder="Enter Your Age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
        </div>
        &nbsp;
        <div>
          {!isUpdate ? (
            <button className="btn btn-primary" onClick={(e) => handleSave(e)}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Update
            </button>
          )}
          &nbsp;
          <button className="btn btn-danger" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
