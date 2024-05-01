import React, { useState, useEffect } from "react";
import { removeProduct, getProduct } from "../api/invms";
import Layout from "../components/layout";

const RemoveProduct = () => {
    const [products, setProducts] = useState([]);
    
    const [values, setValues] = useState({
        item_number: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getProduct();
                setProducts(response.data.users);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        }

        fetchData();
    }, []);

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Call the removeProduct API with the item number from state
            const { data } = await removeProduct(values.item_number);
            
            // Check if the deletion was successful
            if (data.success) {
                setSuccess(data.message); // Set success message
                setError(''); // Clear any previous error message
                // After successful removal, refetch the product data to update the table
                const response = await getProduct();
                setProducts(response.data.users);
            } else {
                // If deletion was not successful, set error message
                setError(data.error);
                setSuccess('');
            }
            // Clear the input field after submission
            setValues({ item_number: '' });
        } catch (error) {
            console.error("Error removing product:", error);
            // Set error message
            setError("Product Not Found");
            setSuccess('');
        }
    };

    return (
        <Layout>
            <div className="container mt-5">
                <h1 className="text-center">Remove Product</h1>
                <form onSubmit={onSubmit}>
                    <div className="d-flex justify-content-center">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder='Enter item number'
                            name="item_number"
                            value={values.item_number}
                            onChange={onChange}
                            required
                        />
                        <button type='submit' className='btn btn-primary'>
                            Remove
                        </button>
                    </div>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
                {success && <p className="text-success mt-3">{success}</p>}
               
            </div>
        </Layout>
    );
};

export default RemoveProduct;
