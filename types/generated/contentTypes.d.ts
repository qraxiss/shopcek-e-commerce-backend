import type { Schema, Attribute } from '@strapi/strapi'

export interface AdminPermission extends Schema.CollectionType {
    collectionName: 'admin_permissions'
    info: {
        name: 'Permission'
        description: ''
        singularName: 'permission'
        pluralName: 'permissions'
        displayName: 'Permission'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>
        subject: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        properties: Attribute.JSON & Attribute.DefaultTo<{}>
        conditions: Attribute.JSON & Attribute.DefaultTo<[]>
        role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminUser extends Schema.CollectionType {
    collectionName: 'admin_users'
    info: {
        name: 'User'
        description: ''
        singularName: 'user'
        pluralName: 'users'
        displayName: 'User'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        firstname: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        lastname: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        username: Attribute.String
        email: Attribute.Email &
            Attribute.Required &
            Attribute.Private &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 6
            }>
        password: Attribute.Password &
            Attribute.Private &
            Attribute.SetMinMaxLength<{
                minLength: 6
            }>
        resetPasswordToken: Attribute.String & Attribute.Private
        registrationToken: Attribute.String & Attribute.Private
        isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
        roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> & Attribute.Private
        blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
        preferedLanguage: Attribute.String
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminRole extends Schema.CollectionType {
    collectionName: 'admin_roles'
    info: {
        name: 'Role'
        description: ''
        singularName: 'role'
        pluralName: 'roles'
        displayName: 'Role'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        code: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        description: Attribute.String
        users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>
        permissions: Attribute.Relation<'admin::role', 'oneToMany', 'admin::permission'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminApiToken extends Schema.CollectionType {
    collectionName: 'strapi_api_tokens'
    info: {
        name: 'Api Token'
        singularName: 'api-token'
        pluralName: 'api-tokens'
        displayName: 'Api Token'
        description: ''
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        description: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }> &
            Attribute.DefaultTo<''>
        type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> & Attribute.Required & Attribute.DefaultTo<'read-only'>
        accessKey: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        lastUsedAt: Attribute.DateTime
        permissions: Attribute.Relation<'admin::api-token', 'oneToMany', 'admin::api-token-permission'>
        expiresAt: Attribute.DateTime
        lifespan: Attribute.BigInteger
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
    collectionName: 'strapi_api_token_permissions'
    info: {
        name: 'API Token Permission'
        description: ''
        singularName: 'api-token-permission'
        pluralName: 'api-token-permissions'
        displayName: 'API Token Permission'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        token: Attribute.Relation<'admin::api-token-permission', 'manyToOne', 'admin::api-token'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminTransferToken extends Schema.CollectionType {
    collectionName: 'strapi_transfer_tokens'
    info: {
        name: 'Transfer Token'
        singularName: 'transfer-token'
        pluralName: 'transfer-tokens'
        displayName: 'Transfer Token'
        description: ''
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        description: Attribute.String &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }> &
            Attribute.DefaultTo<''>
        accessKey: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        lastUsedAt: Attribute.DateTime
        permissions: Attribute.Relation<'admin::transfer-token', 'oneToMany', 'admin::transfer-token-permission'>
        expiresAt: Attribute.DateTime
        lifespan: Attribute.BigInteger
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
    collectionName: 'strapi_transfer_token_permissions'
    info: {
        name: 'Transfer Token Permission'
        description: ''
        singularName: 'transfer-token-permission'
        pluralName: 'transfer-token-permissions'
        displayName: 'Transfer Token Permission'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        action: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 1
            }>
        token: Attribute.Relation<'admin::transfer-token-permission', 'manyToOne', 'admin::transfer-token'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginUploadFile extends Schema.CollectionType {
    collectionName: 'files'
    info: {
        singularName: 'file'
        pluralName: 'files'
        displayName: 'File'
        description: ''
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String & Attribute.Required
        alternativeText: Attribute.String
        caption: Attribute.String
        width: Attribute.Integer
        height: Attribute.Integer
        formats: Attribute.JSON
        hash: Attribute.String & Attribute.Required
        ext: Attribute.String
        mime: Attribute.String & Attribute.Required
        size: Attribute.Decimal & Attribute.Required
        url: Attribute.String & Attribute.Required
        previewUrl: Attribute.String
        provider: Attribute.String & Attribute.Required
        provider_metadata: Attribute.JSON
        related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>
        folder: Attribute.Relation<'plugin::upload.file', 'manyToOne', 'plugin::upload.folder'> & Attribute.Private
        folderPath: Attribute.String &
            Attribute.Required &
            Attribute.Private &
            Attribute.SetMinMax<
                {
                    min: 1
                },
                number
            >
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginUploadFolder extends Schema.CollectionType {
    collectionName: 'upload_folders'
    info: {
        singularName: 'folder'
        pluralName: 'folders'
        displayName: 'Folder'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMax<
                {
                    min: 1
                },
                number
            >
        pathId: Attribute.Integer & Attribute.Required & Attribute.Unique
        parent: Attribute.Relation<'plugin::upload.folder', 'manyToOne', 'plugin::upload.folder'>
        children: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.folder'>
        files: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>
        path: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMax<
                {
                    min: 1
                },
                number
            >
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
    collectionName: 'strapi_releases'
    info: {
        singularName: 'release'
        pluralName: 'releases'
        displayName: 'Release'
    }
    options: {
        draftAndPublish: false
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String & Attribute.Required
        releasedAt: Attribute.DateTime
        scheduledAt: Attribute.DateTime
        timezone: Attribute.String
        status: Attribute.Enumeration<['ready', 'blocked', 'failed', 'done', 'empty']> & Attribute.Required
        actions: Attribute.Relation<'plugin::content-releases.release', 'oneToMany', 'plugin::content-releases.release-action'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginContentReleasesReleaseAction extends Schema.CollectionType {
    collectionName: 'strapi_release_actions'
    info: {
        singularName: 'release-action'
        pluralName: 'release-actions'
        displayName: 'Release Action'
    }
    options: {
        draftAndPublish: false
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required
        entry: Attribute.Relation<'plugin::content-releases.release-action', 'morphToOne'>
        contentType: Attribute.String & Attribute.Required
        locale: Attribute.String
        release: Attribute.Relation<'plugin::content-releases.release-action', 'manyToOne', 'plugin::content-releases.release'>
        isEntryValid: Attribute.Boolean
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginI18NLocale extends Schema.CollectionType {
    collectionName: 'i18n_locale'
    info: {
        singularName: 'locale'
        pluralName: 'locales'
        collectionName: 'locales'
        displayName: 'Locale'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.SetMinMax<
                {
                    min: 1
                    max: 50
                },
                number
            >
        code: Attribute.String & Attribute.Unique
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
    collectionName: 'up_permissions'
    info: {
        name: 'permission'
        description: ''
        singularName: 'permission'
        pluralName: 'permissions'
        displayName: 'Permission'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        action: Attribute.String & Attribute.Required
        role: Attribute.Relation<'plugin::users-permissions.permission', 'manyToOne', 'plugin::users-permissions.role'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
    collectionName: 'up_roles'
    info: {
        name: 'role'
        description: ''
        singularName: 'role'
        pluralName: 'roles'
        displayName: 'Role'
    }
    pluginOptions: {
        'content-manager': {
            visible: false
        }
        'content-type-builder': {
            visible: false
        }
    }
    attributes: {
        name: Attribute.String &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 3
            }>
        description: Attribute.String
        type: Attribute.String & Attribute.Unique
        permissions: Attribute.Relation<'plugin::users-permissions.role', 'oneToMany', 'plugin::users-permissions.permission'>
        users: Attribute.Relation<'plugin::users-permissions.role', 'oneToMany', 'plugin::users-permissions.user'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
    collectionName: 'up_users'
    info: {
        name: 'user'
        description: ''
        singularName: 'user'
        pluralName: 'users'
        displayName: 'User'
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        username: Attribute.String &
            Attribute.Required &
            Attribute.Unique &
            Attribute.SetMinMaxLength<{
                minLength: 3
            }>
        email: Attribute.Email &
            Attribute.Required &
            Attribute.SetMinMaxLength<{
                minLength: 6
            }>
        provider: Attribute.String
        password: Attribute.Password &
            Attribute.Private &
            Attribute.SetMinMaxLength<{
                minLength: 6
            }>
        resetPasswordToken: Attribute.String & Attribute.Private
        confirmationToken: Attribute.String & Attribute.Private
        confirmed: Attribute.Boolean & Attribute.DefaultTo<false>
        blocked: Attribute.Boolean & Attribute.DefaultTo<false>
        role: Attribute.Relation<'plugin::users-permissions.user', 'manyToOne', 'plugin::users-permissions.role'>
        cart: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'api::cart.cart'>
        orders: Attribute.Relation<'plugin::users-permissions.user', 'oneToMany', 'api::order.order'>
        wallet: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'api::wallet.wallet'>
        recipient: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'api::recipient.recipient'>
        earn: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'api::earn.earn'>
        domains: Attribute.Relation<'plugin::users-permissions.user', 'oneToMany', 'api::domain.domain'>
        choosen: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'api::domain.domain'>
        wishlist: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'api::wishlist.wishlist'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiApplyApply extends Schema.CollectionType {
    collectionName: 'applies'
    info: {
        singularName: 'apply'
        pluralName: 'applies'
        displayName: 'apply'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        telegramHandle: Attribute.String
        email: Attribute.Email
        name: Attribute.String
        partnerName: Attribute.String
        type: Attribute.String
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::apply.apply', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::apply.apply', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiCartCart extends Schema.CollectionType {
    collectionName: 'carts'
    info: {
        singularName: 'cart'
        pluralName: 'carts'
        displayName: 'Cart'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        user: Attribute.Relation<'api::cart.cart', 'oneToOne', 'plugin::users-permissions.user'>
        items: Attribute.Relation<'api::cart.cart', 'manyToMany', 'api::item.item'>
        price: Attribute.Float & Attribute.DefaultTo<0>
        count: Attribute.Integer & Attribute.DefaultTo<0>
        order: Attribute.Relation<'api::cart.cart', 'oneToOne', 'api::order.order'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::cart.cart', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::cart.cart', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiCategoryCategory extends Schema.CollectionType {
    collectionName: 'categories'
    info: {
        singularName: 'category'
        pluralName: 'categories'
        displayName: 'Category'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        slug: Attribute.String & Attribute.Unique
        name: Attribute.String
        products: Attribute.Relation<'api::category.category', 'manyToMany', 'api::product.product'>
        sub_categories: Attribute.Relation<'api::category.category', 'manyToMany', 'api::category.category'>
        parent_categories: Attribute.Relation<'api::category.category', 'manyToMany', 'api::category.category'>
        type: Attribute.String & Attribute.DefaultTo<'category'>
        icon: Attribute.Media
        banner: Attribute.Media
        cover: Attribute.Media
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiColorColor extends Schema.CollectionType {
    collectionName: 'colors'
    info: {
        singularName: 'color'
        pluralName: 'colors'
        displayName: 'Color'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        value: Attribute.String & Attribute.Required & Attribute.Unique
        products: Attribute.Relation<'api::color.color', 'manyToMany', 'api::product.product'>
        variants: Attribute.Relation<'api::color.color', 'oneToMany', 'api::variant.variant'>
        hex: Attribute.String
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::color.color', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::color.color', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiDomainDomain extends Schema.CollectionType {
    collectionName: 'domains'
    info: {
        singularName: 'domain'
        pluralName: 'domains'
        displayName: 'Domain'
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        username: Attribute.String & Attribute.Unique
        user: Attribute.Relation<'api::domain.domain', 'manyToOne', 'plugin::users-permissions.user'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::domain.domain', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::domain.domain', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiEarnEarn extends Schema.CollectionType {
    collectionName: 'earns'
    info: {
        singularName: 'earn'
        pluralName: 'earns'
        displayName: 'earn'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        spins: Attribute.Relation<'api::earn.earn', 'oneToMany', 'api::earn-spin.earn-spin'>
        logins: Attribute.Relation<'api::earn.earn', 'oneToMany', 'api::earn-login.earn-login'>
        stays: Attribute.Relation<'api::earn.earn', 'oneToMany', 'api::earn-stay.earn-stay'>
        sessionStart: Attribute.DateTime
        user: Attribute.Relation<'api::earn.earn', 'oneToOne', 'plugin::users-permissions.user'>
        xp: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::earn.earn', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::earn.earn', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiEarnLoginEarnLogin extends Schema.CollectionType {
    collectionName: 'earn_logins'
    info: {
        singularName: 'earn-login'
        pluralName: 'earn-logins'
        displayName: 'earn-login'
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        earn: Attribute.Relation<'api::earn-login.earn-login', 'manyToOne', 'api::earn.earn'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::earn-login.earn-login', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::earn-login.earn-login', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiEarnSpinEarnSpin extends Schema.CollectionType {
    collectionName: 'earn_spins'
    info: {
        singularName: 'earn-spin'
        pluralName: 'earn-spins'
        displayName: 'earn-spin'
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        earn: Attribute.Relation<'api::earn-spin.earn-spin', 'manyToOne', 'api::earn.earn'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::earn-spin.earn-spin', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::earn-spin.earn-spin', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiEarnStayEarnStay extends Schema.CollectionType {
    collectionName: 'earn_stays'
    info: {
        singularName: 'earn-stay'
        pluralName: 'earn-stays'
        displayName: 'Earn-stay'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        earn: Attribute.Relation<'api::earn-stay.earn-stay', 'manyToOne', 'api::earn.earn'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::earn-stay.earn-stay', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::earn-stay.earn-stay', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiItemItem extends Schema.CollectionType {
    collectionName: 'items'
    info: {
        singularName: 'item'
        pluralName: 'items'
        displayName: 'Item'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        variant: Attribute.Relation<'api::item.item', 'manyToOne', 'api::variant.variant'>
        count: Attribute.Integer & Attribute.DefaultTo<1>
        product: Attribute.Relation<'api::item.item', 'manyToOne', 'api::product.product'>
        carts: Attribute.Relation<'api::item.item', 'manyToMany', 'api::cart.cart'>
        totalPrice: Attribute.Decimal & Attribute.DefaultTo<0>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::item.item', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::item.item', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiLoginRewardLoginReward extends Schema.SingleType {
    collectionName: 'login_rewards'
    info: {
        singularName: 'login-reward'
        pluralName: 'login-rewards'
        displayName: 'Login Reward'
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        rewards: Attribute.Relation<'api::login-reward.login-reward', 'oneToMany', 'api::reward.reward'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::login-reward.login-reward', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::login-reward.login-reward', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiOrderOrder extends Schema.CollectionType {
    collectionName: 'orders'
    info: {
        singularName: 'order'
        pluralName: 'orders'
        displayName: 'Order'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        user: Attribute.Relation<'api::order.order', 'manyToOne', 'plugin::users-permissions.user'>
        transaction: Attribute.String & Attribute.Unique
        cart: Attribute.Relation<'api::order.order', 'oneToOne', 'api::cart.cart'>
        recipient: Attribute.Relation<'api::order.order', 'manyToOne', 'api::recipient.recipient'>
        printful_order: Attribute.Relation<'api::order.order', 'oneToOne', 'api::printful-order.printful-order'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::order.order', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::order.order', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiPrintfulOrderPrintfulOrder extends Schema.CollectionType {
    collectionName: 'printful_orders'
    info: {
        singularName: 'printful-order'
        pluralName: 'printful-orders'
        displayName: 'Printful Order'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        error: Attribute.String
        shipping: Attribute.String
        shipping_service_name: Attribute.String
        status: Attribute.String
        costs: Attribute.JSON
        pricing_breakdown: Attribute.JSON
        retail_costs: Attribute.JSON
        order: Attribute.Relation<'api::printful-order.printful-order', 'oneToOne', 'api::order.order'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::printful-order.printful-order', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::printful-order.printful-order', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiProductProduct extends Schema.CollectionType {
    collectionName: 'products'
    info: {
        singularName: 'product'
        pluralName: 'products'
        displayName: 'Product'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        name: Attribute.String
        variants: Attribute.Relation<'api::product.product', 'oneToMany', 'api::variant.variant'>
        description: Attribute.Text
        sizes: Attribute.Relation<'api::product.product', 'manyToMany', 'api::size.size'>
        colors: Attribute.Relation<'api::product.product', 'manyToMany', 'api::color.color'>
        image: Attribute.String
        price: Attribute.Float
        items: Attribute.Relation<'api::product.product', 'oneToMany', 'api::item.item'>
        printful_id: Attribute.BigInteger
        slug: Attribute.String & Attribute.Required & Attribute.Unique
        wishlists: Attribute.Relation<'api::product.product', 'manyToMany', 'api::wishlist.wishlist'>
        categories: Attribute.Relation<'api::product.product', 'manyToMany', 'api::category.category'>
        video: Attribute.Media
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiRecipientRecipient extends Schema.CollectionType {
    collectionName: 'recipients'
    info: {
        singularName: 'recipient'
        pluralName: 'recipients'
        displayName: 'Recipient'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        name: Attribute.String & Attribute.DefaultTo<'Shopcek'>
        company: Attribute.String & Attribute.DefaultTo<'Shopcek'>
        address1: Attribute.String & Attribute.DefaultTo<'Amsterdam Van Gogh Museum'>
        address2: Attribute.String
        city: Attribute.String & Attribute.DefaultTo<'Chatsworth'>
        state_code: Attribute.String & Attribute.DefaultTo<'CA'>
        state_name: Attribute.String & Attribute.DefaultTo<'California'>
        country_code: Attribute.String & Attribute.DefaultTo<'US'>
        country_name: Attribute.String & Attribute.DefaultTo<'United States'>
        zip: Attribute.String & Attribute.DefaultTo<'91311'>
        phone: Attribute.String & Attribute.DefaultTo<'+905420269538'>
        email: Attribute.String & Attribute.DefaultTo<'qraxiss@gmail.com'>
        tax_number: Attribute.String & Attribute.DefaultTo<'123.456.789-10'>
        user: Attribute.Relation<'api::recipient.recipient', 'oneToOne', 'plugin::users-permissions.user'>
        orders: Attribute.Relation<'api::recipient.recipient', 'oneToMany', 'api::order.order'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::recipient.recipient', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::recipient.recipient', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiRewardReward extends Schema.CollectionType {
    collectionName: 'rewards'
    info: {
        singularName: 'reward'
        pluralName: 'rewards'
        displayName: 'Reward'
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        name: Attribute.String
        reward: Attribute.JSON
        type: Attribute.String
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::reward.reward', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::reward.reward', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiSizeSize extends Schema.CollectionType {
    collectionName: 'sizes'
    info: {
        singularName: 'size'
        pluralName: 'sizes'
        displayName: 'Size'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        value: Attribute.String & Attribute.Required & Attribute.Unique
        products: Attribute.Relation<'api::size.size', 'manyToMany', 'api::product.product'>
        variants: Attribute.Relation<'api::size.size', 'oneToMany', 'api::variant.variant'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::size.size', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::size.size', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiVariantVariant extends Schema.CollectionType {
    collectionName: 'variants'
    info: {
        singularName: 'variant'
        pluralName: 'variants'
        displayName: 'Variant'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        product: Attribute.Relation<'api::variant.variant', 'manyToOne', 'api::product.product'>
        size: Attribute.Relation<'api::variant.variant', 'manyToOne', 'api::size.size'>
        color: Attribute.Relation<'api::variant.variant', 'manyToOne', 'api::color.color'>
        items: Attribute.Relation<'api::variant.variant', 'oneToMany', 'api::item.item'>
        image: Attribute.String
        price: Attribute.Float
        printful_id: Attribute.BigInteger
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::variant.variant', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::variant.variant', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiWalletWallet extends Schema.CollectionType {
    collectionName: 'wallets'
    info: {
        singularName: 'wallet'
        pluralName: 'wallets'
        displayName: 'Wallet'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        address: Attribute.String & Attribute.Required & Attribute.Unique
        user: Attribute.Relation<'api::wallet.wallet', 'oneToOne', 'plugin::users-permissions.user'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::wallet.wallet', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::wallet.wallet', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiWheelRewardWheelReward extends Schema.SingleType {
    collectionName: 'wheel_rewards'
    info: {
        singularName: 'wheel-reward'
        pluralName: 'wheel-rewards'
        displayName: 'Wheel Reward'
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        rewards: Attribute.Relation<'api::wheel-reward.wheel-reward', 'oneToMany', 'api::reward.reward'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::wheel-reward.wheel-reward', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::wheel-reward.wheel-reward', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiWishlistWishlist extends Schema.CollectionType {
    collectionName: 'wishlists'
    info: {
        singularName: 'wishlist'
        pluralName: 'wishlists'
        displayName: 'Wishlist'
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        user: Attribute.Relation<'api::wishlist.wishlist', 'oneToOne', 'plugin::users-permissions.user'>
        items: Attribute.Relation<'api::wishlist.wishlist', 'manyToMany', 'api::product.product'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::wishlist.wishlist', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::wishlist.wishlist', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

declare module '@strapi/types' {
    export module Shared {
        export interface ContentTypes {
            'admin::permission': AdminPermission
            'admin::user': AdminUser
            'admin::role': AdminRole
            'admin::api-token': AdminApiToken
            'admin::api-token-permission': AdminApiTokenPermission
            'admin::transfer-token': AdminTransferToken
            'admin::transfer-token-permission': AdminTransferTokenPermission
            'plugin::upload.file': PluginUploadFile
            'plugin::upload.folder': PluginUploadFolder
            'plugin::content-releases.release': PluginContentReleasesRelease
            'plugin::content-releases.release-action': PluginContentReleasesReleaseAction
            'plugin::i18n.locale': PluginI18NLocale
            'plugin::users-permissions.permission': PluginUsersPermissionsPermission
            'plugin::users-permissions.role': PluginUsersPermissionsRole
            'plugin::users-permissions.user': PluginUsersPermissionsUser
            'api::apply.apply': ApiApplyApply
            'api::cart.cart': ApiCartCart
            'api::category.category': ApiCategoryCategory
            'api::color.color': ApiColorColor
            'api::domain.domain': ApiDomainDomain
            'api::earn.earn': ApiEarnEarn
            'api::earn-login.earn-login': ApiEarnLoginEarnLogin
            'api::earn-spin.earn-spin': ApiEarnSpinEarnSpin
            'api::earn-stay.earn-stay': ApiEarnStayEarnStay
            'api::item.item': ApiItemItem
            'api::login-reward.login-reward': ApiLoginRewardLoginReward
            'api::order.order': ApiOrderOrder
            'api::printful-order.printful-order': ApiPrintfulOrderPrintfulOrder
            'api::product.product': ApiProductProduct
            'api::recipient.recipient': ApiRecipientRecipient
            'api::reward.reward': ApiRewardReward
            'api::size.size': ApiSizeSize
            'api::variant.variant': ApiVariantVariant
            'api::wallet.wallet': ApiWalletWallet
            'api::wheel-reward.wheel-reward': ApiWheelRewardWheelReward
            'api::wishlist.wishlist': ApiWishlistWishlist
        }
    }
}
