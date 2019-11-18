import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { Align, Row } from "./grid";


const Title = styled.h1`
  flex: 1;
  font-size: 1.8rem;
  color: ${props => props.theme.colors.dark};
`;

const TR = styled.tr`
    background: red;
`

const TD = styled.td`
    background: red;
`

type TableProps = {
  title: string;

};

const Table: FunctionComponent<TableProps> = ({ title }) => {

  return (
    <>
      <table>
          <thead>
              <TR>
                  <TD>ID</TD>
                  <TD>E-mail</TD>
                  <TD>Ações</TD>
              </TR>
          </thead>
          <tbody>
              <TR>
                  <TD>
                      #9i09i90
                  </TD>
                  <TD>
                      carloswilliamds@gmail.com
                  </TD>
                  <TD>
                      BTN
                  </TD>
              </TR>
              <TR>
                  <TD>
                      #9i09i90
                  </TD>
                  <TD>
                      carloswilliamds@gmail.com
                  </TD>
                  <TD>
                      BTN
                  </TD>
              </TR>
          </tbody>
      </table>
    </>
  );
};

export default Table;
