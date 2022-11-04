import express from 'express'
import dotenv from "dotenv";
dotenv.config();


export const loginSuccess = async (req, res) => {
  console.log('login success',req.user);
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
};


export const loginFailed = async (req, res) => {
    res.status(401).json({
      success: false,
      message: "failed to log in"
    });
};

export const logout = async (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
};





