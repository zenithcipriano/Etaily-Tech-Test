import axios from "axios";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./Signup.css";

function Signup() {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleChangeFName = (event)  => {
        setFname(event.target.value);
    }

    const handleChangeLName = (event)  => {
        setLname(event.target.value);
    }

    const handleChangeEmail = (event)  => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event)  => {
        setPassword(event.target.value);
    }

    const clear = () => {
        setFname("");
        setLname("");        
        setEmail("");        
        setPassword("");        
    }

    const [Loading, setLoading] = useState(false);

    const signup = async (event) => {
        event.preventDefault();

        const user = {
            fname,
            lname,
            email,
            password
        }

        if(!Loading) {
            setLoading(true);

            await axios({
                method: 'post',
                url: process.env.REACT_APP_API_URL+"/signup",
                data: user,
            }).then((res) => {
                alert(res.data.message);

                if(res.data.success){
                    clear() 
                }

                setLoading(false);
            })
        }
    }

    return (
      <div className="Signup">

        <IoMdArrowRoundBack size={30} style={{marginBottom: -64}}/>
        <h1 style={{textAlign: "center"}}> Signup </h1>

        <form onSubmit={signup}>
            <fieldset>
                <legend>First Name</legend>
                <input required type="text" className='input1' value={fname} onChange={handleChangeFName} placeholder="ex. Juan"/>
            </fieldset>

            <fieldset>
                <legend>Last Name</legend>    
                <input required type="text" className='input1' value={lname} onChange={handleChangeLName} placeholder="ex. Dela Cruz"/>
            </fieldset>

            <fieldset>
                <legend>Email</legend>
                <input required type="email" className='input1' value={email} onChange={handleChangeEmail} placeholder="ex. sample@gmail.com"/>
            </fieldset>

            <fieldset>
                <legend>Password</legend>
                <input required type="password" className='input1' value={password} onChange={handleChangePassword} placeholder="ex. password"/>
            </fieldset>

            <table id='buttons'>
                <tr>
                    <td>
                        <input type="button" id="submitSignup" onClick={clear} value={"Clear"}/>
                    </td>
                    <td>
                        <input type="submit" id="submitSignup" />
                    </td>
                </tr>
            </table>
        </form>
      </div>
    );
  }
  
export default Signup;
  