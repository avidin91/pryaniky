import {Button, Form, FormProps, Input, message} from "antd";
import './styles.css'
import {instanceNoHeaders} from "../../shared/api/axios-api";
import {setTokenToLocalStorage} from "../../shared/utils/localstorage.helper";
import {useNavigate} from "react-router-dom";

export const Auth = () => {
    const navigate = useNavigate();

    type FieldType = {
        username: string;
        password: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async ({username, password}) => {
        const {data} = await instanceNoHeaders.post('/ru/data/v3/testmethods/docs/login', {
            username,
            password,
        })

        if (data.data.token) {
            setTokenToLocalStorage(data.data.token)
            navigate('/info')
        } else {
            message.error('Ошибка, повторите попытку !')
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        message.error('Ошибка, повторите попытку !')
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={'auth'}>
            <h1 >Войдите в аккаунт</h1>
            <Form
                name="basic"
                labelCol={{span: 6}}
                className={'auth-form'}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout={'horizontal'}
            >
                <Form.Item<FieldType>
                    label="Имя"
                    name="username"
                    rules={[{required: true, message: 'Пожалуйста введите имя!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Пожалуйста введите пароль!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
