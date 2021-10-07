import './User.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const User = () => {
    const { id } = useParams();
    const [ data, setData ] = useState(null);

    useEffect(() => {
        fetch('https://6155a05293e3550017b08b11.mockapi.io/users/' + id)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
            })
    },[]);

    return (  
        <div className="user">
            <h2 className="header">Profile</h2>
            <div className="user-card">
                {data ? 
                <div>
                    <h2>{data.name}</h2>
                    <p><span>Email:</span> {data.email}</p>
                    <p><span>City:</span> {data.city}</p>
                    <p><span>Account created at:</span> {new Date(data.createdAt.slice(0,-1)).toLocaleString('en-US')}</p>
                </div>
                : <div>Trying to access the data...</div>
                }
            </div>
        </div>
    );
}
 
export default User;