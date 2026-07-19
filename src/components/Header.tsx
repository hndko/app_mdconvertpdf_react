import './Header.css';

export function Header() {
  return (
    <header className="header" id="app-header">
      <div className="header__brand">
        <div className="header__logo" aria-hidden="true">
          <div className="header__logo-text">
            <span>MD</span>
            <span>PDF</span>
          </div>
        </div>
        <div>
          <h1 className="header__title">
            MD <span className="header__title-accent">Convert</span> PDF
          </h1>
          <p className="header__subtitle">Markdown → PDF berkualitas cetak</p>
        </div>
      </div>
    </header>
  );
}
