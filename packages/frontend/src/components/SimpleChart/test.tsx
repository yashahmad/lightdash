import * as echarts from 'echarts';
import { FC, useEffect, useState } from 'react';

function useIsServer() {
    const [isServer, setIsServer] = useState(true);
    useEffect(() => {
        setIsServer(false);
    }, []);
    return isServer;
}

export const TestChart2: FC<{ option: any; notMerge: boolean }> = ({
    option,
    notMerge,
}) => {
    // In SSR mode the first container parameter is not required
    const chart = echarts.init(null as any, null as any, {
        renderer: 'svg', // must use SVG rendering mode
        ssr: true, // enable SSR
        width: 400, // need to specify height and width
        height: 300,
    });

    // use setOption as normal
    chart.setOption(option, notMerge);

    // Output a string
    return <>{chart.renderToSVGString()} </>;
};
