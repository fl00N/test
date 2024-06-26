import './mainPage.css';
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div>
        <h1 className='menuText'>Menu</h1>

        <div className='mainDiv'>
            <Link to='/drivers' className='linkBtn' id='driversLink'>Drivers</Link>
        </div>
    </div>
  );
}

export default MainPage;
