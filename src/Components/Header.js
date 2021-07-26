import '../Styles/Header.css'
import VKLogin from  '../Actions/VKLogin'


function Header() {
  return (
      <div className="navbar">
        <header className="header">
          <main>
            <h1 className="text">FINDER</h1>
            <nav>
              <ul className="links">
                  <li><button>ссылка</button></li>
                  <li><button>ссылка</button></li>
                  <li><button>ссылка</button></li>
                  <li><button>ссылка</button></li>
              </ul>
                <VKLogin/>
            </nav>
          </main>
        </header>
      </div>
  );
}





export default Header;