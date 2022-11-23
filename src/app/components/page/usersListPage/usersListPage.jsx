import { React, useState, useEffect } from 'react'
import Pagination from '../../common/pagination'
import { paginate } from '../../../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from '../../common/groupList'
import API from '../../../api'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import Search from '../../common/form/search'
import _ from 'lodash'

const UsersListPage = () => {
  const pageSize = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [searchData, setSearchData] = useState('')

  const [users, setUsers] = useState()

  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelUsers = (id) => {
    setUsers(users.filter((user) => user._id !== id))
  }

  const handlToggleBookmark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    )
  }

  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    if (searchData !== '') setSearchData('')
    setSelectedProf(item)
  }

  const clearFilter = () => {
    setSelectedProf()
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  // search
  const handleSearchChange = ({ target }) => {
    setSearchData(target.value)
    setSelectedProf(undefined)
  }
  // search

  if (users && users.length !== 0) {
    // const searchedUsers = users.filter((user) =>
    //   user.name.toLowerCase().includes(searchData.toLowerCase())
    // )

    const filteredUsers = searchData
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchData.toLowerCase())
        )
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users

    const count = filteredUsers.length

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    const userCrop = paginate(sortedUsers, currentPage, pageSize)
    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <Search value={searchData} onChange={handleSearchChange} />
          <UsersTable
            userCrop={userCrop}
            onSort={handleSort}
            selectedSort={sortBy}
            onDelete={handleDelUsers}
            onToggleBookmark={handlToggleBookmark}
          />
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return <span>loading...</span>
  }
}

UsersListPage.propTypes = {
  users: PropTypes.array,
  onDelete: PropTypes.func,
  onToggleBookmark: PropTypes.func
}
export default UsersListPage
