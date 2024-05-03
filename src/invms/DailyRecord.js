import React, { useState, useEffect } from "react";
import { getDailySalesRecord, DailySalesRecord, deleteDailySalesRecord } from "../api/invms";

const DailySalesRecordComponent = () => {
    const [targetDate, setTargetDate] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dailySalesData, setDailySalesData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await getDailySalesRecord();
            setDailySalesData(response.data.users);
        } catch (error) {
            console.error("Error fetching daily sales data:", error);
            setError("Failed to fetch daily sales data");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    const handleChange = (e) => {
        setTargetDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await DailySalesRecord({ targetDate });
            setSuccess(response.data.message);
            setError("");
            fetchData();
        } catch (error) {
            console.error("Error generating daily sales record:", error);
            setError("Failed to generate daily sales record");
            setSuccess("");
        }
    };

    const handleRemove = async (record_date) => {
        const confirmation = window.confirm("Are you sure you want to delete this daily sales record?");
        if (confirmation) {
            try {
                const { data } = await deleteDailySalesRecord(record_date);
                if (data.success) {
                    setSuccess(data.message);
                    setError("");
                    fetchData();
                } else {
                    setError(data.message);
                    setSuccess("");
                }
            } catch (error) {
                console.error("Error removing daily sales record:", error);
                setError("Failed to delete daily sales record");
                setSuccess("");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Daily Record</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <label htmlFor="targetDate" className="form-label">Select Date:</label>
                        <input
                            id="targetDate"
                            type="date"
                            value={targetDate}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary btn-sm">Generate</button>
                    </div>
                </div>
            </form>

            {error && <p className="alert alert-danger">{error}</p>}
            {success && <p className="alert alert-success">{success}</p>}
            
            <div className="table-responsive">
                <table className="table mt-5 text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Record Date</th>
                            <th>Total Sales</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dailySalesData.map((dsales, index) => (
                            <tr key={index}>
                                <td>{formatDate(dsales.record_date)}</td>
                                <td>{dsales.total_sales}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(dsales.record_date)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DailySalesRecordComponent;