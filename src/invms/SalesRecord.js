import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { InventorySalesRecord } from "../api/invms";

const SalesRecord = () => {
    const [sales, setSales] = useState([]);

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
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
    
        sales.forEach((sale, index) => {
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
    

    return (
        <div>
            <h2 className="text-center mt-5">Sales Record</h2>
            <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <table className="table mt-3 text-center">
                    <thead>
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
            <div className="text-center">
                <button className="btn btn-primary mt-3" onClick={downloadSalesData}>Download Sales Record</button>
            </div>
        </div>
    );
};

export default SalesRecord;
