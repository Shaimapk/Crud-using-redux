import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../app/features/userDetailSlice";
import { useNavigate } from "react-router-dom";
import { formValidation } from "../utils/validateUser";

export default function Create() {

    const [user,setUser]=useState({
        name:'',
        email:'',
        age:'',
        gender:''
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {error}=useSelector((state)=>state.app);

    const [validationErrors,setValidationErrors]=useState({});


    const getUserData =(e)=>{
        setUser(prev=>({...prev,[e.target.name]:e.target.value}));
        setValidationErrors(prev=>({...prev,[e.target.name]:""}));
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const errors=formValidation(user)
        setValidationErrors(errors);

        if(Object.keys(errors).length > 0) return;
        
        try{
            await dispatch(createUser(user)).unwrap();
            setUser({
                name:'',
                email:'',
                age:'',
                gender:''
            });
            navigate('/read');
        }catch(error){
            console.log(error);
            ;
        }

    }


    return (
        <div>
            <form className="w-50 mx-auto my-5" onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={user.name} onChange={getUserData} />
                    {validationErrors.name && 
                        <p className="text-danger small">{validationErrors.name}</p>
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={getUserData} />
                    {validationErrors.email && 
                        <p className="text-danger small">{validationErrors.email}</p>
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" name="age" value={user.age} onChange={getUserData} />
                    {validationErrors.age && 
                        <p className="text-danger small">{validationErrors.age}</p>
                    }
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
                {validationErrors.gender && 
                        <p className="text-danger small">{validationErrors.gender}</p>
                }
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
            {error &&
                <p className="text-danger w-50 mx-auto my-5 small">{error}</p>
            }
        </div>
    );
}
