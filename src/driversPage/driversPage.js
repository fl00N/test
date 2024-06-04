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
        { race: 'Race 1', laps: ['1', '2', '3'] },
        { race: 'Race 2', laps: ['1', '2', '3', '4'] }
      ]
    },
    {
      id: 2,
      name: 'Sebastian Vettel',
      races: 2,
      raceData: [
        { race: 'Race 1', laps: ['1', '2'] },
        { race: 'Race 2', laps: ['1', '2', '3'] }
      ]
    },
    {
      id: 3,
      name: 'Max Verstappen',
      races: 1,
      raceData: [
        { race: 'Race 1', laps: ['1', '2', '3'] }
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
    setNewRaceData({ race: '', laps: '' });
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
    if (!newRaceData.race || !newRaceData.laps) return;
    const lapsArray = newRaceData.laps.split(',').map(lap => lap.trim());
    setNewDriverRaces([...newDriverRaces, { race: newRaceData.race, laps: lapsArray }]);
    setNewRaceData({ race: '', laps: '' });
    setShowRaceInputs(false);
  };

  const cancelRace = () => {
    setNewRaceData({ race: '', laps: '' });
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

      <table className='driversTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Races</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{driver.races}</td>
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
          <input
            type="text"
            placeholder="Name"
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {newDriverRaces.map((raceData, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{raceData.race}</td>
                    <td>{raceData.laps.join(', ')}</td>
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
            <input
              type="text"
              placeholder="Race Name"
              value={newRaceData.race}
              onChange={e => setNewRaceData({ ...newRaceData, race: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Laps"
              value={newRaceData.laps}
              onChange={e => setNewRaceData({ ...newRaceData, laps: e.target.value })}
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

