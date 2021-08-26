import React, { ReactNode } from "react"

interface ITable {
  headers: string[]
  children: ReactNode
}
const Table: React.FC<ITable> = ({ headers, children }) => (
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
            <td colSpan={headers.length}>No record found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)

export default Table
