import React, {FunctionComponent} from "react";
import styled from "styled-components";
import {TitlePage} from "./global-style";

type TableProps = {
  columns: { label: string; key: string }[];
  data: any[];
  rightButtonClick: (value: any) => void;
};

const TableStyle = styled.table`
  width: 100%;
  max-width: 750px;

  border-collapse: collapse;

  th {
    padding-left: 20px;
    text-align: left;
  }

  td {
    padding: 15px 20px;
    border-bottom: 2px solid #bad531;
  }
`;

const Table: FunctionComponent<TableProps> = ({columns, data, rightButtonClick}) => {
  let action = false;

  return (
    <>
      <TitlePage>Lista de usuários</TitlePage>
      <TableStyle>
        <thead>
          <tr key={Math.random()}>
            {columns.map(column => {
              if (column.label === "Ações") {
                action = true;
              }
              return <th key={Math.random()}>{column.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
        {data.map(item => {
          return (
            <tr>
              <td>{item.id}</td>

              <td>{item.email}</td>
              <td>
                {action && item.role !== "ADMINISTRATOR" && (
                  <button
                    style={{color: "transparent", border: "none", marginRight: "20px"}}
                    id={item.id}
                    onClick={() => rightButtonClick(item)}
                  >
                    <img style={{width: "20px"}} src="/assets/img/delete.svg" alt="Delete"/>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
        </tbody>
      </TableStyle>
    </>
  );
};

export default Table;
