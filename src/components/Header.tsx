import './Header.css';

export function Header() {
  return (
    <header className="header" id="app-header">
      <div className="header__brand">
        <img src="/logo.png" alt="MariDocs Logo" className="header__logo-img" />
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
