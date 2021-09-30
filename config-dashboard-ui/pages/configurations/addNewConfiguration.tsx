import { Button, Card, Form, Input, Typography, Select, Space } from "antd";
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

type ConfigurationInputs = {
  name: string;
  description: string;
  tags?: string[];
};

const AddNewConfiguration = (): JSX.Element => {
  const { data } = useQuery(TAGS_QUERY);
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: ConfigurationInputs) => {
    console.log(values);
  };

  return (
    <Card>
      <Title level={5}>Add New </Title>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input Name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input Description!" }]}
        >
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
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
        <Form.Item className="text-right">
          <Space>
            <Button type="default" htmlType="button" onClick={onReset}>
              Reset{" "}
            </Button>
            <Button type="primary" htmlType="submit">
              Add{" "}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddNewConfiguration;
