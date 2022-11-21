import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./Components/Header/Header";
import {Route, Routes} from "react-router-dom";
import ProductList from "./Components/ProductList/ProductList";
import From from "./Components/Form/From";

function App() {
    const { tg, onToggleButton } = useTelegram()

    useEffect(()=> {
        tg?.ready();
    }, [tg]);


  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route index element ={<ProductList/>}/>
            <Route path={'form'} element={<From/>}/>
        </Routes>
    </div>
  );
}

export default App;
