import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showUser } from "../app/features/userDetailSlice";
import ViewUserModel from "./ViewUserModel";

export default function Read() {
    const dispatch =  useDispatch();
    const {users,loading,error}=useSelector((state)=>state.app);
    const [selectedUser,setSelectedUser]=useState(null);
    const [showModal,setShowModal]=useState(false);

    useEffect(()=>{
        dispatch(showUser());
    },[dispatch]);

    const handleView =(user)=>{
        setSelectedUser(user);
        setShowModal(true);
    }


  return (
    <div className="w-50 mx-auto my-5 text-center">
        {loading && 
        <div>Loading....</div>
        }
        {error !== null &&
            <div>{error}</div>
        }
        {!loading && error===null &&
            <div>
                <h2>All Data</h2>
                {users.map((user)=>(
                    
                    <div className="card mb-3" key={user.id}>
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>
                            <p className="card-text">{user.age}</p>
                            <button className="btn btn-link card-link" onClick={()=>handleView(user)}>View</button>
                            <Link  className="card-link">Edit</Link>
                            <Link  className="card-link">Delete</Link>
                        </div>
                    </div>

                ))}
            </div>
        }
        {selectedUser && showModal &&
        <ViewUserModel 
            user={selectedUser} 
            closeModal={()=>{
                setSelectedUser(null);
                setShowModal(false)
            }} 
        />
        }
    </div>
  )
}
