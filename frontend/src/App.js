import { BrowserRouter, Route, Routes } from "react-router-dom"
import Addsouvenir from './components/addSouvenir';
import ViewSouvenir from './components/viewSouvenir';
import SouvenirList from './components/souvenirList';
import Edititem from './components/souvenirEdit';
import Addcart from './components/addCart';
import ViewCart from './components/CartView';
import Thanks from './components/thankyouPurchase';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/addSouvenir" element={<Addsouvenir />} />
          <Route path="/viewSouvenir" element={<ViewSouvenir />} />
          <Route path="/edititem/:id" element={<Edititem />} />
          <Route path="/souvenirlist" element={<SouvenirList />} />
          <Route path="/addcart/:id" element={<Addcart />} />
          <Route path="/viewCart" element={<ViewCart />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
