import './Header.css';

export function Header() {
  return (
    <header className="header" id="app-header">
      <div className="header__brand">
        <div className="header__logo" aria-hidden="true">
          <div className="header__logo-text">
            <span>Mari</span>
            <span>Docs</span>
          </div>
        </div>
        <div>
          <h1 className="header__title">
            Mari<span className="header__title-accent">Docs</span>
          </h1>
          <p className="header__subtitle">Markdown → PDF berkualitas cetak</p>
        </div>
      </div>
    </header>
  );
}
