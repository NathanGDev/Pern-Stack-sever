const express = require("express");
const app = express();
const DB = require("./db");

DB.sync();
