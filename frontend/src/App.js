// import { BrowserRouter as Router, Route} from "react-router-dom"
import Addsouvenir from './components/addSouvenir';
import ViewSouvenir from './components/viewSouvenir';
import Searchbar from './components/searchbar';

function App() {
  return (
    <div>
      <Addsouvenir/>
      <Searchbar/>
      <ViewSouvenir/>
    </div>
  );
}

export default App;
