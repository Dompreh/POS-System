import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

function Homepage() {
  return (
    <MainLayout>
         <div className="container mt-5">
            <div className="bg-light p-5 mt-4 rounded-3">
                <h1>Welcome to the simple POS for small business</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quod.</p>
                <p>If you have an issue, call 443-444-xxx anytime</p>
                <Link to="/pos" className="btn btn-primary"
                >Click here to buy products</Link>
            </div>
        </div>
        
    </MainLayout>
  );
}

export default Homepage;
