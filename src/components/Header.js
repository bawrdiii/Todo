import React , {useContext}from "react";
import AuthContext from "./auth-context";
const Header = (props) => {

    const auth = useContext(AuthContext)
    return (
        <div>
            {auth.status ? (
            <button onClick={props.onLoadTodos}>Todo List</button>
            ) : null}
        </div>
    )
}


export default Header ;