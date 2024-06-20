import { createUser, editUser, retrieveUser, deleteUser, retreiveAll } from "./user.js";

const setUpRoutes = (app) => {
    app.post("/signup", createUser);
    app.post("/editProfile", editUser);
    app.post("/retrieveAccountInfo", retrieveUser);
    app.post("/deleteAccount", deleteUser);
    app.post("/retreiveAllUsers", retreiveAll);
}

export default setUpRoutes;