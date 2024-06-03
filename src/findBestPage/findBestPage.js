import './findBestPage.css';
import Button from '../components/button';
import { TiHome } from "react-icons/ti";

function FindBestPage() {
  return (
    <div>

      <a href='/'
        style=
      {{ 
        position: 'absolute',
        left: '0'
      }}>
        <TiHome className='btnHome'/>
      </a>

        <h1 className='driversCriteriaText'>Best drivers criteria</h1>

        <div style={{marginTop: '150px'}}>
          <div className="inputDiv">
            <span className="input-text">Races</span>
            <input type="text" placeholder="Enter your number of races" className='input-field'/>
          </div>

          <div className="inputDiv">
            <span className="input-text">Speed</span>
            <input type="text" placeholder="Enter best lap speed" className='input-field'/>
          </div>
        </div>

        <Button backgroundColor="#288b38" size='large' margin='50px'>Confirm</Button>


    </div>
  );
}

export default FindBestPage;
