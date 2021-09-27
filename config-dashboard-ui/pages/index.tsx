import type { NextPage } from 'next'
import { PageHeader } from 'antd';

const Home: NextPage = () => {
  return (
    <>
        <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Configurations"
        />
    </>
  )
}

export default Home
