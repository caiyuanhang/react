import React from "react";
import { withStorage } from "../utils/hoc";

export default function Mine(props){
    console.log("Mine的props：",props);

    return (<div style={{ backgroundColor: "indianred" }}>Mine</div>)
}

Mine = withStorage(["currentUser","token"])(Mine);