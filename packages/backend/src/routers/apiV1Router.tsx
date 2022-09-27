import { TestChart2 } from '@lightdash/frontend/src/components/SimpleChart/test';
import express from 'express';
import passport from 'passport';
import puppeteer from 'puppeteer';
import { renderToString } from 'react-dom/server';
import { lightdashConfig } from '../config/lightdashConfig';
import {
    redirectOIDCFailure,
    redirectOIDCSuccess,
    storeOIDCRedirect,
    unauthorisedInDemo,
} from '../controllers/authentication';
import { userModel } from '../models/models';
import { UserModel } from '../models/UserModel';
import { healthService, userService } from '../services/services';
import { sanitizeEmailParam, sanitizeStringParam } from '../utils';
import { dashboardRouter } from './dashboardRouter';
import { inviteLinksRouter } from './inviteLinksRouter';
import { jobsRouter } from './jobsRouter';
import { organizationRouter } from './organizationRouter';
import { passwordResetLinksRouter } from './passwordResetLinksRouter';
import { projectRouter } from './projectRouter';
import { savedChartRouter } from './savedChartRouter';
import { userRouter } from './userRouter';

export const apiV1Router = express.Router();

function App() {
    return <div>Hello World</div>;
}

const options = {
    useUTC: true,
    color: ['#12664f'],
    darkMode: 'auto',
    colorBy: 'series',
    gradientColor: ['#f6efa6', '#d88273', '#bf444c'],
    aria: {
        decal: {
            decals: [
                {
                    color: 'rgba(0, 0, 0, 0.2)',
                    dashArrayX: [1, 0],
                    dashArrayY: [2, 5],
                    symbolSize: 1,
                    rotation: 0.5235987755982988,
                },
                {
                    color: 'rgba(0, 0, 0, 0.2)',
                    symbol: 'circle',
                    dashArrayX: [
                        [8, 8],
                        [0, 8, 8, 0],
                    ],
                    dashArrayY: [6, 0],
                    symbolSize: 0.8,
                },
                {
                    color: 'rgba(0, 0, 0, 0.2)',
                    dashArrayX: [1, 0],
                    dashArrayY: [4, 3],
                    rotation: -0.7853981633974483,
                },
                {
                    color: 'rgba(0, 0, 0, 0.2)',
                    dashArrayX: [
                        [6, 6],
                        [0, 6, 6, 0],
                    ],
                    dashArrayY: [6, 0],
                },
                {
                    color: 'rgba(0, 0, 0, 0.2)',
                    dashArrayX: [
                        [1, 0],
                        [1, 6],
                    ],
                    dashArrayY: [1, 0, 6, 0],
                    rotation: 0.7853981633974483,
                },
                {
                    color: 'rgba(0, 0, 0, 0.2)',
                    symbol: 'triangle',
                    dashArrayX: [
                        [9, 9],
                        [0, 9, 9, 0],
                    ],
                    dashArrayY: [7, 2],
                    symbolSize: 0.75,
                },
            ],
        },
    },
    textStyle: {
        fontFamily: 'sans-serif',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal',
    },
    stateAnimation: { duration: 300, easing: 'cubicOut' },
    animation: false,
    animationDuration: 1000,
    animationDurationUpdate: 500,
    animationEasing: 'cubicInOut',
    animationEasingUpdate: 'cubicInOut',
    animationThreshold: 2000,
    progressiveThreshold: 3000,
    progressive: 400,
    hoverLayerThreshold: 3000,
    dataset: [
        {
            id: 'lightdashResults',
            source: [
                {
                    dbt_orders_order_date_week: '2022-05-30T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '823',
                },
                {
                    dbt_orders_order_date_week: '2022-05-23T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '7707',
                },
                {
                    dbt_orders_order_date_week: '2022-05-16T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '10361',
                },
                {
                    dbt_orders_order_date_week: '2022-05-09T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '23732',
                },
                {
                    dbt_orders_order_date_week: '2022-05-02T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '38069',
                },
                {
                    dbt_orders_order_date_week: '2022-04-25T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '21947',
                },
                {
                    dbt_orders_order_date_week: '2022-04-18T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '6822',
                },
                {
                    dbt_orders_order_date_week: '2022-04-11T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '1399',
                },
                {
                    dbt_orders_order_date_week: '2022-04-04T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '3064',
                },
                {
                    dbt_orders_order_date_week: '2022-03-28T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '1727',
                },
                {
                    dbt_orders_order_date_week: '2022-03-21T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '1689',
                },
                {
                    dbt_orders_order_date_week: '2022-03-14T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '1624',
                },
                {
                    dbt_orders_order_date_week: '2022-03-07T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '680',
                },
                {
                    dbt_orders_order_date_week: '2022-02-28T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '304',
                },
                {
                    dbt_orders_order_date_week: '2022-02-21T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '1159',
                },
                {
                    dbt_orders_order_date_week: '2022-02-14T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '1435',
                },
                {
                    dbt_orders_order_date_week: '2022-02-07T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '2645',
                },
                {
                    dbt_orders_order_date_week: '2022-01-31T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '3859',
                },
                {
                    dbt_orders_order_date_week: '2022-01-24T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '7605',
                },
                {
                    dbt_orders_order_date_week: '2022-01-17T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '4640',
                },
                {
                    dbt_orders_order_date_week: '2022-01-10T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '797',
                },
                {
                    dbt_orders_order_date_week: '2022-01-03T00:00:00.000Z',
                    dbt_orders_sum_of_basket_total: '381',
                },
            ],
            seriesLayoutBy: 'column',
        },
    ],
    timeline: [],
    title: [],
    toolbox: [],
    graphic: [],
    calendar: [],
    singleAxis: [],
    radiusAxis: [],
    angleAxis: [],
    polar: [],
    axisPointer: [
        {
            show: 'auto',
            z: 50,
            type: 'line',
            snap: false,
            triggerTooltip: true,
            value: null,
            status: null,
            link: [],
            animation: null,
            animationDurationUpdate: 200,
            lineStyle: { color: '#B9BEC9', width: 1, type: 'dashed' },
            shadowStyle: { color: 'rgba(210,219,238,0.2)' },
            label: {
                show: true,
                formatter: null,
                precision: 'auto',
                margin: 3,
                color: '#fff',
                padding: [5, 7, 5, 7],
                backgroundColor: 'auto',
                borderColor: null,
                borderWidth: 0,
                borderRadius: 3,
            },
            handle: {
                show: false,
                icon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
                size: 45,
                margin: 50,
                color: '#333',
                shadowBlur: 3,
                shadowColor: '#aaa',
                shadowOffsetX: 0,
                shadowOffsetY: 2,
                throttle: 40,
            },
        },
    ],
    tooltip: [
        {
            show: true,
            confine: true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: { show: true },
                axis: 'auto',
                animation: 'auto',
                animationDurationUpdate: 200,
                animationEasingUpdate: 'exponentialOut',
                crossStyle: {
                    color: '#999',
                    width: 1,
                    type: 'dashed',
                    textStyle: {},
                },
            },
            z: 60,
            showContent: true,
            triggerOn: 'mousemove|click',
            alwaysShowContent: false,
            displayMode: 'single',
            renderMode: 'auto',
            showDelay: 0,
            hideDelay: 100,
            transitionDuration: 0.4,
            enterable: false,
            backgroundColor: '#fff',
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, .2)',
            shadowOffsetX: 1,
            shadowOffsetY: 2,
            borderRadius: 4,
            borderWidth: 1,
            padding: null,
            extraCssText: '',
            textStyle: { color: '#666', fontSize: 14 },
        },
    ],
    parallelAxis: [],
    parallel: [],
    component: [],
    geo: [],
    radar: [],
    yAxis: [
        {
            type: 'value',
            name: 'Weekly revenue',
            nameTextStyle: { fontWeight: 'bold', align: 'center' },
            nameLocation: 'center',
            nameGap: 65,
            axisLabel: {
                show: true,
                inside: false,
                rotate: 0,
                showMinLabel: null,
                showMaxLabel: null,
                margin: 8,
                fontSize: 12,
            },
            splitLine: {
                show: true,
                lineStyle: { color: ['#E0E6F1'], width: 1, type: 'solid' },
            },
            inverse: false,
            boundaryGap: [0, 0],
            axisLine: {
                show: 'auto',
                onZero: true,
                onZeroAxisIndex: null,
                lineStyle: { color: '#6E7079', width: 1, type: 'solid' },
                symbol: ['none', 'none'],
                symbolSize: [10, 15],
            },
            axisTick: {
                show: 'auto',
                inside: false,
                length: 5,
                lineStyle: { width: 1 },
            },
            splitNumber: 5,
            minorTick: {
                show: false,
                splitNumber: 5,
                length: 3,
                lineStyle: {},
            },
            minorSplitLine: {
                show: false,
                lineStyle: { color: '#F4F7FD', width: 1 },
            },
            show: true,
            z: 0,
            nameRotate: null,
            nameTruncate: { maxWidth: null, ellipsis: '...', placeholder: '.' },
            silent: false,
            triggerEvent: false,
            tooltip: { show: false },
            axisPointer: {},
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
                },
            },
            offset: 0,
        },
        {
            type: 'value',
            nameTextStyle: { fontWeight: 'bold', align: 'center' },
            nameLocation: 'center',
            nameRotate: -90,
            nameGap: 20,
            splitLine: {
                show: true,
                lineStyle: { color: ['#E0E6F1'], width: 1, type: 'solid' },
            },
            boundaryGap: [0, 0],
            axisLine: {
                show: 'auto',
                onZero: true,
                onZeroAxisIndex: null,
                lineStyle: { color: '#6E7079', width: 1, type: 'solid' },
                symbol: ['none', 'none'],
                symbolSize: [10, 15],
            },
            axisTick: {
                show: 'auto',
                inside: false,
                length: 5,
                lineStyle: { width: 1 },
            },
            splitNumber: 5,
            minorTick: {
                show: false,
                splitNumber: 5,
                length: 3,
                lineStyle: {},
            },
            minorSplitLine: {
                show: false,
                lineStyle: { color: '#F4F7FD', width: 1 },
            },
            show: true,
            z: 0,
            inverse: false,
            nameTruncate: { maxWidth: null, ellipsis: '...', placeholder: '.' },
            silent: false,
            triggerEvent: false,
            tooltip: { show: false },
            axisPointer: {},
            axisLabel: {
                show: true,
                inside: false,
                rotate: 0,
                showMinLabel: null,
                showMaxLabel: null,
                margin: 8,
                fontSize: 12,
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
                },
            },
            offset: 0,
        },
    ],
    xAxis: [
        {
            type: 'time',
            name: 'Week',
            nameLocation: 'center',
            nameGap: 30,
            nameTextStyle: { fontWeight: 'bold' },
            splitLine: {
                show: false,
                lineStyle: { color: ['#E0E6F1'], width: 1, type: 'solid' },
            },
            inverse: false,
            splitNumber: 6,
            axisLabel: {
                showMinLabel: false,
                showMaxLabel: false,
                rich: {
                    primary: {
                        fontWeight: 'bold',
                        font: 'bold 12px sans-serif',
                        text: '2022',
                    },
                },
                show: true,
                inside: false,
                rotate: 0,
                margin: 8,
                fontSize: 12,
            },
            boundaryGap: [0, 0],
            axisLine: {
                show: 'auto',
                onZero: true,
                onZeroAxisIndex: null,
                lineStyle: { color: '#6E7079', width: 1, type: 'solid' },
                symbol: ['none', 'none'],
                symbolSize: [10, 15],
            },
            axisTick: {
                show: 'auto',
                inside: false,
                length: 5,
                lineStyle: { width: 1 },
            },
            minorTick: {
                show: false,
                splitNumber: 5,
                length: 3,
                lineStyle: {},
            },
            minorSplitLine: {
                show: false,
                lineStyle: { color: '#F4F7FD', width: 1 },
            },
            show: true,
            z: 0,
            nameRotate: null,
            nameTruncate: { maxWidth: null, ellipsis: '...', placeholder: '.' },
            silent: false,
            triggerEvent: false,
            tooltip: { show: false },
            axisPointer: {
                status: 'hide',
                value: 1650844800000,
                seriesDataIndices: [
                    { seriesIndex: 0, dataIndexInside: 5, dataIndex: 5 },
                ],
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
                },
            },
            offset: 0,
        },
        {
            type: 'value',
            nameLocation: 'center',
            nameGap: 30,
            nameTextStyle: { fontWeight: 'bold' },
            splitLine: {
                show: true,
                lineStyle: { color: ['#E0E6F1'], width: 1, type: 'solid' },
            },
            boundaryGap: [0, 0],
            axisLine: {
                show: 'auto',
                onZero: true,
                onZeroAxisIndex: null,
                lineStyle: { color: '#6E7079', width: 1, type: 'solid' },
                symbol: ['none', 'none'],
                symbolSize: [10, 15],
            },
            axisTick: {
                show: 'auto',
                inside: false,
                length: 5,
                lineStyle: { width: 1 },
            },
            splitNumber: 5,
            minorTick: {
                show: false,
                splitNumber: 5,
                length: 3,
                lineStyle: {},
            },
            minorSplitLine: {
                show: false,
                lineStyle: { color: '#F4F7FD', width: 1 },
            },
            show: true,
            z: 0,
            inverse: false,
            nameRotate: null,
            nameTruncate: { maxWidth: null, ellipsis: '...', placeholder: '.' },
            silent: false,
            triggerEvent: false,
            tooltip: { show: false },
            axisPointer: { status: 'hide', value: 1 },
            axisLabel: {
                show: true,
                inside: false,
                rotate: 0,
                showMinLabel: null,
                showMaxLabel: null,
                margin: 8,
                fontSize: 12,
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'],
                },
            },
            offset: 0,
        },
    ],
    grid: [
        {
            containLabel: true,
            left: '5%',
            right: '5%',
            top: '70',
            bottom: '30',
            show: false,
            z: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            borderColor: '#ccc',
        },
    ],
    series: [
        {
            type: 'bar',
            encode: {
                xRef: { field: 'dbt_orders_order_date_week' },
                yRef: { field: 'dbt_orders_sum_of_basket_total' },
                x: 'dbt_orders_order_date_week',
                y: 'dbt_orders_sum_of_basket_total',
                tooltip: ['dbt_orders_sum_of_basket_total'],
                seriesName: 'dbt_orders_sum_of_basket_total',
            },
            emphasis: { focus: 'series', label: {} },
            connectNulls: true,
            dimensions: [
                {
                    name: 'dbt_orders_order_date_week',
                    displayName: 'Dbt orders Order date week',
                },
                {
                    name: 'dbt_orders_sum_of_basket_total',
                    displayName: 'Dbt orders Sum of basket total',
                },
            ],
            tooltip: {},
            z: 2,
            coordinateSystem: 'cartesian2d',
            legendHoverLink: true,
            barMinHeight: 0,
            barMinAngle: 0,
            large: false,
            largeThreshold: 400,
            progressive: 3000,
            progressiveChunkMode: 'mod',
            clip: true,
            roundCap: false,
            showBackground: false,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)',
                borderColor: null,
                borderWidth: 0,
                borderType: 'solid',
                borderRadius: 0,
                shadowBlur: 0,
                shadowColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
            },
            select: { itemStyle: { borderColor: '#212121' } },
            realtimeSort: false,
            label: {},
        },
    ],
    visualMap: [],
    legend: [
        {
            show: false,
            z: 4,
            orient: 'horizontal',
            left: 'center',
            top: 0,
            align: 'auto',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc',
            borderRadius: 0,
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemWidth: 25,
            itemHeight: 14,
            symbolRotate: 'inherit',
            symbolKeepAspect: true,
            inactiveColor: '#ccc',
            inactiveBorderColor: '#ccc',
            inactiveBorderWidth: 'auto',
            itemStyle: {
                color: 'inherit',
                opacity: 'inherit',
                borderColor: 'inherit',
                borderWidth: 'auto',
                borderCap: 'inherit',
                borderJoin: 'inherit',
                borderDashOffset: 'inherit',
                borderMiterLimit: 'inherit',
            },
            lineStyle: {
                width: 'auto',
                color: 'inherit',
                inactiveColor: '#ccc',
                inactiveWidth: 2,
                opacity: 'inherit',
                type: 'inherit',
                cap: 'inherit',
                join: 'inherit',
                dashOffset: 'inherit',
                miterLimit: 'inherit',
            },
            textStyle: { color: '#333' },
            selectedMode: true,
            selector: false,
            selectorLabel: {
                show: true,
                borderRadius: 10,
                padding: [3, 5, 3, 5],
                fontSize: 12,
                fontFamily: 'sans-serif',
                color: '#666',
                borderWidth: 1,
                borderColor: '#666',
            },
            emphasis: {
                selectorLabel: {
                    show: true,
                    color: '#eee',
                    backgroundColor: '#666',
                },
            },
            selectorPosition: 'auto',
            selectorItemGap: 7,
            selectorButtonGap: 10,
            tooltip: { show: false },
            selected: {},
        },
    ],
    markArea: [],
    markLine: [],
    markPoint: [],
    brush: [],
    dataZoom: [],
};

apiV1Router.get('/screenshot', async (req, res, next) => {
    const content = renderToString(<TestChart2 option={options} notMerge />);
    console.log('content', content);

    const browser = await puppeteer.connect({
        browserWSEndpoint: 'ws://browser:3000',
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 3000, // hardcoded
    });
    await page.setContent(content, {
        timeout: 100000,
        waitUntil: 'networkidle0',
    });
    const imageBuffer = await page.screenshot({ path: 'screenshot.png' });

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length,
    });
    res.end(imageBuffer);

    await browser.close();
});

apiV1Router.get('/livez', async (req, res, next) => {
    res.json({
        status: 'ok',
    });
});

apiV1Router.get('/health', async (req, res, next) => {
    healthService
        .getHealthState(!!req.user?.userUuid)
        .then((state) =>
            res.json({
                status: 'ok',
                results: state,
            }),
        )
        .catch(next);
});

apiV1Router.get('/flash', (req, res) => {
    res.json({
        status: 'ok',
        results: req.flash(),
    });
});

apiV1Router.post('/register', unauthorisedInDemo, async (req, res, next) => {
    try {
        const lightdashUser = await userService.registerNewUserWithOrg({
            firstName: sanitizeStringParam(req.body.firstName),
            lastName: sanitizeStringParam(req.body.lastName),
            email: sanitizeEmailParam(req.body.email),
            password: sanitizeStringParam(req.body.password),
        });
        const sessionUser = await userModel.findSessionUserByUUID(
            lightdashUser.userUuid,
        );
        req.login(sessionUser, (err) => {
            if (err) {
                next(err);
            }
            res.json({
                status: 'ok',
                results: lightdashUser,
            });
        });
    } catch (e) {
        next(e);
    }
});

apiV1Router.post('/login', passport.authenticate('local'), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: 'ok',
                results: UserModel.lightdashUserFromSession(req.user!),
            });
        }
    });
});

apiV1Router.get(
    lightdashConfig.auth.okta.loginPath,
    storeOIDCRedirect,
    passport.authenticate('okta', {
        scope: ['openid', 'profile', 'email'],
    }),
);

apiV1Router.get(
    lightdashConfig.auth.okta.callbackPath,
    passport.authenticate('okta', {
        failureRedirect: '/api/v1/oauth/failure',
        successRedirect: '/api/v1/oauth/success',
        failureFlash: true,
    }),
);

apiV1Router.get(
    lightdashConfig.auth.google.loginPath,
    storeOIDCRedirect,
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);

apiV1Router.get(
    lightdashConfig.auth.google.callbackPath,
    passport.authenticate('google', {
        failureRedirect: '/api/v1/oauth/failure',
        successRedirect: '/api/v1/oauth/success',
        failureFlash: true,
    }),
);
apiV1Router.get('/oauth/failure', redirectOIDCFailure);
apiV1Router.get('/oauth/success', redirectOIDCSuccess);

apiV1Router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: 'ok',
            });
        }
    });
});

apiV1Router.use('/saved', savedChartRouter);
apiV1Router.use('/invite-links', inviteLinksRouter);
apiV1Router.use('/org', organizationRouter);
apiV1Router.use('/user', userRouter);
apiV1Router.use('/projects/:projectUuid', projectRouter);
apiV1Router.use('/dashboards/:dashboardUuid', dashboardRouter);
apiV1Router.use('/password-reset', passwordResetLinksRouter);
apiV1Router.use('/jobs', jobsRouter);
