import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./Components/Login";
import SignIn from "./Components/Signin";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
import User from "./Components/User";
import MyProfile from "./Components/MyProfile";
import Home from "./Components/Home";
import NoMatch from "./Components/NoMatch";
import Book from "./Components/Book";
import SubBook from "./Components/SubBook";
import Details from "./Components/Details";
import Wallet from "./Components/Wallet";
import Invoice from "./Components/Invoice";
import Cart from "./Components/Cart";
import Payment from "./Components/Payment";
import Admin from "./Components/Admin";
import AllBookings from "./Components/AllBookings";
import AllMatches from "./Components/AllMatches";
import ClubManagement from "./Components/GetCourts";
import Supervisor from "./Components/Supervisor";
import StartMatch from "./Components/StartMatch";
import UpdateScore from "./Components/UpdateScore";
import Analytics from "./Components/Analytics";
import Players from "./Components/Player";
import Employees from "./Components/Employees";
import UserProfile from "./Components/UserProfile";
import Playerbookings from "./Components/Playerbookings";
import UserMatches from "./Components/UserMatches";
import ScoreBoard from "./Components/ScoreBoard";

function App() {
  const [email, setEmail] = useState("");

  const handleForget = (userEmail) => {
    setEmail(userEmail);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route
          path="ForgetPassword"
          element={<ForgetPassword onForget={handleForget} />}
        />
        <Route path="ResetPassword" element={<ResetPassword email={email} />} />
        <Route path="User" element={<User />}>
          <Route path="home" element={<Home />} />
          <Route path="book" element={<Book />}>
            <Route path=":id" element={<SubBook />}>
              <Route path=":title" element={<Details />} />
            </Route>
          </Route>
          <Route path="cart" element={<Cart />}>
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path="UserProfile" element={<UserProfile />} />
          <Route path="Wallet" element={<Wallet />} />
          <Route path="Invoice" element={<Invoice />} />
          <Route path="PlayerBookings" element={<Playerbookings />} />
          <Route path="UserMatches" element={<UserMatches />} />
          <Route path="ScoreBoard" element={<ScoreBoard />} />
        </Route>
        <Route path="Admin" element={<Admin />}>
          <Route path="MyProfile" element={<MyProfile />} />
          <Route path="AllBookings" element={<AllBookings />} />
          <Route path="AllMatches" element={<AllMatches />} />
          <Route path="Analytics" element={<Analytics />} />
          <Route path="ClubManagement" element={<ClubManagement />} />
          <Route path="Players" element={<Players />} />
          <Route path="Employees" element={<Employees />} />
        </Route>

        <Route path="Supervisor" element={<Supervisor />}>
          <Route path="StartMatch" element={<StartMatch />} />
          <Route path="UpdateScore" element={<UpdateScore />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;

// "proxy": "http://192.168.43.246:8081"
