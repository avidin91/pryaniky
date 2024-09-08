import {Button, Form, FormProps, Input, message, Modal} from "antd";
import {useState} from "react";
import {useForm} from "antd/es/form/Form";
import './styles.css';
import {tableItem} from "../../shared/types";
import {useAppDispatch} from "../../shared/store/hooks";
import {addRecord} from "../../shared/store/slices/main.slice";

interface FieldType extends Omit<tableItem, 'id' | 'companySigDate' | 'employeeSigDate'> {}

export const AddRecordModal = () => {
    const [form] = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const companySigDate = new Date().toISOString() + '\t';
        const employeeSigDate =  new Date().toISOString() + '\t';
        dispatch(addRecord({...values, companySigDate, employeeSigDate}))
        form.resetFields();
        handleCancel()
    }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        message.error('Ошибка, повторите попытку !')
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Button type='primary' onClick={showModal} className='add-record-button'>Добавить запись</Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    labelCol={{span: 12}}
                    name="addRecord"
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
                            Добавить запись
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

