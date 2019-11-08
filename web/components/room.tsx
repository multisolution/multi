import React, {useState, useCallback, useEffect, MouseEvent} from "react";
import Label from "./label";
import styled from "styled-components"


const BoxRoom = styled.article`
    /* max-width: 300px; */
    /* min-width:100px; */
    flex-basis: 200px;
    /* outline: 1px solid red; */
    position: relative;
    margin: 5px;

    img{
        max-width: 100%;
        width: 100%;
        background: gold;
    }
`

    const Room = (props: {roomId: number, roomName: string, onClick?: (event: MouseEvent)=> void}) =>{


    const roomSelect = (roomSelected:string) =>{
        alert(roomSelected);
    
    }

    return(

        <BoxRoom onClick={props.onClick}>
            <h1>{props.roomName}</h1>
            <img src="assets/img/sala-generica.png"></img>
            <Label sala={Number(props.roomId)}></Label>
        </BoxRoom>

    )
}


export default Room
