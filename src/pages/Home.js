import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function Home() {
    return (
        <div className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-r from-gray-300 to-gray-400">
            <h2 className="text-4xl font-bold mb-10 mt-5">Trang Chủ</h2>
            <Link 
                to="/user/register" 
                className="w-60 m-2 py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition duration-200 text-center inline-block"
            >
                Đăng Ký
            </Link>
            <Link 
                to="/user/login" 
                className="w-60 mt-4 m-2 py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200 text-center inline-block"
            >
                Đăng Nhập
            </Link>

        </div>
    );
}

export default Home;
