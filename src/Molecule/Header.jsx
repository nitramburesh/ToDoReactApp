import Wrapper from "../Atom/Wrapper";
import Link from "../Atom/Link";
import { Link as ReactLink } from "react-router-dom";
const Header = (props) => {
  return (
    <header className="header">
      <nav>
        <Wrapper className="row">
          <ReactLink className="nav-item" to="/dashboard">
            dashboard
          </ReactLink>
          <ReactLink className="nav-item" to="/">
            Home
          </ReactLink>
          <Link className="nav-item" route={"//www.google.com"}>
            Google
          </Link>
        </Wrapper>
      </nav>
    </header>
  );
};

export default Header;
