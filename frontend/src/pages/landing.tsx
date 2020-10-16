import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';
import '../styles/pages/landing.css';
import logoIMG from '../images/logo.svg';

export default function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoIMG} alt="logo-happy"/>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude a vida de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Santos</strong>
          <span>São Paulo</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
        </Link>
      </div>
    </div>
  );
}