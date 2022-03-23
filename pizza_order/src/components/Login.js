import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './login.css';

function Login(){
    const loginValues = { username: "test", password: "test"};
    const [formvalues, setFormValues] = useState(loginValues);
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

  const nameValue = useRef();
  const passwordValue = useRef();

  let navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} =event.target;
    setFormValues({ ...formvalues, [name]: value});
    console.log(formvalues);
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    try{
      const result = await axios.post('https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza', loginValues);
      console.log(result);
      setIsSubmitted(true);
    }catch(err){
     console.log(err);
    }
    setFormErrors(validate(formvalues));
  }
  const handleNavigate = () => {
    navigate('/');
  };
  useEffect(() => {
    console.log(formErrors)
    if(Object.keys(formErrors).length === 0 && isSubmitted) {
        console.log(formvalues)
        navigate('/cancelOrder');
    }
  },[formErrors,formvalues,isSubmitted,navigate])
    
  const validate = (values) => {
    const errors = {}
    
    if (!values.username){
        errors.username = "Invalid Username!";
    }
    if (!values.password){
        errors.password = "Invalid Password!";
    }
    return errors;
  }
  return (
    <div>
        <section className='form my-5 mx-5'>
            <div className='container'>
                <div className='row lg-0'>
                    <div className='col-lg-6'>
                    <img src='/images/pizza.jpg' className="img-fluid" alt=''/>
                        <div className='title'>
                            <p className='name1'>Welcome to</p>
                            <p className='name2'>Pizza Palace</p>
                        </div>
                        
                    </div>
                        <div className='col-lg-6 px-5 pt-5'>
                            <h2 className='font-weight-bold pt-5 pb-3'>Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-row'>
                                    <div className='col-lg-7'>
                                        <input type='text' 
                                        placeholder='User Name'
                                        name='username'
                                        ref={nameValue} 
                                        className='form-control mt-4' 
                                        value={ formvalues.username} 
                                        onChange={ handleChange }/>
                                    </div>
                                    <p>{formErrors.username}</p>
                                </div>
                                <div className='form-row'>
                                    <div className='col-lg-7'>
                                        <input type='password' 
                                        placeholder='password' 
                                        name='password'
                                        ref={passwordValue}
                                        className='pass form-control mt-4' 
                                        value={ formvalues.password} 
                                        onChange={ handleChange }/>
                                    </div>
                                    <p>{formErrors.password}</p>
                                </div>
                                <div className='form-row'>
                                    <div className='col-lg-7'>
                                        <button type='submit' className='btn1 mt-3 mb-5'>Login</button>
                                    </div>
                                </div>
                                <p>Don't have an account <a href='#' onClick={handleNavigate}>Register here</a></p>
                            </form>
                        </div>
                  </div>
            </div>
        </section>
    </div>
  );
}

export default Login;