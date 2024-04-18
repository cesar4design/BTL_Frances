import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Popup from '../components/login'; // Importa el componente Popup

import { useRouter } from 'next/router';

import SystemABI from "../abi/SystemABI.json";

import { useWeb3Modal } from '@web3modal/wagmi/react'

import {
  useDisconnect,
  useAccount,
  usePrepareContractWrite,
  usePrepareContractRead,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";



const Navbaro = () => {
  const { address } = useAccount();
  const { isConnected } = useAccount();
  const { open, close } = useWeb3Modal()
  const router = useRouter();

  // Contracts
  const [SystemContract, setSystemContract] = useState({ address: '0x4113720450864e7d9e35C3CBa7FA7e5D9C55CD27', abi: SystemABI });

  // Verify member

  const [showPopup, setShowPopup] = useState(false);
  const [isMember, setIsMember] = React.useState(false);

  const { data: dataIsMember } = useContractRead({
    ...SystemContract,
    functionName: 'isWalletRegistered',
    args: [address],
    watch: true,
  });

  React.useEffect(() => {
    if (dataIsMember !== undefined) {
      setIsMember(Boolean(dataIsMember)); // Convierte a booleano
    }
  }, [dataIsMember]);

  useEffect(() => {
    if (isConnected && !isMember) {
      setShowPopup(true);
    } else {
      setShowPopup(false); // Si el usuario es miembro, cierra el popup
    }
  }, [isConnected, isMember, address]);



  return (
    <>

      <Navbar collapseOnSelect expand="lg" className="NavbarBg">
        <Link href="/"> <img className='NavbarLogo' src="logo.png" alt="" /></Link>

        <Container className='NavbarMain'>
          <Navbar.Toggle className='toogleNavb' aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className='flexRows'>
              <div className='firstRow'>

                <Nav>
                  <Link className='NavbLink' href="Members">Members</Link>
                  <Link className='NavbLink' href="BTLLeague">BTL League</Link>
                  <Link className='NavbLinkBg' href="BTLGames">BTL Games</Link>

                </Nav>

                <Nav >

                  {isConnected ? (
                    <>
                      <Link href="Profile"> <img className='profileImg' src="./icons/profile.png" alt="" /> </Link>
                    </>
                  ) : (
                    <>
                      <Link href=""> <img className='profileImg' src="./icons/profile.png" alt="" /> </Link>
                    </>
                  )}





                  {isConnected ? (<>
                    <button className='WalletConnect' onClick={() => open()}>Connected</button>
                  </>) : (
                    <>
                      <button className='WalletConnect' onClick={() => open()}>Login with wallet</button>
                    </>
                  )}

                  <Link target="_blank" href="https://t.me/+ZZ49v107HWo0MGI8"> <img className='socialImg' src="./icons/telegram.png" alt="" /> </Link>
                  <Link target="_blank" href="https://x.com/Bitlambo_BTL?t=SZ1P1aJgTTks0tcaMajFgg&s=09"> <img className='socialImg' src="./icons/twitter.png" alt="" /> </Link>
                  <Link target="_blank" href="https://www.youtube.com/@Bitlambo"> <img className='socialImg' src="./icons/youtube.png" alt="" /> </Link>
                </Nav>

              </div>
              <div>
                <Nav className="secondRow">
                  <div>
                    <Link className='NavbLink2' href="">Whitepaper</Link>
                    <Link className='NavbLink2' href="./#Tokenomics">Tokenomics</Link>
                    <Link className='NavbLink2' href="./#Roadmap">Roadmap</Link>
                    <Link className='NavbLink2' href="">Contact</Link>
                  </div>
                  <div className='FlexNav'>
                    <Link className='NavbLink22' href="">Audit </Link><span className='sepaNav'></span>
                  
                    <NavDropdown className='' title="Idiomas" id="basic-nav-dropdown">
                      <NavDropdown.Item href="https://www.bitlambo.org/"><img src="flags/españa.png" alt=""/></NavDropdown.Item>
                      <NavDropdown.Item href="https://en.bitlambo.org/"><img src="flags/ingles.png" alt=""/></NavDropdown.Item>
                      <NavDropdown.Item href="https://fr.bitlambo.org/"><img src="flags/francia.png" alt=""/></NavDropdown.Item>
                      <NavDropdown.Item href="https://cn.bitlambo.org/"><img src="flags/china.png" alt=""/></NavDropdown.Item>
                      <NavDropdown.Item href="https://it.bitlambo.org/"><img src="flags/italia.png" alt=""/></NavDropdown.Item>
                      <NavDropdown.Item href="https://pt.bitlambo.org/"><img src="flags/portugal.png" alt=""/></NavDropdown.Item>
                    </NavDropdown>

                  </div>
                </Nav>

              </div>

            </div>

          </Navbar.Collapse>

          <br /><br />



        </Container>


      </Navbar>

      <Navbar collapseOnSelect expand="lg" className="NavbarBg">


      </Navbar>

      <Popup show={showPopup} /> {/* Renderiza el Popup */}
    </>
  )
}

export default Navbaro;
