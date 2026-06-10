import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { editUser, getUser } from "../app/features/userDetailSlice";
import { formValidation } from "../utils/validateUser";

export default function Update() {

    const [user,setUser]=useState({
        name:"",
        email:"",
        age:"",
        gender:""
    });

    const {error}=useSelector((state)=>state.app);

    const {id}= useParams();

    const dispatch = useDispatch();

    const userDetail= useSelector((state)=>state.app.user);

    const navigate = useNavigate();

    const [validationErrors,setValidationErrors]=useState({});

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
        setValidationErrors(prev=>({...prev,[e.target.name]:''}));
    }

    const handleEdit =async (e)=>{
        e.preventDefault();
        const errors = formValidation(user);
        setValidationErrors(errors);
        if(Object.keys(errors).length>0) return;
        
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
        <form className="w-50 mx-auto my-5" onSubmit={handleEdit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={user.name} onChange={editUserData} />
                    {validationErrors.name && 
                        <p className="text-danger small">{validationErrors.name}</p>
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={editUserData} />
                    {validationErrors.email && 
                        <p className="text-danger small">{validationErrors.email}</p>
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" name="age" value={user.age} onChange={editUserData} />
                    {validationErrors.age && 
                        <p className="text-danger small">{validationErrors.age}</p>
                    }
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
  )
}
