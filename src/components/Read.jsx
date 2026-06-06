import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showUser } from "../app/features/userDetailSlice";

export default function Read() {
    const dispatch =  useDispatch();
    const {users,loading,error}=useSelector((state)=>state.app);

    useEffect(()=>{
        dispatch(showUser());
    },[dispatch]);


  return (
    <div className="w-50 mx-auto my-5 text-center">
        {loading && 
        <div>Loading....</div>
        }
        {error !== null &&
            <div>{error}</div>
        }
        {!loading && error===null &&
            <>
                <h2>All Data</h2>
                {users.map((user)=>(
                    
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{user.email}</h6>
                            <p className="card-text">{user.age}</p>
                            <Link className="card-link">View</Link>
                            <Link  className="card-link">Edit</Link>
                            <Link  className="card-link">Delete</Link>
                        </div>
                    </div>

                ))}
            </>
        }
    </div>
  )
}
