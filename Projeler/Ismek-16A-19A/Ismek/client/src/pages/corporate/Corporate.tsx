import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Corporate: React.FC = () => {
  return (
    <div className="container">
      <header className="my-4">
        <h1 className="text-center">Kurumsal Sayfa</h1>
      </header>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Logo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Ana Sayfa <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Hakkımızda</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Hizmetler</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">İletişim</a>
            </li>
          </ul>
        </div>
      </nav>
      
      <main className="my-4">
        <section className="row">
          <div className="col-md-6">
            <h2>Hakkımızda</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="col-md-6">
            <h2>Hizmetlerimiz</h2>
            <ul>
              <li>Danışmanlık</li>
              <li>Geliştirme</li>
              <li>Destek</li>
            </ul>
          </div>
        </section>
      </main>
      
      <footer className="bg-light py-4">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Kurumsal Şirket. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

export default Corporate;
