import './mainPage.css';
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div>
        <h1 className='menuText'>Menu</h1>

        <div className='mainDiv'>
            <Link to='/drivers' className='linkBtn' id='driversLink'>Drivers</Link>
            <Link to='/drivers/criteria' className='linkBtn' id='findBestLink'>Find Best</Link>
            <button className='clearBtn'>Clear</button>
        </div>
    </div>
  );
}

export default MainPage;
