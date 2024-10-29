import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [key, setKey] = useState('');  // Key là username hoặc email người dùng nhập.
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);  // Thông báo lỗi.
    const [success, setSuccess] = useState(null);  // Thông báo thành công.

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Tạo đối tượng dữ liệu để gửi đến API
        const loginData = {
            key,
            password,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();
            
            if (!response.ok) {
                setError(result.message);
                setSuccess(null);
            } else {
                setSuccess(result.message);
                setError(null);
            }
        } catch (error) {
            setError("Lỗi mạng. Không thể kết nối tới server.");
            setSuccess(null);
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 flex flex-col items-center p-4 min-h-screen">
            <h2 className="text-4xl font-bold mb-6 mt-5">Đăng Nhập</h2>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md space-y-4 text-center font-bold">
                <label className="block">
                    <span className="text-gray-700">Tên người dùng hoặc email:</span>
                    <input 
                        type="text" 
                        value={key} 
                        onChange={(e) => setKey(e.target.value)} 
                        required 
                        className="font-normal mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Mật khẩu:</span>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="font-normal mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                {error && <p className="text-red-600 font-bold mt-3">{error}</p>} {/* Hiển thị thông báo lỗi */}
                {success && <p className="text-green-600 font-bold mt-3">{success}</p>} {/* Hiển thị thông báo thành công */}
                <button 
                    type="submit" 
                    className="w-1/2 mt-5 py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Đăng Nhập
                </button>
            </form>
            
            <div className='mt-4 flex justify-between'>
                <Link 
                    to="/" 
                    className="w-44 m-2 py-2 px-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition duration-200 text-center inline-block"
                >
                    Trở Về Trang Chủ
                </Link>
                <Link 
                    to="/register" 
                    className="w-44 m-2 py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition duration-200 text-center inline-block"
                >
                    Đăng Ký
                </Link>
            </div>
        </div>
    );
}

export default Login;
