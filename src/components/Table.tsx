import React, { ReactNode } from "react"
import useConstants from "../utils/hooks/useConstants"

interface ITable {
  headers: string[]
  children: ReactNode
}
const Table: React.FC<ITable> = ({ headers, children }) => {
  const constants = useConstants()

  return (
    <div className="table-container">
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={`header${i}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children || (
            <tr className="has-text-centered">
              <td colSpan={headers.length}>
                {constants.message.noRecordFound}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
