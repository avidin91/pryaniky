import {HeaderComponent} from "../widgets/header-component";
import {FooterComponent} from "../widgets/footer-component";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getTokenFromLocalStorage} from "../shared/utils/localstorage.helper";
import './styles.css';

function App() {
    const isAuth = getTokenFromLocalStorage();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/auth')
        }
    }, [isAuth])


    return (
        <>
            <HeaderComponent/>
            <div className={'main-layout'}>
                <Outlet/>
            </div>
            <FooterComponent/>
        </>
    );
}

export default App;
