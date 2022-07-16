import React, { useEffect, useState } from "react";
import { Container, Col, Row, Spinner, ListGroup } from "react-bootstrap";
import Axios from "axios";
import Avatar from "./assets/avatar.png";
import NotFound from "./assets/404.png";
import ServerError from "./assets/server-error.png";

const gradients = [
  "linear-gradient(to left bottom, #abdcff, #89ccff, #67baff, #42a9ff, #0396ff)",
  "linear-gradient(to left bottom, #feb692, #faa07e, #f5896d, #f0705f, #ea5455)",
  "linear-gradient(to left bottom, #ce9ffc, #bb90f9, #a781f5, #8f74f3, #7367f0)",
  "linear-gradient(to left bottom, #81f8b8, #6deca6, #59e094, #43d381, #28c76f)",
];
let gradientIndex = -1;

const userImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=843&q=80",
  "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
];

export default function App() {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorStatusCode, setErrorStatusCode] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get(
          "https://602e7c2c4410730017c50b9d.mockapi.io/users"
        );

        if (response.status == 200) {
          setLoadingUsers(false);
          setUsers([...response.data]);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404 || error.response.status == 500) {
            setLoadingUsers(false);
            setErrorStatusCode(error.response.status);
          }
        } else {
          setErrorStatusCode(500);
        }
      }
    };
    fetchUsers();
  }, []);

  const handleUserSelection = (id) => {
    setSelectedUser(users.filter((user) => parseInt(user.id) == id)[0]);
  };

  return (
    <main
      className="text-white"
      style={{
        background:
          "linear-gradient(109.6deg, rgb(20, 30, 48) 11.2%, rgb(36, 59, 85) 91.1%)",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Row>
          <Col sm={8}>
            <h1
              className="text-center"
              style={{ fontSize: "2rem", margin: "3rem 0" }}
            >
              Users List
            </h1>

            {/* user loading state */}
            {loadingUsers && (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <Spinner animation="grow" variant="light" />
                <h5 style={{ marginTop: "1rem", fontWeight: "normal" }}>
                  loading users
                </h5>
              </div>
            )}

            {/* request failed with 404 status code */}
            {!loadingUsers && errorStatusCode == 404 && (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <img
                  src={NotFound}
                  alt="not found"
                  style={{ width: "100px" }}
                />
                <h5 style={{ marginTop: "1rem", fontWeight: "normal" }}>
                  No users found!
                </h5>
              </div>
            )}

            {/* request failed with 500 status code */}
            {!loadingUsers && errorStatusCode == 500 && (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <img
                  src={ServerError}
                  alt="internal server error"
                  style={{ width: "100px" }}
                />
                <h5 style={{ marginTop: "1rem", fontWeight: "normal" }}>
                  Something went wrong. Come back later!
                </h5>
              </div>
            )}

            {/* when users are loaded */}
            {!loadingUsers && users.length > 0 && (
              <ul style={{ listStyle: "none" }}>
                {users.map((user, index) => {
                  if (gradientIndex >= 3) {
                    gradientIndex = -1;
                  }
                  gradientIndex++;
                  return (
                    <li
                      onClick={(e) => handleUserSelection(parseInt(user.id))}
                      key={index}
                      className="d-flex align-items-center justify-content-start"
                      style={{
                        background: gradients[gradientIndex],
                        borderRadius: "20px",
                        padding: "1rem 3rem",
                        marginBottom: "0.5rem",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        className="d-flex align-items-center justify-content-center rounded-circle bg-white"
                        style={{
                          height: "65px",
                          width: "65px",
                        }}
                      >
                        <img
                          className="rounded-circle"
                          src={userImages[index]}
                          alt="user image"
                          style={{
                            height: "50px",
                            width: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </span>
                      <span
                        className="text-dark"
                        style={{
                          fontWeight: "900",
                          fontSize: "1.5rem",
                          marginLeft: "2rem",
                        }}
                      >{`${user.profile.firstName} ${user.profile.lastName}`}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Col>
          <Col sm={3} style={{ position: "fixed", top: "0", right: "10%" }}>
            <h1
              className="text-center"
              style={{ fontSize: "2rem", margin: "3rem 0" }}
            >
              User Details
            </h1>

            {/* when user is not selected */}
            {!selectedUser && (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <img
                  src={Avatar}
                  alt="no photo"
                  style={{ height: "70px", width: "70px" }}
                />
                <h6
                  style={{ margin: "2rem 0", width: "50%" }}
                  className="text-center"
                >
                  Select a user to view the profile
                </h6>
              </div>
            )}

            {/* when user is selected */}

            {selectedUser && (
              <div className="d-flex flex-column align-items-center justify-content-center position-sticky">
                <img
                  className="rounded-circle"
                  src={userImages[parseInt(selectedUser.id) - 1]}
                  alt="profile photo"
                  style={{
                    height: "70px",
                    width: "70px",
                    objectFit: "cover",
                  }}
                />
                <div className="w-100">
                  <p
                    className="text-center"
                    style={{ fontWeight: "700", marginTop: "0.5rem" }}
                  >
                    @{selectedUser.profile.username}
                  </p>
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                      padding: "1.5rem",
                    }}
                  >
                    <p className="text-center">{selectedUser.Bio}</p>
                    <ListGroup style={{ borderRadius: "0" }}>
                      <ListGroup.Item
                        style={{
                          background: "transparent",
                          border: "0",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                        className="text-light"
                      >
                        <b>Full Name: </b>
                        <span>{`${selectedUser.profile.firstName} ${selectedUser.profile.lastName}`}</span>{" "}
                      </ListGroup.Item>
                      <ListGroup.Item
                        style={{
                          background: "transparent",
                          border: "0",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                        className="text-light"
                      >
                        <b>Job Title: </b>
                        <span>{selectedUser.jobTitle}</span>{" "}
                      </ListGroup.Item>
                      <ListGroup.Item
                        style={{
                          background: "transparent",
                          border: "0",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                        className="text-light"
                      >
                        <b>Email: </b>
                        <span>{selectedUser.profile.email}</span>{" "}
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
}
