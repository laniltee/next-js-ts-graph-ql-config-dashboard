import type { NextPage } from 'next'
import {PageHeader} from "antd";

const Organizations: NextPage = () => {
  return (
      <>
          <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="Organization"
          />
      </>
  )
}

export default Organizations
