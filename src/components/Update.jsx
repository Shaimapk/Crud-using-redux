import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { editUser, getUser } from "../app/features/userDetailSlice";

export default function Update() {

    const [user,setUser]=useState({
        name:"",
        email:"",
        age:"",
        gender:""
    });

    const {id}= useParams();

    const dispatch = useDispatch();

    const userDetail= useSelector((state)=>state.app.user);

    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getUser(id));
        
    },[dispatch,id]);

    useEffect(() => {
    if (userDetail) {
        setUser(userDetail);
    }
}, [userDetail]);

     const editUserData =(e)=>{
        setUser(prev=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleEdit =async (e)=>{
        e.preventDefault();
        try{
            await dispatch(editUser(user)).unwrap();
            navigate('/read');
        }
        catch(error){
            console.log(error);
            
        }
        
        
    }
    
  return (
    <div>
        <form className="w-50 mx-auto my-5" onSubmit={handleEdit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={user.name} onChange={editUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={editUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" name="age" value={user.age} onChange={editUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" value="male" checked={user.gender==='male'} onChange={editUserData}/>
                        <label className="form-check-label">
                            Male
                        </label>
                    </div>
                <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" value="female" checked={user.gender==='female'} onChange={editUserData} />
                <label className="form-check-label">
                    Female
                </label>
                </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
    </div>
  )
}
