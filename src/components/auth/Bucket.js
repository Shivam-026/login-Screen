import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link} from "react-router-dom";

const AddUser = () => {
    let history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const { username, email, phone, address } = user
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault()
        await axios.post("http://localhost:3004/users", user);
        alert("User added successfully");
        history.push("/Detail")
    }
    return (

        <div className="container">
             <div className>
        <button type="button" className="btn btn-secondary"><Link className="btn btn-warning btn-outline-dark mr-2" to="/Detail">
                Users Detail
        </Link></button>
            </div>
            <div className="w-50 mx-auto shadow p-4">
                <h1 className="text-center mb-4"><b><u>Enter Your details</u></b></h1>
                <form onSubmit={e => onSubmit(e)}>

                    <div className="form-group">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">🧍</span>
                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                required pattern="[a-zA-Z0-9]+"
                                placeholder="Enter Your Username" name="name" value={username}
                                onChange={e => onInputChange(e)} />
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">✉</span>
                        <input type="email" className="form-control" aria-label="email" aria-describedby="basic-addon1"
                            required="true" placeholder="Enter Email" name="email" value={email}
                            onChange={e => onInputChange(e)} />
                    </div>


                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">✆</span>
                        <input type="text" id= "phone" className="form-control" aria-label="mobile" aria-describedby="basic-addon1"
                        required pattern="[1-9]{1}[0-9]{9}"
                            placeholder="Enter Mobile Number" name="phone" value={phone}
                            onChange={e => onInputChange(e)} />
                    </div>
                    <div class="input-group mb-3" >
                        <span class="input-group-text" id="basic-addon1">🏗</span>
                        <input type="textarea" className="form-control" aria-label="mobile" aria-describedby="basic-addon1"
                            required="true" placeholder="Enter Your address" name="address" value={address}
                            onChange={e => onInputChange(e)} />
                    </div>

                    <button className="button is-success">Submit</button>
                </form>
            </div>
        </div>

    );
};
export default AddUser;