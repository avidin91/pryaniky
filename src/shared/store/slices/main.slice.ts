import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {instanceWithHeaders} from "../../api/axios-api";
import {tableItem} from "../../types";

interface IMainState {
    isLoading: boolean;
    tableData: tableItem[],
}

interface IAddRecord extends Omit<tableItem, 'id'> {
}

export const fetchTable = createAsyncThunk('main/fetchTable', async () => {
    try {
        const response = await instanceWithHeaders.get('/ru/data/v3/testmethods/docs/userdocs/get');

        return response.data;
    } catch (e: any) {
        console.error(e.response.data.message);
    }
});

export const addRecord = createAsyncThunk('main/addRecord', async (data: IAddRecord, thunkAPI) => {
    try {
        const response = await instanceWithHeaders.post('/ru/data/v3/testmethods/docs/userdocs/create', data);

        thunkAPI.dispatch(fetchTable())

        return response.data;
    } catch (e: any) {
        console.error(e.response.data.message);
    }
});

export const deleteRecord = createAsyncThunk('main/deleteRecord', async (id: string, thunkAPI) => {
    try {
        const response = await instanceWithHeaders.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`);

        thunkAPI.dispatch(fetchTable())

        return response.data;
    } catch (e: any) {
        console.error(e.response.data.message);
    }
});

export const updateRecord = createAsyncThunk('main/addRecord', async (data: tableItem, thunkAPI) => {
            const {
                companySigDate,
                companySignatureName,
                employeeSignatureName,
                employeeSigDate,
                employeeNumber,
                documentName,
                documentStatus,
                documentType,
                id
            } = data;

            try {
                const response = await instanceWithHeaders.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
                            companySigDate,
                            companySignatureName,
                            employeeSignatureName,
                            employeeSigDate,
                            employeeNumber,
                            documentName,
                            documentStatus,
                            documentType
                        }
                    )
                ;

                thunkAPI.dispatch(fetchTable())

                return response.data;
            } catch (e: any) {
                console.error(e.response.data.message);
            }
        }
    )
;

const initialState: IMainState = {
    isLoading: false,
    tableData: [],
};

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTable.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchTable.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tableData = action.payload.data
            })
            .addCase(fetchTable.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default mainSlice.reducer;
