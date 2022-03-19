import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assests/logo.png';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		
		
	}

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="gpt3__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#tkns">Tokenomics</a></p>
          <p><a href="#game">Game</a></p>
          <p><a href="#features">Staking</a></p>
          <p><a href="#about">About</a></p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div className='ac countDisplay'>
			</div>
			<div className='balanceDisplay'>
				
			</div>
			{errorMessage}
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
            <p><a href="#paper">Whitepaper</a></p>
            <p><a href="#tkns">Tokenomics</a></p>
            <p><a href="#about">About</a></p>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            <button type="button">BUY</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
