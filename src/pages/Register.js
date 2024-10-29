import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import '../index';

function Register() {
    const [username, setUsername] = useState(''); // Tên người dùng
    const [email, setEmail] = useState('');       // Email
    const [password, setPassword] = useState('');  // Mật khẩu
    const [rePassword, setRePassword] = useState('');  // Mật khẩu lặp lại
    const [error, setError] = useState(null);        // Thông báo lỗi
    const [success, setSuccess] = useState(null);    // Thông báo thành công
    const [submit, setSubmit] = useState(true);     // Tran

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true)
        if (submit) {            
            // Tạo đối tượng dữ liệu để gửi đến API
            const userData = {
                username,
                email,
                password,
            };

            try { // Call API
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                
                const result = await response.json();
                // Kiểm tra phản hồi từ API
                if (!response.ok) {
                    setError(result.message);
                    setSuccess(null);
                }
                else{
                    setSuccess(result.message); // Lưu thông báo thành công
                    setError(null); // Reset lỗi
                }
                
            } catch (error) {
                setError(error.message); // Lưu thông báo lỗi
                setSuccess(null); // Reset thông báo thành công
            }

        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 flex flex-col items-center p-4 min-h-screen">
            <h2 className="text-4xl font-bold mb-6 mt-5">Đăng Ký</h2>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md space-y-4 text-center font-bold">
                <label className="block">
                    <span className="">Tên người dùng:</span>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        className="font-normal mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Email:</span>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="font-normal mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Mật khẩu:</span>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (rePassword !== e.target.value) {
                                setError('Mật khẩu nhập lại không giống mật khẩu đã đặt');
                                setSuccess(null);
                                setSubmit(false);
                            } else {
                                setError(null);
                                setSubmit(true);
                            }
                        }} 
                        required 
                        className="font-normal mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Nhập lại mật khẩu:</span>
                    <input 
                        type="password"  
                        value={rePassword}
                        onChange={(e) => {
                            if (e.target.value !== password) {
                                setError('Mật khẩu nhập lại không giống mật khẩu đã đặt');
                                setSuccess(null);
                                setSubmit(false);
                            } else {
                                setError(null);
                                setSubmit(true);
                            }
                            setRePassword(e.target.value);
                        }} 
                        required 
                        className="font-normal mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                {error && <p className="text-red-600 font-bold mt-3">{error}</p>} {/* Hiển thị thông báo lỗi */}
                {success && <p className="text-green-600 font-bold mt-3">{success}</p>} {/* Hiển thị thông báo thành công */}
                <button 
                    type="submit" 
                    className="w-1/2 mt-5 py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition duration-200"
                >
                    Đăng Ký
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
                to="/login" 
                className="w-44 m-2 py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200 text-center inline-block"
            >
                Đăng Nhập
            </Link>

            </div>
            
        </div>
    );
}

export default Register;
