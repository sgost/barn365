import React, { useState } from "react"
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import
{
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const Graph = ( { datas } ) =>
{



    const up = datas
    const upp = datas.text.detail

    const graphLabels = up.text.chart_x === "breed" || up.text.chart_y === "breed" ? [ "HYW" ] : up.text.chart_x === "site" || up.text.chart_y === "site" ? [ "Layers" ] : up.text.chart_x === "house" || up.text.chart_y === "house" ? [ "7", "3", "4", "5", "6", "1" ] : up.text.chart_x === "flocknumber" || up.text.chart_y === "flocknumber" ? [ "700N", "300O", "400O", "500N", "600N", "100O" ] : [ "700N", "300O", "400O", "500N", "600N", "100O" ];
    const graphData = up.text.chart_x === "breed" || up.text.chart_y === "breed" ? [ 162730.0 ] : up.text.chart_x === "site" || up.text.chart_y === "site" ? [ 547526.0 ] : up.text.chart_x === "house" || up.text.chart_y === "house" ? [ 146136.0, 84910.0, 83930.0, 79630.0, 79100.0, 73820.0 ] : up.text.chart_x === "flocknumber" || up.text.chart_y === "flocknumber" ? [ 146136.0, 84910, 83930.0, 79630.0, 79100.0, 73820.0 ] : [ "700N", "300O", "400O", "500N", "600N", "100O" ];
    const tableData = up.text.chart_x === "breed" || up.text.chart_y === "breed" ? [ [ 'HYW', '162730.0' ] ] : up.text.chart_x === "site" || up.text.chart_y === "site" ? [ [ 'Layers', '547526.0' ] ] : up.text.chart_x === "house" || up.text.chart_y === "house" ? [ [ '7', '146136.0' ], [ '3', '84910.0' ], [ '4', '83930.0' ], [ '5', '79630.0' ], [ '6', '79100.0' ], [ '1', '73820.0' ] ] : up.text.chart_x === "flocknumber" || up.text.chart_y === "flocknumber" ? [ [ '700N', '146136.0' ], [ '300O', '84910' ], [ '400O', '83930.0' ], [ '500N', '79630.0' ], [ '600N', '79100.0' ], [ '100O', '73820.0' ] ] : [ "700N", "4000", "1000", "600N", "3000", "700N" ];

    console.log( 'datas', datas )
    console.log( 'labelData', graphLabels )

    console.log( 'up.text.chart_', up.text.chart_x === "house" || up.text.chart_y === "house" ? "yes" : "no" )
    console.log( 'datas.detail', upp )


    const [ toggle, setToggle ] = useState( 1 );


    // console.log('data3', data3)
    const data = {
        labels: graphLabels,
        datasets: [
            {
                data: graphData,
            }
        ],
    };
    const main = {
        tableHead: [ datas.text.chart_x.toUpperCase(), datas.text.chart_y.toUpperCase() ],
        tableData: tableData
    }


    const screenWidth = Dimensions.get( "window" ).width;

    const chartConfig = {
        backgroundColor: 'white',
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        fillShadowGradient: '#1e2a5c',
        fillShadowGradientOpacity: 2,
        color: () => `#1e2a5c`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        },
        labelColor: () => `gray`,
    };


    return (
        <View style={ { height: '100%', backgroundColor: 'white' } }>
            <Text style={ { color: 'black', fontSize: 15, marginTop: 20, marginBottom: 20, fontWeight: 'bold' } }>{ datas.text.msg.toUpperCase() }</Text>
            <View style={ { flexDirection: 'row', alignItems: 'center', marginBottom: 20 } }>
                <TouchableOpacity onPress={ () => setToggle( 1 ) }>
                    <Image style={ { width: 30, height: 30, resizeMode: 'stretch', borderColor: ( toggle === 1 ? 'gray' : 'transparent' ), borderWidth: 2 } } source={ {
                        uri: 'https://www.kindpng.com/picc/m/117-1170352_line-graph-graph-icon-png-free-transparent-png.png'
                    } } />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => setToggle( 2 ) }>
                    <Image style={ { width: 30, height: 30, resizeMode: 'stretch', marginLeft: 30, borderColor: toggle === 2 ? 'gray' : 'transparent', borderWidth: 2 } } source={ {
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKv9ndniGwrPHJa2C9szk-P1KJ3c5n2sUVSA&usqp=CAU'
                    } } />
                </TouchableOpacity>

            </View>
            {
                toggle === 1 ?
                    <View>

                        <BarChart
                            data={ data }
                            width={ screenWidth }
                            height={ 220 }
                            chartConfig={ chartConfig }
                            withInnerLines={ true }
                        />
                    </View>
                    :
                    <View style={ { flex: 1, padding: 16, paddingTop: 10, backgroundColor: 'white', width: ( screenWidth ), overflow: 'scroll' } }>
                        <Table borderStyle={ { borderWidth: 2, borderColor: '#c8e1ff' } }>
                            <Row data={ main.tableHead } style={ { height: 40, backgroundColor: '#1e2a5c' } } textStyle={ { margin: 6, color: 'white' } } />
                            <Rows data={ main.tableData } textStyle={ { margin: 6, color: '#212529' } } />
                        </Table>
                    </View>
            }
        </View>

    )
}
export default Graph;