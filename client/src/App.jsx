import './App.css';
import DetailInvoice from './pages/detailInvoice/DetailInvoice';
import DetailProduct from './pages/detailProduct/DetailProduct';
import Home from './pages/home/Home';
import InfoMe from './pages/infoMe/InfoMe';
import Login from './pages/login/Login';
import Order from './pages/order/Order';
import ProductPage from './pages/productsPage/ProductPage';
import Register from './pages/register/Register';
import { useSelector } from 'react-redux';

import { userSelector } from './features/selector'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UploadProduct from './pages/uploadProduct/UploadProduct';
import ChangePassword from './pages/changePassword/ChangePassword';

function App() {
  const user = useSelector(userSelector);

  return (
      <div className="App">
        <Router>
          <Routes>
                <Route exact path="/" element={<Home />} ></Route>
                <Route path="/register" element={(!user) ? <Register /> : <Navigate to="/"/>}></Route>
                <Route path="/login" element={(!user) ? <Login /> : <Navigate to="/"/>}></Route>
                <Route path="/customer/account" element={(user) ? <InfoMe /> : <Login />}></Route>
                <Route path="/products/all" element={<ProductPage category="" title="TẤT CẢ SẢN PHẨM" banner="https://cmsv2.yame.vn/uploads/9d1c0209-a602-407b-a43d-a178b8772a5f/BANNER-WEB-1-CHU.jpg?quality=80&w=0&h=0"/>}></Route>
                <Route path="/products/nam" element={<ProductPage category="nam" title="SẢN PHẨM NAM" banner="https://cmsv2.yame.vn/uploads/9d1c0209-a602-407b-a43d-a178b8772a5f/BANNER-WEB-1-CHU.jpg?quality=80&w=0&h=0"/>}></Route>
                <Route path="/products/nu" element={<ProductPage category="nu" title="SẢN PHẨM NỮ" banner="https://cmsv2.yame.vn/uploads/9d1c0209-a602-407b-a43d-a178b8772a5f/BANNER-WEB-1-CHU.jpg?quality=80&w=0&h=0"/>}></Route>
                <Route path="/products/tre-em" element={<ProductPage category="tre-em" title="SẢN PHẨM TRẺ EM" banner="https://cmsv2.yame.vn/uploads/9d1c0209-a602-407b-a43d-a178b8772a5f/BANNER-WEB-1-CHU.jpg?quality=80&w=0&h=0"/>}></Route>
                <Route path="/products/search/:slug" element={<ProductPage title="KẾT QUẢ TÌM KIẾM" banner=""/>}></Route>
                <Route path="/:slug" element={<DetailProduct />}></Route>
                <Route path="/order" element={(user) ? <Order /> : <Login />}></Route>
                <Route path="/invoice" element={(user) ? <DetailInvoice /> : <Login />}></Route>
                <Route path="/password" element={(user) ? <ChangePassword /> : <Login />}></Route>
                <Route path="/admin/upload" element={(user) ? <UploadProduct /> : <Login />}></Route>
          </Routes>
      </Router>
      </div>
  );
}

export default App;
