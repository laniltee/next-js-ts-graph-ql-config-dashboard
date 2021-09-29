import type { NextPage } from "next";
import { PageHeader, Row, Col, Typography } from "antd";
import AddNewConfiguration from "./configurations/addNewConfiguration";
import ConfigurationsList from "./configurations/configurationsList";

const Home: NextPage = () => {
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Configurations"
      />
      <Row gutter={16}>
        <Col span={17}>
          <ConfigurationsList />
        </Col>
        <Col span={7}>
          <AddNewConfiguration />
        </Col>
      </Row>
    </>
  );
};

export default Home;
