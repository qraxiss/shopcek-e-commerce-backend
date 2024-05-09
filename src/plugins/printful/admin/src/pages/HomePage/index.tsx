/*
 *
 * HomePage
 *
 */

import React from 'react'
import pluginId from '../../pluginId'

import {
    ContentLayout,
    HeaderLayout,
    IconButton,
    Layout,
    Main,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Typography,
    VisuallyHidden
} from '@strapi/design-system'

import getTrad from '../../utils/getTrad'

import { useIntl } from 'react-intl'

import {
    CheckPagePermissions,
    LoadingIndicatorPage,
    onRowClick,
    SettingsPageTitle,
    stopPropagation,
    useAPIErrorHandler,
    useCollator,
    useFetchClient,
    useFocusWhenNavigate,
    useNotification,
    useOverlayBlocker,
    useRBAC,
    useTracking
} from '@strapi/helper-plugin'

const HomePage = () => {
    const { formatMessage, locale } = useIntl()

    return (
        <Layout>
            <Main>
                <HeaderLayout
                    title={formatMessage({
                        id: getTrad('HeaderNav.link.printful'),
                        defaultMessage: 'Printful'
                    })}
                />
                <ContentLayout>
                    <Typography fontWeight="semiBold" textColor="neutral800">
                        Hello world!
                    </Typography>
                </ContentLayout>
            </Main>
        </Layout>
    )
}

export default HomePage
