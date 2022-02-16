import React from "react"
import { Text, View, Dimensions } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const Tables = () =>
{

    const main = {
        tableHead: ['HOUSE', 'SITE', 'BIN1', 'BIN2', 'TOTAL'],
        tableData:[[7, 'LAYERS', 42600, 1460, 44060]],
    }


    const screenWidth = Dimensions.get( "window" ).width;

    return (
        <View style={ { height: '100%', backgroundColor: 'white' } }>
            <Text style={{color: 'black', marginTop: 20, fontWeight: 'bold'}}>BIN STATUS FOR TODAY IS THE FOLLOWING :</Text>
            <View style={ { flex: 1, padding: 16, paddingTop: 10, backgroundColor: 'white', width: ( screenWidth ), overflow: 'scroll' } }>
                <Table borderStyle={ { borderWidth: 2, borderColor: '#c8e1ff' } }>
                    <Row data={ main.tableHead } style={ { height: 40, backgroundColor: '#1e2a5c' } } textStyle={ { margin: 6, color: 'white' } } />
                    <Rows data={ main.tableData } textStyle={ { margin: 6, color: '#212529' } } />
                </Table>
            </View>
        </View>

    )
}
export default Tables;