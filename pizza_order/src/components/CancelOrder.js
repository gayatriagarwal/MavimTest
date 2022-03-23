import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './cancelOrder.css'

function CancelOrder(){

    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/pizzaOrder");
    };
    
    const deleteItem = async (id) => {
        try{
            await axios.delete(`https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza/${id}`);
        }catch(err){
            console.log(err);
        }
        orders.filter((orders) => {
            return(orders.id !== id);
        });

        if(orders.id !== id){
            alert('The record is deleted successfully!');
        }else{
            alert('Oops! Something went wrong, please try again!');
        }
        setOrders(orders);
    };
    
    useEffect( () => {
        const fetchOrderList = async () => {
            const orderList = await axios.get('https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza');
            setOrders(orderList.data);
            //console.log(orderList.data);
        };
        fetchOrderList();
    }, [setOrders,{...orders}]);

    const handleLogout = () => {
        localStorage.removeItem("user")
        navigate('/');
    };
    return (
        <div>
            <h3 className='list'>Pizza Order List</h3>
            <span className='user col-lg-2'>{localStorage.getItem("user")}</span><button className='logoutbtn col-lg-2' type="button" onClick={handleLogout}>Logout</button>
            <div className='container table-responsive'>
                <button className='button1 btn btn-success my-4' onClick={handleClick}>Add Order</button>
            <table className="td1 table  my-4">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Order_No</th>
                        <th scope="col">Crust</th>
                        <th scope="col">Flavour</th>
                        <th scope="col">Size</th>
                        <th scope='col'>Table_No</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.Crust}</td>
                                <td>{item.Flavor}</td>
                                <td>{item.Size}</td>
                                <td>{item.Table_No}</td>
                                <td className='btn btn-outline-danger btn-sm py-1 mt-1' onClick={() => deleteItem(item.id)}>Delete</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default CancelOrder;   