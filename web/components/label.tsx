import styled from "styled-components"

type LabelProps = {
    sala: number
}

const Label = styled.div<LabelProps>`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background: red;
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: ${props => 
        props.sala === 1 && "red" ||
        props.sala === 2 && "blue" ||
        props.sala === 3 && "green"
    };
`

export default Label;