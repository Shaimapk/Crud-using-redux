import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, showUsers } from "../app/features/userDetailSlice";
import ViewUserModel from "./ViewUserModel";

export default function Read() {
    const dispatch =  useDispatch();
    const {users,loading,error,searchData}=useSelector((state)=>state.app);
    const [selectedUser,setSelectedUser]=useState(null);
    const [showModal,setShowModal]=useState(false);
    const [genderFilter,setGenderFilter]=useState('all');
    
    useEffect(()=>{
        dispatch(showUsers());
    },[dispatch]);

    const handleView =(user)=>{
        setSelectedUser(user);
        setShowModal(true);
    }

    const filteredUsers = users.filter((user)=>(
        user.name.toLowerCase().includes(searchData.toLowerCase()) &&
        ( genderFilter==='all' || user.gender===genderFilter)
    ));
    


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
                
                <div className="d-flex justify-content-center gap-4 m-2">
                    <div>
                        <input className="form-check-input" type="radio" name="gender" value="all" checked={genderFilter==='all'} onChange={(e)=>setGenderFilter(e.target.value)}/>
                        <label className="form-check-label">All</label>
                    </div>
                    <div>
                        <input className="form-check-input" type="radio" name="gender" value="male" checked={genderFilter==='male'} onChange={(e)=>setGenderFilter(e.target.value)}/>
                        <label className="form-check-label">Male</label>
                    </div>
                    <div>
                        <input className="form-check-input" type="radio" name="gender" value="female" checked={genderFilter==='female'} onChange={(e)=>setGenderFilter(e.target.value)}/>
                        <label className="form-check-label">Female</label>
                    </div>
                </div>

                {filteredUsers.map((user)=>(
                    
                    <div className="card mb-3" key={user.id}>
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>
                            <p className="card-text">{user.age}</p>
                            <button className="btn btn-link card-link" onClick={()=>handleView(user)}>View</button>
                            <Link to={`/edit/${user.id}`}  className="btn btn-link card-link">Edit</Link>
                            <button  className="btn btn-link card-link" onClick={()=>dispatch(deleteUser(user.id))}>Delete</button>
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
