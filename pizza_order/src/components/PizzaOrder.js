import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './pizzaOrder.css'

function PizzaOrder(){
    const pizzaValues = { Crust:"", Flavor:"", Size: "", Table_No: "" };
    const [formValues, setFormValues] = useState(pizzaValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const crustValue = useRef();
    const flavorValue = useRef();
    const sizeValue = useRef();
    const table_noValue = useRef();

    const navigate = useNavigate();

    const handleSubmit = async(event) =>{
        event.preventDefault();

        const newOrders = {
            Crust: crustValue.current.value,
            Flavor: flavorValue.current.value,
            Size: sizeValue.current.value,
            Table_No: table_noValue.current.value
        };

        try{
            const orders =await axios.post('https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza',newOrders);
            console.log(orders);
            setIsSubmitted(true);
        }catch(err){
            console.log(err);
        }
        setFormErrors(validate(formValues));
    }

    const handleChange = (event) =>{
        const {name,value} = event.target;
        setFormValues({...formValues,[name]:value});
        console.log(formValues);
    };

    useEffect(()=>{
        if(Object.keys(formErrors).length === 0 && isSubmitted) {

        }
    }, [formErrors,isSubmitted,navigate]);

    const validate = (values) => {
        const errors = {}
        if (!values.Crust){
            errors.Crust = "Required!";
        }
        if (!values.Flavor){
            errors.Flavor = "Required!";
        }
        if (!values.Size){
            errors.Size = "Required!";
        }
        if (!values.Table_No){
            errors.Table_No = "Required!";
        }
        return errors;
    }
    const handleCancel = () => {
        navigate('/cancelOrder');
    };
    return (
        <div>
            <section className='form my-5 mx-5'>
                <div className='container pt-7'>
                    <div className='row lg-0'>
                        <div className='col-lg-6'>
                            <img src='/images/pizza.jpg' className="img-fluid" alt=''/>
                            <div className='title'>
                                <p className='name2'>Pizza Palace</p>
                            </div>
                            
                        </div>
                            <div className='col-lg-6 px-5 pt-5'>
                                <h2 className='font-weight-bold py-3'>Add Pizza Details</h2>
                                <form className='' onSubmit={handleSubmit}>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <select placeholder='Crust' className='form-control mt-4' ref={crustValue} value={formValues.Crust} onChange={handleChange} name='Crust'>
                                                <option >Classic</option>
                                                <option >Cheese</option>
                                            </select>
                                        </div>
                                        <p>{formErrors.Crust}</p>
                                        
                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                        <select placeholder='Flavor' className='form-control mt-4' ref={flavorValue} value={formValues.Flavor} onChange={handleChange} name='Flavor'>
                                                <option>Cheese</option>
                                                <option>Veggie</option>
                                                <option>Pepperoni</option>
                                                <option>Meat</option>
                                                <option>Margherita</option>
                                            </select>
                                        </div>
                                        <p>{formErrors.Flavor}</p>
                                       
                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>

                                        <select placeholder='Size' className='form-control mt-4' ref={sizeValue} value={formValues.Size} onChange={handleChange} name='Size'>
                                                <option>Small</option>
                                                <option>Medium</option>
                                                <option>Large</option>
                                                <option>Fiesta</option>
                                            </select>
                                            
                                        </div>
                                        <p>{formErrors.Size}</p>
                                        
                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <input type='number' 
                                            placeholder='Table_No' 
                                            name='Table_No'
                                            value={formValues.Table_No}
                                            onChange={handleChange}
                                            ref={table_noValue}
                                            className='form-control mt-4' 
                                           
                                            />
                                        </div>
                                        <p>{formErrors.Table_No}</p>
                                        
                                    </div>
                                    
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <button type='submit' className='btn1 mt-3 mb-5 '>Add Item</button>
                                            {isSubmitted &&
                                                <div>
                                                    <p className='successTXT'>ITEM Added Successfully</p>
                                                    <button className='btn btn-success' onClick={handleCancel}>ORDER PAGE</button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>

            </section>
        </div>
    );

}

export default PizzaOrder;