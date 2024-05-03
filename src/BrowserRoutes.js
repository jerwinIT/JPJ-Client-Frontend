import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
//LOGIN
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import ChangePassword from './pages/changePassword'
import DeleteAccount from './pages/deleteAccount'
import Account from './pages/Account'
//INVMS
import AddProduct from './invms/AddProduct'
import GetProduct from './invms/GetProduct'
import SearchProduct from './invms/SearchProduct'
import SellProduct from './invms/SellProduct'
import UpdatePrice from './invms/UpdatePrice'
import UpdateStock from './invms/UpdateStock'
import DailyRecord from './invms/DailyRecord'
import MonthlyRecord from './invms/MonthlyRecord'


  

import { useSelector } from 'react-redux'

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
  
}

const BrowserRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/change-password' element={<ChangePassword/>} />
          <Route path='/delete-account' element={<DeleteAccount/>} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/get-product' element={<GetProduct />} />
          <Route path='/search-product' element={<SearchProduct />} />
          <Route path='/sell-product' element={<SellProduct />} />
          <Route path='/update-price' element={<UpdatePrice />} />
          <Route path='/update-stock' element={<UpdateStock />} />
          <Route path='/get-cred' element={<Account/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/daily-record' element ={<DailyRecord/>}/>
          <Route path='/monthly-record' element ={<MonthlyRecord/>}/>
       

        </Route>

        <Route element={<RestrictedRoutes />}>
          
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}




export default BrowserRoutes