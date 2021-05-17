import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const Detail = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3004/users");
        setUser(result.data.reverse());
    };

    const deleteUser = async id => {
        await axios.delete(`http://localhost:3004/users/${id}`);
        loadUsers();

    }

    return (
        <div className="container">
            <div className>
        <button type="button" className="btn btn-secondary"><Link className="btn btn-warning btn-outline-dark mr-2" to="/Bucket">
                AddUser
        </Link></button>
        <button type="button" className="btn btn-secondary"><Link className="btn btn-warning btn-outline-dark mr-2" to="/">
                Logout
        </Link></button>
            </div>
            <div className="py-4">
                <h1>Users Details</h1>
                <table class="table border shadow">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email-ID</th>
                            <th scope="col">Contact Number</th>
                            <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                
                                    <td>
                                        <Link class="btn btn-danger mr-2" onClick={()=>deleteUser(user.id)}>Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Detail;