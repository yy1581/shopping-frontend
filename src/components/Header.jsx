import LocaleSelector from "./LocaleSelector";
import "./Header.css";

function Header() {
  return (
    <header className="App-header">
      <div className="header-content">
        <h1 className="header-title">Ymazon</h1>
        <nav className="header-nav">
          <LocaleSelector />
        </nav>
      </div>
    </header>
  );
}

export default Header;
