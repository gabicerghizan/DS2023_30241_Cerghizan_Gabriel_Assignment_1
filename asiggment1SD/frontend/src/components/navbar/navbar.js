import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { NavLink } from "react-router-dom";
import AuthService from "../../services/AuthService";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: null != localStorage.access_token,
      isAdmin: false,
    };
  }

  componentDidMount() {
    if (localStorage.access_token) {
      let roles = AuthService.getCurrentUserRoles();
      for (let role in roles) {
        if (roles[role] === "ROLE_MANAGER") {
          this.setState({
            isAdmin: true,
          });
        }
      }
    }
  }

  logoutUser() {
    localStorage.clear();
    this.setState({ isUserLoggedIn: false });
  }

  render() {
    return (
      <div>
        <nav className="bg-white dark:bg-gray-800  shadow ">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              <div className=" flex items-center">
                <div className="hidden md:block">
                  {this.state.isUserLoggedIn && (
                    <div className="ml-10 flex items-baseline space-x-4">
                      <a
                        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        href="/"
                      >
                        Home
                      </a>
                      <a
                        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        href="/devices"
                      >
                        Devices
                      </a>
                     
                      {this.state.isAdmin && (
                        <a
                          className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          href="/users"
                        >
                          Users
                        </a>
                      )}
                    </div>
                  )}
                  {!this.state.isUserLoggedIn && (
                    <div className="ml-10 flex items-baseline space-x-4">
                      <a
                        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        href="/login"
                      >
                        Login
                      </a>
                      <a
                        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        href="/register"
                      >
                        Register
                      </a>
                    </div>
                  )}
                </div>
              </div>
              {this.state.isUserLoggedIn && (
                <div className="flex-right">
                  <DropdownButton
                    id="dropdown-item-button"
                    title="Account"
                    variant="success"
                  >
                    <Dropdown.ItemText>
                      {AuthService.getCurrentUsername()}
                    </Dropdown.ItemText>
                    <Dropdown.Item as="button">
                      <NavLink onClick={this.logoutUser} to={"/login"}>
                        Logout
                      </NavLink>
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
