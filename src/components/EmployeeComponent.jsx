import React, { useState,useEffect } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate ,useParams} from 'react-router-dom'

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })
    const {id} =useParams();
    const navigator = useNavigate()
    useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName)
                setEmail(response.data.email)
            }).catch(error=>{
                console.error(error);
            })
        }
    }, [id])
  
    const saveOrUpdateEmployee = (e) => {
        e.preventDefault()
       
        if (validateForm()) {
            const employee = { firstName, lastName, email }
            console.log(employee)
                
                if(id){
                    updateEmployee(id,employee).then((response)=>{
                        console.log(response.data);
                        navigator('/employees')
                    }).catch(error=>{
                        console.error(error);   
                    })  
                } else{
                    createEmployee(employee).then((response) => {
                        console.log(response.data)
                        navigator('/employees')
                    }).catch(error=>{
                        console.error(error);  
                })                  
        }
    }
}  

    function validateForm() {
        let valid = true
        const errorCopy = { ...errors }

        if (firstName.trim()) {
            errorCopy.firstName = ''
        } else {
            errorCopy.firstName = "First Name is required"
            valid = false
        }
        if (lastName.trim()) {
            errorCopy.lastName = ''
        } else {
            errorCopy.lastName = "Last Name is required"
            valid = false
        }
        if (email.trim()) {
            errorCopy.email = ''
        } else {
            errorCopy.email = "Email is required"
            valid = false
        }
        setErrors(errorCopy)
        return valid
    }

    function pageTitle(){
        if(id){
            return <h2 className="text-center mb-4">Update Employee</h2>
                            
        }else{
            return <h2 className="text-center mb-4">Add Employee</h2>
                            
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                           {
                            pageTitle()
                           }
                            <form >
                               
                                <div className="form-group mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        placeholder="Enter First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                </div>

                                {/* Last Name Field */}
                                <div className="form-group mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        placeholder="Enter Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                </div>

                                {/* Email Field */}
                                <div className="form-group mb-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                             {   /* Submit Button */}
                                <div className="text-center">
                                    <button type="submit" onClick={saveOrUpdateEmployee} className="btn btn-primary btn-lg w-100">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent
