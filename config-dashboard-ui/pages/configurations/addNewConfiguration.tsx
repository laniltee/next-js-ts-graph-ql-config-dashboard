import { Button, Card, Form, Input, Typography, Select, Space } from "antd";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Tag } from "../../types/graphQlTypes";
import { CONFIGURATIONS_QUERY } from "./configurationsList";

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

const TAGS_MUTATION = gql`
  mutation TagsMutation($tags: [String!]!) {
    createTags(tags: $tags) {
      id
      name
    }
  }
`;

const CONFIGURATION_MUTATION = gql`
  mutation Mutation($name: String!, $description: String, $tags: [Int]) {
    createConfiguration(name: $name, description: $description, tags: $tags) {
      id
      description
      name
      tags {
        name
      }
    }
  }
`;

type ConfigurationInputs = {
  name: string;
  description: string;
  tags?: string[];
};

let savedTagIds: number[] = [];

const AddNewConfiguration = (): JSX.Element => {
  const { data } = useQuery(TAGS_QUERY);
  const [form] = Form.useForm();

  const [createTags] = useMutation(TAGS_MUTATION, {
    variables: {
      tags: form
        .getFieldValue("tags")
        ?.filter((tag: string | number) => !Number.isInteger(tag)),
    },
    refetchQueries: [TAGS_QUERY],
  });

  const [createConfiguration] = useMutation(CONFIGURATION_MUTATION, {
    variables: {
      name: form.getFieldValue("name"),
      description: form.getFieldValue("description"),
      tags: form
        .getFieldValue("tags")
        ?.filter((tag: string | number) => Number.isInteger(tag))
        .concat(savedTagIds),
    },
    refetchQueries: [CONFIGURATIONS_QUERY],
  });

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values: ConfigurationInputs) => {
    if (values.tags?.length) {
      const { data } = await createTags();
      savedTagIds =
        data?.createTags?.map((createdTag: Tag) => createdTag.id) || [];
    }
    await createConfiguration();
    onReset();
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
            maxTagCount={4}
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
