import React, { useState } from 'react';
import Modal from 'react-modal';
import './driversPage.css';

Modal.setAppElement('#root');

function DriversPage() {

  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Lewis Hamilton', races: 270 },
    { id: 2, name: 'Sebastian Vettel', races: 257 },
    { id: 3, name: 'Max Verstappen', races: 123 }
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newDriverName, setNewDriverName] = useState('');
  const [newRaceData, setNewRaceData] = useState({ race: '', speeds: '' });
  const [newDriverRaces, setNewDriverRaces] = useState([]);
  const [showRaceInputs, setShowRaceInputs] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewDriverName('');
    setNewRaceData({ race: '', speeds: '' });
    setNewDriverRaces([]);
    setShowRaceInputs(false);
  };

  const addDriver = () => {
    if (!newDriverName || newDriverRaces.length === 0) return;
    const totalRaces = newDriverRaces.length;
    const newDriver = {
      id: drivers.length + 1,
      name: newDriverName,
      races: totalRaces
    };
    setDrivers([...drivers, newDriver]);
    closeModal();
  };

  const addRace = () => {
    if (!newRaceData.race || !newRaceData.speeds) return;
    const speedsArray = newRaceData.speeds.split(',').map(speed => speed.trim());
    setNewDriverRaces([...newDriverRaces, { race: newRaceData.race, speeds: speedsArray }]);
    setNewRaceData({ race: '', speeds: '' });
  };

  return (

    <div>

      <h1 className='driversText'>Drivers</h1>

      <table className='driversTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Races</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{driver.races}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={openModal} className='addBtn'>+</button>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h2>New Driver</h2>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newDriverName}
            onChange={e => setNewDriverName(e.target.value)}
            required
          />
        </div>
        {newDriverRaces.length > 0 && (
          <div>
            <table className="raceTable">
              <thead>
                <tr>
                  <th>Race Number</th>
                  <th>Race Name</th>
                  <th>Lap Speeds (km/h)</th>
                </tr>
              </thead>
              <tbody>
                {newDriverRaces.map((raceData, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{raceData.race}</td>
                    <td>{raceData.speeds.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {showRaceInputs && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="text"
              placeholder="Race Name"
              value={newRaceData.race}
              onChange={e => setNewRaceData({ ...newRaceData, race: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Speed (km/h)"
              value={newRaceData.speeds}
              onChange={e => setNewRaceData({ ...newRaceData, speeds: e.target.value })}
              required
            />
          </div>
        )}

        <button onClick={() => { addRace(); setShowRaceInputs(true); }} className='addBtn'>+</button>

        <div style={{ marginTop: '50px' }}>
          <button onClick={closeModal} className="cancelBtn" style={{ marginRight: '80px' }}>Cancel</button>
          <button onClick={addDriver} className="confirmBtn">Confirm</button>
        </div>
      </Modal>
    </div>

  );
}

export default DriversPage;

