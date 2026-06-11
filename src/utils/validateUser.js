
export const formValidation =(user,users,isEdit=false)=>{

        const errors={};

        if(!user.name.trim())
             errors.name="Name is required"

        if(!user.email.trim())
             errors.email="Email is required"
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email))
             errors.email="Invalid email"

        //check for duplicate email id
        const existingUser = users.find((ele)=>ele.email.toLowerCase()===user.email.toLowerCase());
        if(existingUser &&
        (!isEdit ||  user.id!==existingUser.id)){

            errors.email="Email already exists";
        }
    
        if(!user.age)
             errors.age="Age is required"

        if(!user.gender)
             errors.gender="Gender is required"

        return errors;
    }
