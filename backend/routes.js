import { createUser, editUser, retrieveUser, deleteUser } from "./user.js";

const setUpRoutes = (app) => {
    app.post("/signup", createUser);
    app.post("/editProfile", editUser);
    app.post("/retrieveAccountInfo", retrieveUser);
    app.post("/deleteAccount", deleteUser);
}

export default setUpRoutes;