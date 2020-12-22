import React, { ReactNode } from "react"

interface ITable {
  children: ReactNode
  headers: string[]
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
        {children}
      </tbody>
    </table>
  </div>
)

export default Table
