import axios from 'axios'
axios.defaults.withCredentials = true

//API - inventory and sales management system
export async function addProduct(addProductData){
    return await axios.post(
        'http://localhost:8000/api/add-product', addProductData
    )
}

export async function getProduct(){
    return await axios.get(
        'http://localhost:8000/api/get-product', 
    )
}

export async function InventorySalesRecord(){
    return await axios.get(
        'http://localhost:8000/api/sales-record', 
    )
}


export async function removeProduct(itemNumber){
    return await axios.delete(
        'http://localhost:8000/api/remove-product',
        { data: { item_number: itemNumber } }
    );
}

export async function searchProduct(itemName){
    return await axios.post(
        'http://localhost:8000/api/search-product', itemName
    )
}

export async function sellProduct(sellProductData){
    return await axios.post(
        'http://localhost:8000/api/sell-product', sellProductData
    )
}

export async function updateStock(updateStockData){
    return await axios.put(
        'http://localhost:8000/api/update-stock', updateStockData
    )
}

export async function updatePrice(updatePriceData){
    return await axios.put(
        'http://localhost:8000/api/update-price', updatePriceData
    )
}

export async function DailySalesRecord(DailySalesRecord){
    return await axios.post(
        'http://localhost:8000/api/daily-record', DailySalesRecord
    )
}
