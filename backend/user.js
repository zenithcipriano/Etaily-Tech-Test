import bcrypt from 'bcrypt';
import { User, mongoose } from "./controller.js";

// Function to call for signing up
// Description: hashes password and adds user to database
const createUser = (req, res) => {
    try {
        const email = req.body.email.trim();
        const password = req.body.password;
                
            // Check first if user is already registered, i.e. e-mail has already been used
            User.findOne({ email: email }, async (err, user) => {
                    if(!err){
                        if(!user){
                            // Apply basic hashing to plaintext password before storing it
                            const hashedPassword = await bcrypt.hash(password, 10); 
                            
                            // Create a new instance of User
                            const newOwner = new User({
                                email: email,
                                password: hashedPassword,
                                fname: req.body.fname,
                                lname: req.body.lname,
                                role: "User",
                                active: true
                            });

                            // For checking on backend side
                            console.log("New user: ");
                            console.log(newOwner);

                            // Save new user to database, return response if successful or not
                            newOwner.save((err) => {
                                if (err) { 
                                    console.log(err);
                                    return res.send({ success: false, message: "Error encountered in saving user to database." }); 
                                }
                                else { 
                                    return res.send({ success: true, message: "Successfully Signed Up. Thank you!" }); 
                                }
                            });

                        // Existing user was found
                        } else{ 
                            console.log("User already exists.")
                            return res.send({ success: false, message: "Email already used." });
                        }
                        
                    // Error encountered
                    } else{ 
                        console.log("Error encountered when searching for user.")
                        return res.send({ success: false, message: "Error encountered when searching for user." });
                    }
                })

    // Catch server-side errors encountered
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Function to call for editing account information
// Description: checks if password is correct and email is verified
const editUser = (req, res) => {
    try {
        const id = req.body.id;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        console.log(`Editing User: ${id}`);

        User.findOne({ _id: mongoose.Types.ObjectId(id), active: true }, async (err, user) => {
            // Error encountered
            if(err){
                console.log("Error encountered when searching for user.")
                return res.send({ success: false, message: "Error encountered when searching for user." });
            } else {

                // User exists
                if(user){

                    // Compare passwords to verify
                    if (await bcrypt.compare(oldPassword, user.password)) {

                        const user = {
                            email: req.body.email.trim(),
                            fname: req.body.fname,
                            lname: req.body.lname,
                        }
                        
                        if (newPassword) {
                            const hashedPassword = await bcrypt.hash(newPassword, 10); 
                            user.password = hashedPassword
                        }

                        // Check if the user and the password is correct
                        User.updateOne({ _id: mongoose.Types.ObjectId(id) },
                            {
                                $set: user
                            },

                        function (err) {
                            if (!err) {
                                res.send({ success: true, message: "User's information edited successfully!" })
                            } else {
                                res.send({ success: false, message: "Failed to edit user details!" })
                            }
                        })

                    // Password does not match
                    } else {
                        console.log("Incorrect password.")
                        return res.send({ success: false, message: "Incorrect password." });
                    }
                
                // User not found
                } else {
                    console.log("User do not exist.")
                    return res.send({ success: false, message: "User not found." });
                }
            }
        })

    // Catch server-side errors encountered
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Function to call for logging in
// Description: checks if password is correct and email is verified
const retrieveUser = (req, res) => {
    try {
        const email = req.body.email.trim();
        const password = req.body.password;

        User.findOne({ email: email, active: true }, async (err, user) => {
            // Error encountered
            if(err){
                console.log("Error encountered when searching for user.")
                return res.send({ success: false, message: "Error encountered when searching for user." });
            } else {

                // User exists
                if(user){

                    const user1 = {
                        lname: user.lname,
                        fname: user.fname,
                        email: user.email,
                        role: user.role
                    }

                    // Compare passwords to verify
                    if (await bcrypt.compare(password, user.password)) {
                        res.send({ success: true, user: user1})

                    // Password does not match
                    } else {
                        console.log("Incorrect password.")
                        return res.send({ success: false, message: "Incorrect password." });
                    }
                
                // User not found
                } else {
                    console.log("User do not exist.")
                    return res.send({ success: false, message: "User not found." });
                }
            }
        })

    // Catch server-side errors encountered
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteUser = (req, res) => {
    try {
        const id = req.body.id;
        const password = req.body.password;

        console.log(`Deleting User:${id}`);

        User.findOne({ _id: mongoose.Types.ObjectId(id), active: true }, async (err, user) => {
            // Error encountered
            if(err){
                console.log("Error encountered when searching for user.")
                return res.send({ success: false, message: "Error encountered when searching for user." });
            } else {

                // User exists
                if(user){

                    // Compare passwords to verify
                    if (await bcrypt.compare(password, user.password)) {

                        // Check if the user and the password is correct
                        User.updateOne({ _id: mongoose.Types.ObjectId(id) },
                            {
                                $set: {
                                    active: false
                                }
                            },

                        function (err) {
                            if (!err) {
                                res.send({ success: true, message: "User's deleted successfully!" })
                            } else {
                                res.send({ success: false, message: "Failed to delete user!" })
                            }
                        })

                    // Password does not match
                    } else {
                        console.log("Incorrect password.")
                        return res.send({ success: false, message: "Incorrect password." });
                    }
                
                // User not found
                } else {
                    console.log("User do not exist.")
                    return res.send({ success: false, message: "User not found." });
                }
            }
        })

    // Catch server-side errors encountered
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export { createUser, editUser, retrieveUser, deleteUser }