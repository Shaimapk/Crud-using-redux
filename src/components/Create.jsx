import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../app/features/userDetailSlice";

export default function Create() {

    const [user,setUser]=useState({
        name:'',
        email:'',
        age:'',
        gender:''
    });

    const dispatch = useDispatch();
    const {error}=useSelector((state)=>state.app);

    const getUserData =(e)=>{
        setUser(prev=>({...prev,[e.target.name]:e.target.value}));
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await dispatch(createUser(user));
            setUser({
                name:'',
                email:'',
                age:'',
                gender:''
            });
        }catch(error){
            alert(error);
        }
    }


    return (
        <div>
            <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={user.name} onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" name="age" value={user.age} onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" value="male" checked={user.gender==='male'} onChange={getUserData}/>
                        <label className="form-check-label">
                            Male
                        </label>
                    </div>
                <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" value="female" checked={user.gender==='female'} onChange={getUserData} />
                <label className="form-check-label">
                    Female
                </label>
                </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
            {error !== null &&
                alert(error)
            }
        </div>
    );
}
