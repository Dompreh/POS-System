import React, {  useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import MainLayout from "../Layout/MainLayout";
import axios from "axios"
import "./POS.css"
import {  toast } from 'react-toastify';
import { ComponentToPrint } from "../Component/ComponentToPrint";
import { useReactToPrint } from 'react-to-print';

function POS() {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [cart, setCart] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)

    const handleReactToPrint = useReactToPrint({
        content: () => componentRef.current,
      });

    const handlePrint = () =>{
        handleReactToPrint()
    }

    const componentRef = useRef()

    const toastOptions ={
        autoClose:2000,
        hideProgressBar:true,
        pauseOnHover:true,
    }

    const fetchProducts = async() => {
        setIsLoading(true)
        const result = await axios.get('products')
        setProducts(await result.data)
        setIsLoading(false)
    }



    const addToCart = async (product) => {
        //check if the adding product exist
        let findProductToCart = await cart.find(i =>{
            return i.id === product.id
        })

        if(findProductToCart){
            let newCart =[]
            let newItem;

            cart.forEach(cartItem => {
                if(cartItem.id === product.id){
                    newItem ={
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1)
                    }
                    newCart.push(newItem)
                }
                else {
                    newCart.push(cartItem)
                }
            })

            setCart(newCart)
            toast(`Added ${newItem.name} to cart`,toastOptions)
        }else{
            let addingProduct = {
                ...product,
                'quantity': 1,
                'totalAmount': product.price,
            }
            setCart([...cart, addingProduct])
            toast(`Added ${product.name} to cart`, toastOptions)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const removeProduct = async(product) =>{
        const newCart = cart.filter(cartItem => cartItem.id !== product.id)
        setCart(newCart)
    }

    useEffect(() => {
        let newTotalAmount= 0
        cart.forEach(icart => {
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount)
        })
        setTotalAmount(newTotalAmount);
    },[cart])


    return (
        <MainLayout>
            <div className="row">
                <div className="col-lg-8">
                    {isLoading ? "Loading..." : <div className="row p-5">
                        {products.map((product, key) => 
                            <div key={key} className="col-lg-4 mb-4">
                                <div className=" pos px-1 text-center border mt-3" onClick={()=>addToCart(product)}>
                                    <p className="name">{product.name}</p>
                                    <img src={product.image} alt={product.name} className="image  rounded img-fluid img-center" />
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    }
                </div>
                <div className="col-lg-4  mt-3">
                    <div style={{display:"none"}}>
                        <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
                    </div>
                    <div className=" table-responsive bg-dark">
                        <table className="table table-responsive table-dark table-hover overflow-hidden">
                            <thead>
                                <tr>
                                    <td>id</td>
                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>Qty</td>
                                    <td>Total</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {cart ? cart.map((cartProduct, key)=> <tr key={key}>
                                
                                    <td>{cartProduct.id}</td>
                                    <td>{cartProduct.name}</td>
                                    <td>${cartProduct.price}</td>
                                    <td>{cartProduct.quantity}</td>
                                    <td>${cartProduct.totalAmount}</td>
                                    <td>
                                    <button className="btn bg-danger white btn-xs btn-xs" onClick={()=> removeProduct(cartProduct)}>Remove</button>
                                    </td>
                                   
                                </tr>): "No item in Cart"}
                            </tbody>
                        </table>
                        <h2 className="px-2 text-white">Total Amount: ${totalAmount}</h2>
                    </div>

                    <div className="mt-3">
                        {totalAmount !== 0 ? <div>
                            <button className="btn btn-primary" onClick={handlePrint}>Pay Now</button>
                        </div> : "Please add a product to cart"}
                    </div> 
                </div>
            </div>
        </MainLayout>
    );
}

export default POS;
