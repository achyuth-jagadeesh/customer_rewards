import React from "react";

export const themes ={
    blue:{
        color:"blue"
    },
    yellow:{
        color:"yellow"
    },
    green:{
        color:"green"
    },
    red:{
        color:"red"
    }
}

export const AppThemeContext = React.createContext(themes.red)