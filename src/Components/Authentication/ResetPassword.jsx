// Password Reset Request Component (Frontend)

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { requestResetEmailApi } from '../../services/allapis';

const ResetPassword  = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await requestResetEmailApi(email);
            toast.success(response.message);
        } catch (error) {
            toast.error(error || "Something went wrong");
        }
    };

    return (
        <div className="container">
            <h2>Request Password Reset</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Request Reset Link</button>
            </form>
        </div>
    );
};

export default ResetPassword ;
