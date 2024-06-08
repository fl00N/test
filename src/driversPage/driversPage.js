import React, { useState } from 'react';
import Modal from 'react-modal';
import './driversPage.css';
import Button from '../components/button';
import { TiHome } from "react-icons/ti";
import { useEffect } from 'react';

Modal.setAppElement('#root');

function DriversPage() {

  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'Lewis Hamilton',
      races: 2,
      raceData: [
        { race: 'Race 1', laps: 61, time: '83' },
        { race: 'Race 2', laps: 59, time: '90' }
      ]
    },
    {
      id: 2,
      name: 'Sebastian Vettel',
      races: 3,
      raceData: [
        { race: 'Race 1', laps: 61, time: '83' },
        { race: 'Race 2', laps: 61, time: '84' },
        { race: 'Race 3', laps: 59, time: '85' }
      ]
    },
    {
      id: 3,
      name: 'Max Verstappen',
      races: 1,
      raceData: [
        { race: 'Race 1', laps: 61, time: '80' }
      ]
    }
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newDriverName, setNewDriverName] = useState('');
  const [newRaceData, setNewRaceData] = useState({ race: '', laps: '' });
  const [newDriverRaces, setNewDriverRaces] = useState([]);
  const [showRaceInputs, setShowRaceInputs] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [modalType, setModalType] = useState('add');
  const [errorMessage, setErrorMessage] = useState('');
  const [sortType, setSortType] = useState('id');

  useEffect(() => {
    if (modalType === 'edit' && editingDriver) {
      setNewDriverName(editingDriver.name);
      setNewDriverRaces(editingDriver.raceData);
    } else {
      setNewDriverName('');
      setNewDriverRaces([]);
    }
  }, [modalType, editingDriver]);

  const openAddModal = () => {
    setModalType('add');
    setModalIsOpen(true);
  };
  
  const openEditModal = (driver) => {
    console.log("Editing Driver:", driver);
    setModalType('edit');
    setEditingDriver(driver);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setNewDriverName('');
    setNewRaceData({ race: '', laps: '', time: '' });
    setNewDriverRaces([]);
    setShowRaceInputs(false);
    setEditingDriver(null);
    setErrorMessage('');
  };

  const addDriver = () => {
    if (!newDriverName || newDriverRaces.length === 0) {
      alert("Please enter a driver's name and add at least one race");
      return;
    }
  
    const driverExists = drivers.some(driver => driver.name.toLowerCase() === newDriverName.toLowerCase() && driver.id !== (editingDriver ? editingDriver.id : null));

      if (driverExists) {
        setErrorMessage('Driver name already exists');
        return;
      }
  
    const totalRaces = newDriverRaces.length;
    const newDriver = {
      id: editingDriver ? editingDriver.id : drivers.length + 1,
      name: newDriverName,
      races: totalRaces,
      raceData: newDriverRaces
    };
  
    if (editingDriver) {
      const updatedDrivers = drivers.map(driver => {
        if (driver.id === editingDriver.id) {
          return newDriver;
        }
        return driver;
      });
      setDrivers(updatedDrivers);
    } else {
      setDrivers([...drivers, newDriver]);
    }
  
    closeModal();
  };
  

  const addRace = () => {
    if (!newRaceData.race || !newRaceData.laps || !newRaceData.time) {
      alert("Please fill in all fields for the race");
      return;
    }
    if (!newRaceData.race || !newRaceData.laps || !newRaceData.time) return;
    setNewDriverRaces([...newDriverRaces, { race: newRaceData.race, laps: parseInt(newRaceData.laps), time: newRaceData.time }]);
    setNewRaceData({ race: '', laps: '', time: '' });
    setShowRaceInputs(false);
  };

  const cancelRace = () => {
    setNewRaceData({ race: '', laps: '', time: '' });
    setShowRaceInputs(false);
  };

  const deleteDriver = (id) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  const deleteRace = (index) => {
    const updatedRaces = [...newDriverRaces];
    updatedRaces.splice(index, 1);
    setNewDriverRaces(updatedRaces);
  };

  const calculateBestAverageLap = (driver) => {
    if (driver.raceData.length === 0) return 'N/A';
    const bestAvgLap = Math.min(...driver.raceData.map(race => parseFloat(race.time) / race.laps));
    return bestAvgLap.toFixed(2);
  };

  const sortedDrivers = [...drivers].sort((a, b) => {
    if (sortType === 'bestTime') {
      const bestTimeA = calculateBestAverageLap(a) === 'N/A' ? Infinity : parseFloat(calculateBestAverageLap(a));
      const bestTimeB = calculateBestAverageLap(b) === 'N/A' ? Infinity : parseFloat(calculateBestAverageLap(b));
      return bestTimeA - bestTimeB;
    } else if (sortType === 'races') {
      return b.races - a.races;
    } else {
      return a.id - b.id;
    }
  });

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

      <h1 className='driversText'>Drivers</h1>

        <div style={{position: 'relative', left: '239px'}}>
          <Button onClick={() => setSortType('id')} backgroundColor={sortType === 'id' ? '#b85c1b' : '#ccc'} size='medium' margin='10px'>Sort by ID</Button>
          <Button onClick={() => setSortType('bestTime')} backgroundColor={sortType === 'bestTime' ? '#b85c1b' : '#ccc'} size='medium' margin='10px'>Sort by Best Time</Button>
          <Button onClick={() => setSortType('races')} backgroundColor={sortType === 'races' ? '#b85c1b' : '#ccc'} size='medium' margin='10px'>Sort by Races</Button>
        </div>

      <table className='driversTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Races</th>
            <th>Best Avg. Lap</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedDrivers.map(driver => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{driver.races}</td>
              <td>{calculateBestAverageLap(driver)}m/lap</td>
              <td>
                <Button 
                  key={driver.id} 
                  onClick={() => deleteDriver(driver.id)} 
                  backgroundColor="rgb(146, 36, 36)" 
                  size='small'
                  margin='5px'
                >
                  Delete
                </Button>

                <Button 
                  backgroundColor="#288b38" 
                  size='small'
                  onClick={() => openEditModal(driver)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={openAddModal} backgroundColor='#b85c1b' size='large' margin='10px'>+</Button>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h2>{modalType === 'add' ? 'New Driver' : 'Edit Driver'}</h2>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <div>
          <h4 style={{margin: '0px', marginBottom: '5px'}}>Name</h4>
          <input
            type="text"
            placeholder="ex. Fernando Alonso"
            value={newDriverName}
            onChange={e => setNewDriverName(e.target.value)}
            required
          />
        </div>
        {newDriverRaces.length > 0 && (
          <div className="raceTableContainer">
            <table className="raceTable">
              <thead>
                <tr>
                  <th>Race Number</th>
                  <th>Race Name</th>
                  <th>Laps</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {newDriverRaces.map((raceData, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{raceData.race}</td>
                    <td>{raceData.laps}</td>
                    <td>{raceData.time}m</td>
                    <td>
                      <Button 
                        onClick={() => deleteRace(index)} 
                        backgroundColor="rgb(146, 36, 36)" 
                        size='small'
                        margin='5px'
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showRaceInputs && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 style={{margin: '15px 0px 5px 0px'}}>Races</h4>

            <input
              type="text"
              placeholder="Race Name"
              value={newRaceData.race}
              onChange={e => setNewRaceData({ ...newRaceData, race: e.target.value })}
              required
            />
            <input
              type="number"
              min="0"
              step="1"
              placeholder="Laps"
              value={newRaceData.laps}
              onChange={e => setNewRaceData({ ...newRaceData, laps: e.target.value })}
              required
            />
            <input
              type="number"
              min="0"
              step="1"
              placeholder="Time (minutes)"
              value={newRaceData.time}
              onChange={e => setNewRaceData({ ...newRaceData, time: e.target.value })}
              required
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={cancelRace} backgroundColor="rgb(146, 36, 36)" size='small' margin='5px'>✖</Button>
              <Button onClick={addRace} backgroundColor="#288b38" size='small' margin='5px'>✔</Button>
            </div>
          </div>
        )}

        {!showRaceInputs && (
          <Button onClick={() => setShowRaceInputs(true)} backgroundColor='#b85c1b' size='large' margin='10px'>+</Button>
        )}

        <div style={{ marginTop: '50px' }}>
          <Button onClick={closeModal} backgroundColor="rgb(146, 36, 36)" size='large' margin='30px'>Cancel</Button>      
          <Button onClick={addDriver} backgroundColor="#288b38" size='large' margin='30px'>Confirm</Button>
        </div>
      </Modal>
    </div>

  );
}

export default DriversPage;

