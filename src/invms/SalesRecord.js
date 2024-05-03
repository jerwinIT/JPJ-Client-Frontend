import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { InventorySalesRecord } from "../api/invms";
import MonthlyRecord from "./MonthlyRecord";
import DailyRecord from "./DailyRecord";

const SalesRecord = () => {
    const [sales, setSales] = useState([]);
    const [showDailySalesRecord, setShowDailySalesRecord] = useState(false);
    const [showMonthlySalesRecord, setShowMonthlySalesRecord] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await InventorySalesRecord();
            if (response.data && response.data.users) {
                setSales(response.data.users);
            } else {
                throw new Error("Sales data not found");
            }
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const downloadSalesData = () => {
        const headers = [
            "Sale ID",
            "Date",
            "Item Name",
            "Quantity",
            "Total Price"
        ];
    
        const salesCSV = [headers.join(",")];
    
        sales.forEach((sale) => {
            const row = [
                sale.sale_id,
                formatDate(sale.sale_date),
                sale.item_name,
                sale.stock_level,
                sale.total_price
            ];
            salesCSV.push(row.join(","));
        });
    
        const blob = new Blob([salesCSV.join("\n")], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "sales_record.csv");
    };
    
    const toggleDailySalesRecord = () => {
        setShowDailySalesRecord(!showDailySalesRecord);
        setShowMonthlySalesRecord(false);
    };

    const toggleMonthlySalesRecord = () => {
        setShowMonthlySalesRecord(!showMonthlySalesRecord);
        setShowDailySalesRecord(false);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Sales Record</h2>

            <div className="table-responsive">
                <table className="table mt-3 text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>Sale ID</th>
                            <th>Date</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => (
                            <tr key={index}>
                                <td>{sale.sale_id}</td>
                                <td>{formatDate(sale.sale_date)}</td>
                                <td>{sale.item_name}</td>
                                <td>{sale.stock_level}</td>
                                <td>{sale.total_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center">
                <button className="btn btn-primary mr-2" onClick={downloadSalesData}>Download Sales Record</button>
                <button className="btn btn-info mr-2" onClick={toggleDailySalesRecord}>Daily Record</button>
                <button className="btn btn-info" onClick={toggleMonthlySalesRecord}>Monthly Record</button>
            </div>

            {showDailySalesRecord && <DailyRecord />}
            {showMonthlySalesRecord && <MonthlyRecord />}
        </div>
    );
};

export default SalesRecord;
