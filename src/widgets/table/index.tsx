import {useAppDispatch, useAppSelector} from "../../shared/store/hooks";
import {useEffect, useState} from "react";
import {deleteRecord, fetchTable} from "../../shared/store/slices/main.slice";
import {Button, Modal, Table} from "antd";
import {isoToDateString} from "../../shared/utils/date.helper";
import {DeleteOutlined} from "@ant-design/icons";
import {tableItem} from "../../shared/types";
import UpdateModal from "../update-word-modal";

export const TableWidget = () => {
    const {tableData, isLoading} = useAppSelector(state => state.mainStore);
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTable())
    },[])

    const columns = [
        {
            title: 'Дата подписи',
            dataIndex: 'companySigDate',
            key: 'companySigDate',
            render: (isoString: string) => isoToDateString(isoString),
        },
        {
            title: 'Имя подписи',
            dataIndex: 'companySignatureName',
            key: 'companySignatureName',
        },
        {
            title: 'Название документа',
            dataIndex: 'documentName',
            key: 'documentName',
        },
        {
            title: 'Статус документа',
            dataIndex: 'documentStatus',
            key: 'documentStatus',
        },
        {
            title: 'Тип документа',
            dataIndex: 'documentType',
            key: 'documentType',
        },
        {
            title: 'Номер сотрудника',
            dataIndex: 'employeeNumber',
            key: 'employeeNumber',
        },
        {
            title: 'Дата подписи сотрудника',
            dataIndex: 'employeeSigDate',
            key: 'employeeSigDate',
            render: (isoString: string) => isoToDateString(isoString),
        },
        {
            title: 'Название подписи сотрудника',
            dataIndex: 'employeeSignatureName',
            key: 'employeeSignatureName',
        },
        {
            title: 'Редактировать',
            key: 'edit',
            render: (record: tableItem) => <UpdateModal record={record} />,
        },
        {
            title: 'Удалить',
            key: 'delete',
            render: (record: tableItem) => {
                const showModal = () => {
                    setIsModalOpen(true);
                };

                const handleOk = () => {
                    dispatch(deleteRecord(record.id))
                    setIsModalOpen(false);
                };

                const handleCancel = () => {
                    setIsModalOpen(false);
                };

                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Удалить запись?</p>
                </Modal>

                return (
                    <Button
                        type="link"
                        danger
                        onClick={() => dispatch(deleteRecord(record.id))}
                        style={{ border: '1px solid' }}
                    >
                        <DeleteOutlined style={{ color: 'red', fontSize: 20 }} />
                    </Button>
                )
            },
        },
    ];

    const dataSource = tableData.map((tableItem) => ({
        ...tableItem,
        key: tableItem.id,
    }));


    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={'id'}
            loading={isLoading}
        />
    );
};
