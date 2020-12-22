import React, { ReactNode } from "react"

interface ITable {
  headers: string[]
  children: ReactNode
}
const Table: React.FC<ITable> = ({ children, headers }) => (
  <div className="table-container">
    <table className="table is-striped is-hoverable is-fullwidth">
      <thead>
        {headers.map(header => (
          <th key={header}>{header}</th>
        ))}
      </thead>
      <tbody>
        {children || (
          <tr className="has-text-centered"><td colSpan={headers.length}>No Record Found</td></tr>
        )}
      </tbody>
    </table>
  </div>
)

export default Table
