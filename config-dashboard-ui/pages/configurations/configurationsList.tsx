import {Card, Typography, Table, Button, Space, Tag} from "antd";

const {Title} = Typography

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: () => (
            <>
                <Tag>Tag 1</Tag>
                <Tag>Tag 1</Tag>
            </>
        )
    },
    {
        title: 'Actions',
        render: () => (
            <Space>
                <Button type="default" size="small">
                    Edit
                </Button>
                <Button type="default" size="small">
                    Delete
                </Button>
            </Space>
        )
    },
];

const ConfigurationsList = (): JSX.Element => {
    return (
        <Card>
            <Title level={5}>Available Configurations</Title>
            <Table dataSource={dataSource} columns={columns} pagination={false}/>
        </Card>
    )
}

export default ConfigurationsList
