import './Header.css';

function Header({ date }) {
  return (
    <header className="header">
      <h1 className="header-title">
        <span className="header-star">✦</span>BibleFlash
      </h1>
      <p className="header-date">{date}</p>
    </header>
  );
}

export default Header;
