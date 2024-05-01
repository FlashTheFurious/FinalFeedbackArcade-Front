import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AutoComplete } from 'antd';
import { Button } from 'react-bootstrap';
import { getGames, searchGame } from '../../service/api';
import { useAuth } from '../../service/authService';
import navLogo from '../../assets/images/navLogo.png';

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // const [searchResults, setSearchResults] = useState([]);
  // const [showDropdown, setShowDropdown] = useState(false);

  const [ setSearchResults] = useState([]);
  const [ setShowDropdown] = useState(false);
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const response = await getGames();
        setAllGames(response.data.games);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchAllGames();
  }, []);

  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (value) {
      try {
        const response = await searchGame(value);
        setSearchResults(response.data.games);
        setShowDropdown(true);
      } catch (error) {
        console.error('Error searching games:', error);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (value) => {
    console.log('Selected:', value);
    // Redirect to the selected game details page
    const selectedGame = allGames.find((game) => game.title === value);
    if (selectedGame) {
      navigate(`/games/${selectedGame.id}`, { state: { gameData: selectedGame } });
    }
  };

  const handleLogout = () => {
    logout();
  };
  const options = allGames.map((game) => ({
    value: game.title,
    label: (
      <div className="dropdown-item">
        <img src={game.image} alt={game.title} style={{ marginRight: '10px', height: '20px' }} />
        {game.title}
      </div>
    ),
  }));

  return (
    <nav className="py-1 navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <img src={navLogo} alt="Logo" style={{ height: '110px', marginRight: '10px' }} />
        <Link to="/games" style={{ textDecoration: 'none' }}>
          
          <h2 style={{ cursor: 'pointer' }} className="navbar-brand">Feedback Arcade</h2>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse w-full " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to="/games" style={{ textDecoration: 'none' }}>
              <li className="nav-item">
                <p style={{ cursor: 'pointer' }} className="pb-0 nav-link active" aria-current="page">Games</p>
              </li>
            </Link>
          </ul>
          <div className="collapse d-flex flex-end" id="navbarSupportedContent">
            <AutoComplete
              className="me-2"
              style={{ width: 200 }}
              options={options}
              onSelect={handleSelect}
              onSearch={handleSearch}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </AutoComplete>
          </div>
          <div>
            <Button onClick={handleLogout}>Logout </Button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
