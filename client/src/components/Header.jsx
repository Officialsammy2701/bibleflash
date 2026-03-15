import './Header.css';

function Header({ date }) {
  return (
    <header className="header">
      <h1 className="header-title">✦ BibleFlash</h1>
      <p className="header-date">{date}</p>
    </header>
  );
}

export default Header;
