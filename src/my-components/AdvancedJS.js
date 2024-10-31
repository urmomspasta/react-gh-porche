import React, { useState } from 'react';
import AutoSlideshow from './AutoSlideshow';
import ManualSlideshow from './ManualSlideshow';
import StatementOfAuthenticity from './SOA';
import SketchfabEmbed from './ARPhoneModel';
import Chatbox from './Chatbox';
import ProductList from './ProductList';

function AdvancedJS() {
  const [activeDemo, setActiveDemo] = useState('demo1form');

  const handleButtonClick = (demoId) => {
    setActiveDemo(demoId);
  };

  return (
    <main style={{ minHeight: '80vh' }}>
      <div className="row" style={{ minHeight: '80vh' }}>
        {/* Buttons Column */}
        <div className="col-12 col-md-3" style={{ marginLeft: '10px' }}>
          <div className="row" style={{ padding: '10px' }}>
            <button
              className={`col-6 col-md-12 btn ${activeDemo === 'demo1form' ? 'btn-warning' : 'btn-secondary'}`}
              type="button"
              onClick={() => handleButtonClick('demo1form')}
            >
              Automatic Slideshow
            </button>
            <button
              className={`col-6 col-md-12 btn ${activeDemo === 'demo2form' ? 'btn-warning' : 'btn-secondary'}`}
              type="button"
              onClick={() => handleButtonClick('demo2form')}
            >
              AR Phone Demo
            </button>
            <button
              className={`col-6 col-md-12 btn ${activeDemo === 'demo3form' ? 'btn-warning' : 'btn-secondary'}`}
              type="button"
              onClick={() => handleButtonClick('demo3form')}
            >
              Chatbot
            </button>
            <button
              className={`col-6 col-md-12 btn ${activeDemo === 'demo4form' ? 'btn-warning' : 'btn-secondary'}`}
              type="button"
              onClick={() => handleButtonClick('demo4form')}
            >
              Online Shop
            </button>
            <button
              className={`col-6 col-md-12 btn ${activeDemo === 'demo5form' ? 'btn-warning' : 'btn-secondary'}`}
              type="button"
              onClick={() => handleButtonClick('demo5form')}
            >
              Statement of Authenticity
            </button>
          </div>
        </div>

        {/* Forms Column */}
        <div className="col-12 col-md-9" style={{ width: '73%' }}>
          {/* Demo 1 Form */}
          <div className={`collapse ${activeDemo === 'demo1form' ? 'show' : ''}`}>
            <div className="card card-body bg-light" style={{ minHeight: '70vh' }}>
              <div className="row" style={{ display: 'flex', gap: '20px' }}>
                {/* AutoSlideshow - Taking up half width */}
                <div style={{ flex: '1' }}> {/* Make each slideshow take half of the row */}
                  <AutoSlideshow />
                </div>

                {/* ManualSlideshow - Taking up the other half */}
                <div style={{ flex: '1' }}> {/* Make each slideshow take half of the row */}
                  <ManualSlideshow />
                </div>
              </div>
            </div>
          </div>

          {/* Demo 2 Form */}
          <div className={`collapse ${activeDemo === 'demo2form' ? 'show' : ''}`}>
            <div className="card card-body bg-light" style={{ minHeight: '70vh' }}>
              <h2>AR Courtesy Phone Models</h2>
              {/* iPhone X Model */}
              <h5>iPhone X</h5>
              <SketchfabEmbed
                src="https://sketchfab.com/models/02f12869e95e4695a15e3a611398742b/embed"
                title="iPhone X"
                modelLink="https://sketchfab.com/3d-models/iphone-x-02f12869e95e4695a15e3a611398742b"
                authorLink="https://sketchfab.com/virtualstudio"
                authorName="Virtual Studio"
              />
              {/* iPhone 14 Pro Model */}
              <h5 style={{ paddingTop: '40px' }}>iPhone 14</h5>
              <SketchfabEmbed
                src="https://sketchfab.com/models/5cb0778041a34f09b409a38c687bb1d4/embed"
                title="iPhone 14 Pro"
                modelLink="https://sketchfab.com/3d-models/iphone-14-pro-5cb0778041a34f09b409a38c687bb1d4"
                authorLink="https://sketchfab.com/misterdude"
                authorName="mister dude"
              />
              {/* iPhone 16 Model */}
              <h5 style={{ paddingTop: '40px' }}>iPhone 16</h5>
              <SketchfabEmbed
                src="https://sketchfab.com/models/14ec355e2ab84f04a5eb73891117c010/embed"
                title="Apple iPhone 16 - $15"
                modelLink="https://sketchfab.com/3d-models/apple-iphone-16-15-14ec355e2ab84f04a5eb73891117c010"
                authorLink="https://sketchfab.com/OneSteven"
                authorName="iSteven"
              />

              {/* Samsung Galaxy S21 Ultra Model */}
              <h5 style={{ paddingTop: '40px' }}>Samsung Galaxy</h5>
              <SketchfabEmbed
                src="https://sketchfab.com/models/cd962832be7744efb6b37fe0ee2027e7/embed"
                title="Samsung Galaxy S21 Ultra"
                modelLink="https://sketchfab.com/3d-models/samsung-galaxy-s21-ultra-cd962832be7744efb6b37fe0ee2027e7"
                authorLink="https://sketchfab.com/DatSketch"
                authorName="DatSketch"
              />

              {/* Nokia 6 Model */}
              <h5 style={{ paddingTop: '40px' }}>Nokia</h5>
              <SketchfabEmbed
                src="https://sketchfab.com/models/92c2b4928fa34032892808dfc6a6e10d/embed"
                title="Nokia 6"
                modelLink="https://sketchfab.com/3d-models/nokia-6-92c2b4928fa34032892808dfc6a6e10d"
                authorLink="https://sketchfab.com/combine_soldier"
                authorName="combine_soldier"
              />

              {/* Xiaomi S12 Ultra Black Model */}
              <h5 style={{ paddingTop: '40px' }}>Xiaomi</h5>
              <SketchfabEmbed
                src="https://sketchfab.com/models/fdacb9d57ef24aa196d3ab4561bd1f69/embed"
                title="Xiaomi S12 Ultra Black"
                modelLink="https://sketchfab.com/3d-models/xiaomi-s12-ultra-black-fdacb9d57ef24aa196d3ab4561bd1f69"
                authorLink="https://sketchfab.com/mateusschw"
                authorName="MCS3D"
              />
            </div>
          </div>

          {/* Demo 3 Form */}
          <div className={`collapse ${activeDemo === 'demo3form' ? 'show' : ''}`}>
            <div className="card card-body bg-light" style={{ minHeight: '70vh', flex: '1 1 45%' }}>
              <Chatbox />
            </div>
          </div>

          {/* Demo 4 Form */}
          <div className={`collapse ${activeDemo === 'demo4form' ? 'show' : ''}`}>
            <div className="card card-body bg-light" style={{ minHeight: '70vh' }}>
              <ProductList />
            </div>
          </div>

          {/* Demo 5 Form */}
          <div className={`collapse ${activeDemo === 'demo5form' ? 'show' : ''}`}>
            <div className="card card-body bg-light" style={{ minHeight: '70vh' }}>
              <StatementOfAuthenticity />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdvancedJS;