import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope="col"
          >
            {columns[column].name}
            <i
              className={
                selectedSort.path === columns[column].path
                  ? selectedSort.order === 'desc'
                    ? 'bi bi-caret-down-fill'
                    : 'bi bi-caret-up-fill'
                  : null
              }
            ></i>
          </th>
        ))}
        {/* <th scope="col">Качества</th>
        <th onClick={() => handleSort('profession.name')} scope="col">
          Профессия
        </th>
        <th onClick={() => handleSort('completedMeetings')} scope="col">
          Встретился, раз
        </th>
        <th onClick={() => handleSort('rate')} scope="col">
          Оценка
        </th>
        <th onClick={() => handleSort('bookmark')} scope="col">
          Избранное
        </th>
        <th scope="col"></th> */}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object
}

export default TableHeader
