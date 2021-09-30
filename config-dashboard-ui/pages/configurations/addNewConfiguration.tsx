import { Button, Card, Form, Input, Typography, Select } from "antd";
import { useQuery, gql } from "@apollo/client";
import { Tag } from "../../types/graphQlTypes";

const { Title } = Typography;
const { Option } = Select;

const TAGS_QUERY = gql`
  {
    tags {
      name
      id
    }
  }
`;

const AddNewConfiguration = (): JSX.Element => {
  const { data } = useQuery(TAGS_QUERY);

  return (
    <Card>
      <Title level={5}>Add New </Title>
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Description">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Tags">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Select Tags"
          >
            {data?.tags.map((tag: Tag) => (
              <Option value={tag.id} key={`tag_${tag.id}`}>
                {tag.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" block>
            Add{" "}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddNewConfiguration;
