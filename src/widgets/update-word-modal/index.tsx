import React, {FC, useEffect, useState} from 'react';
import {Button, Form, FormProps, Input, Modal} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import {useForm} from 'antd/es/form/Form';
import {tableItem} from "../../shared/types";
import {useAppDispatch} from "../../shared/store/hooks";
import {updateRecord} from "../../shared/store/slices/main.slice";

interface IUpdateModal {
    record: tableItem;
}

interface FieldType extends Omit<tableItem, 'id' | 'companySigDate' | 'employeeSigDate'> {
}

const UpdateModal: FC<IUpdateModal> = ({record}) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [form] = useForm();

    useEffect(() => {
        form.setFieldsValue(record)
    }, [])

    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish: FormProps<tableItem>['onFinish'] = (values) => {
        dispatch(updateRecord({...record, ...values}));
        form.resetFields();
        setOpen(false);
    };

    const onFinishFailed: FormProps<tableItem>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleUpdate = () => {
        setOpen(true);
    };

    return (
        <>
            <Button
                type="link"
                onClick={() => handleUpdate()}
                style={{border: '1px solid'}}
            >
                <EditOutlined style={{color: '#1677ff', fontSize: 20}}/>
            </Button>

            <Modal title="Title" open={open} onCancel={handleCancel} footer={null}>
                <Form
                    labelCol={{span: 12}}
                    name="updateRecord"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    <Form.Item<FieldType>
                        label="Имя подписи"
                        name="companySignatureName"
                        rules={[
                            {required: true, message: 'Пожалуйста введите название группы слов'},
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Название документа"
                        name="documentName"
                        rules={[
                            {required: true, message: 'Пожалуйста введите название группы слов'},
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Статус документа"
                        name="documentStatus"
                        rules={[
                            {required: true, message: 'Пожалуйста введите название группы слов'},
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Тип документа"
                        name="documentType"
                        rules={[
                            {required: true, message: 'Пожалуйста введите название группы слов'},
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Номер сотрудника"
                        name="employeeNumber"
                        rules={[
                            {required: true, message: 'Пожалуйста введите название группы слов'},
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Название подписи сотрудника"
                        name="employeeSignatureName"
                        rules={[
                            {required: true, message: 'Пожалуйста введите название группы слов'},
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Редактировать запись
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateModal;
