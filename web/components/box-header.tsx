import React, {useState, useCallback, useEffect, MouseEvent} from "react";
import Label from "./label";
import styled from "styled-components"

const UserBox = styled.div`
    display: flex;
    flex-direction: column;

`

    const BoxHeader = () =>{

    return(
    <UserBox>
        <span>Carlos William</span>
        <button>Sair</button>
    </UserBox>
    )
}


export default BoxHeader
