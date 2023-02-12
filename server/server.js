const PORT = 3300;

import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import cors from 'cors';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";


const app = express();

app.use(cors());

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG)

const firebaseApp = initializeApp(firebaseConfig);

const usersAdd = async (name, email, account, number, groups, position) => {
  const db = getDatabase();
  const uid = Date.now();
  await set(ref(db, `users/${uid}/`), {
    uid: uid,
    name: name,
    email: email,
    account: account,
    number: number,
    checked: false,
    groups: groups,
    position: position
  });
}

const usersGet = async (res) => {
  const dbRef = ref(getDatabase());
  await get(dbRef, ``).then((snapshot) => {
    if (snapshot.exists()) {
      res.json(snapshot.val());
    } else {
      res.json({error: "No data available"});
    }
  }).catch((error) => {
    res.json({error: error});
  });
}

const groupsAdd = async (res, group) => {
  let alreadyAdded = false, groups = [];
  const dbRef = ref(getDatabase());
  await get(dbRef, ``).then(async (snapshot) => {

    if (snapshot.exists()) {
      const data = snapshot.val();
      for (let i in data.groups) {
        if (data.groups[i] === group) {
          alreadyAdded = true;
        }
        groups.push(data.groups[i]);
      }
      const db = getDatabase();
      if (alreadyAdded) {
        res.json({error: "alreadyAdded"});
      } else {
        groups.push(group);
        await set(ref(db, `groups/`), groups);
        res.json({message: "OK", groups: groups});
      }
    } else {
      groups.push(group);
      await set(ref(db, `groups/`), groups);
      res.json({message: "OK", groups: groups});
    }
  }).catch((error) => {
    res.json({error: error});
  });


}

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.put("/users/add", async (req, res) => {
  const body = req.body;
  await usersAdd(body.name, body.email, body.account, body.number, body.groups, body.position);
  await usersGet(res);
});

app.get("/users/get", (req, res) => {
  usersGet(res);
});

app.put("/groups/add/", (req, res) => {
  const body = req.body;
  groupsAdd(res, body.group);
});


// set port, listen for requests

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
