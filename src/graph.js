import React from "react"
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import
{
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const Graph = () =>
{

    // const data2 = [{"recipient_id":"3652eb59-124d-42fc-88d4-ee770b73d2c6","text":"{\"msg\": \"Active flocks as of today are the following\", \"header\": \"\", \"detail\": \"[{\\\"house\\\":\\\"32\\\",\\\"flocknumber\\\":\\\"-1\\\",\\\"population\\\":null,\\\"hatchingdate\\\":\\\"10-13-2019\\\",\\\"housingdate\\\":\\\"10-13-2019\\\",\\\"flockenddate\\\":\\\"10-13-2019\\\",\\\"breed\\\":null},{\\\"house\\\":\\\"54\\\",\\\"flocknumber\\\":\\\"234\\\",\\\"population\\\":4000.0,\\\"hatchingdate\\\":null,\\\"housingdate\\\":null,\\\"flockenddate\\\":null,\\\"breed\\\":null},{\\\"house\\\":\\\"1\\\",\\\"flocknumber\\\":\\\"345\\\",\\\"population\\\":100000.0,\\\"hatchingdate\\\":\\\"03-10-2021\\\",\\\"housingdate\\\":null,\\\"flockenddate\\\":\\\"03-10-2021\\\",\\\"breed\\\":\\\"BOVB\\\"}]\"}"}]
    // const data3 = (data2.map(data2 => data2.text))
    // console.log('data3', data3)
    const data = {
        labels: [ "500N", "4000", "1000", "600N", "3000", "700N" ],
        datasets: [
            {
                data: [ 2543078394, 2034794331, 1654255599, 1213043204, 531989436, 156817710 ],
            }
        ],
    };

    const screenWidth = Dimensions.get( "window" ).width;

    const chartConfig = {
        backgroundColor: 'white',
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        fillShadowGradient: 'purple',
        fillShadowGradientOpacity: 5,
        color: () => `purple`,
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
        <View style={ { height: '100%' } }>
            <BarChart
                data={ data }
                width={ screenWidth }
                height={ 220 }
                chartConfig={ chartConfig }
                withInnerLines={false}
            />
        </View>

    )
}
export default Graph;