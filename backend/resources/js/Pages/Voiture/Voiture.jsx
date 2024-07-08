import React, { useState } from 'react';  
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Filters from '../Filtres/Filtres'; 
import { InertiaLink } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';
import './Voiture.css';

function Voiture({ voitures: initialVoitures }) {
  const { t, i18n } = useTranslation();
  const [voitures, setVoitures] = useState(initialVoitures);

  const handleFilter = (filteredVoitures) => {
    setVoitures(filteredVoitures);
  };

  return (
    <>
      <Header />
      <img className="banner_catalog" src="../../../img/banner/banner_catalog.jpg" alt="bannière" />
      <div className="container">
        <div className="filters-section">
          <Filters onFilter={handleFilter} />
        </div>
        <div className="cars-section">
          <div className="cars-grid">
            {voitures.map((voiture, index) => (
              <InertiaLink key={index} href={`/voitures/${voiture.id_voiture}`} className="car-link">
                <div className="car">
                  <img 
                    src={voiture.photos && voiture.photos.length > 0 
                          ? voiture.photos[0].url_photo 
                          : '../../../img/car/default_car.png'} 
                    alt={voiture.modele.nom_modele} 
                  />
                  <h3 className="car-title">{voiture.annee} {voiture.modele.nom_modele}</h3>
                  <p>{voiture.description}</p>
                  <Link href={`/voitures/${voiture.id_voiture}`} className="details-button">En savoir plus</Link>
                </div>
              </InertiaLink>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Voiture;
