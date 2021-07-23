import '../Styles/Header.css'
import VkLogin from  '../Actions/VkLogin'


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
                <VkLogin/>
            </nav>
          </main>
        </header>
      </div>
  );
}





export default Header;