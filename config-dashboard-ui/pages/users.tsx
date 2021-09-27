import type { NextPage } from 'next'
import {PageHeader} from "antd";

const Users: NextPage = () => {
  return (
      <>
          <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="Users"
          />
      </>
  )
}

export default Users
