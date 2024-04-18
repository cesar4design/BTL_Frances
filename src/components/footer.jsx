import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Popup from '../components/login'; // Importa el componente Popup

import { useRouter } from 'next/router';


const Footer = () => {

  return (
    <>
      <section className='footerSection'>
        <div>
          <p>Bitlambo ©2024</p>
        </div>
        <div>
          <a className='footerLink' href="mailto:support@bitlambo.org">Contacto</a>
          <a className='footerLink' target="_blank" href="Terms.pdf">Términos y condiciones</a>
        </div>
      </section>


    </>
  )
}

export default Footer;
