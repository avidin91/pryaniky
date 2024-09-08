import {TableWidget} from "../../widgets/table";
import {AddRecordModal} from "../../widgets/add-record-modal";
import './styles.css'

export const Info = () => {
    return (
        <div className={'info'}>
            <h1>Таблица компании</h1>
            <AddRecordModal/>
            <TableWidget />
        </div>
    );
};
