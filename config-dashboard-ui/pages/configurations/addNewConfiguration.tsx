import {Button, Card, Form, Input, Typography} from "antd";

const {Title} = Typography

const AddNewConfiguration = (): JSX.Element => {
    return (
        <Card>
            <Title level={5}>Add New </Title>
            <Form layout="vertical">
                <Form.Item label="Name">
                    <Input placeholder="input placeholder"/>
                </Form.Item>
                <Form.Item label="Description">
                    <Input placeholder="input placeholder"/>
                </Form.Item>
                <Form.Item label="Tags">
                    <Input placeholder="input placeholder"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" block>Add </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default AddNewConfiguration
