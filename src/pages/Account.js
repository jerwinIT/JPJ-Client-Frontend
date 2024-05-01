import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { CredList, deleteAccount } from "../api/auth";
import ChangePassword from "./changePassword";
import DeleteAccount from "./deleteAccount";
import Register from "./register";

const Account = () => {
    const [credentials, setCreds] = useState([]);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await CredList();
            setCreds(response.data.users);
        } catch (error) {
            console.error("Error fetching credentials data:", error);
        }
    };

    const toggleShowChangePassword = () => {
        setShowChangePassword(!showChangePassword);
        setShowRegister(false);
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
        setShowChangePassword(false);
    };

    const handleDeleteAccount = async (username) => {
        try {
            await deleteAccount(username);
            window.location.reload(); // Refresh the page after successful deletion
        } catch (error) {
            console.error("Error removing account:", error);
        }
    };

    return (
        <Layout>
            <div className="container mt-5">
                <h1 className="text-center mb-4">Account Information</h1>
                <div className="mb-3">
                    <button
                        className="btn btn-primary mr-3"
                        onClick={toggleShowChangePassword}
                    >
                        Change Password
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={toggleRegister}
                    >
                        Add Account
                    </button>
                </div>
                {showChangePassword && <ChangePassword />}
                {showRegister && <Register />}
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="table mt-5 text-center">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>User ID</th>
                                <th></th> {/* Empty header for delete button */}
                            </tr>
                        </thead>
                        <tbody>
                            {credentials.map((creds, index) => (
                                <tr key={index}>
                                    <td>{creds.username}</td>
                                    <td>{creds.user_id}</td>
                                    <td>
                                        <DeleteAccount
                                            username={creds.username}
                                            onDeleteAccount={handleDeleteAccount}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Account;
