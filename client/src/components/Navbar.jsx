import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  console.log("user", user);
  const logout = () => {
    window.open("http://localhost:4000/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          HOME
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={user.google.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user.google.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
