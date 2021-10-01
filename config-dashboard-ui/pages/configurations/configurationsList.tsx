import { Card, Typography, Table, Button, Space, Tag as AntDTag } from "antd";
import { useQuery, gql } from "@apollo/client";
import { Configuration, Tag } from "../../types/graphQlTypes";

const { Title } = Typography;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (text = null, record: Configuration) => (
      <>
        {record.tags.map((tag: Tag, index: number) => (
          <AntDTag key={`tag_${index}`}>{tag.name}</AntDTag>
        ))}
      </>
    ),
  },
  {
    title: "Actions",
    render: () => (
      <Space>
        <Button type="default" size="small">
          Edit
        </Button>
        <Button type="default" size="small">
          Delete
        </Button>
      </Space>
    ),
  },
];

export const CONFIGURATIONS_QUERY = gql`
  {
    configurations {
      description
      name
      tags {
        name
      }
    }
  }
`;

const ConfigurationsList = (): JSX.Element => {
  const { data } = useQuery(CONFIGURATIONS_QUERY);

  return (
    <Card>
      <Title level={5}>Available Configurations</Title>
      <Table dataSource={data?.configurations} columns={columns} />
    </Card>
  );
};

export default ConfigurationsList;
