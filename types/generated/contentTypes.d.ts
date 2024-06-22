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
        wishlist: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'api::wishlist.wishlist'>
        recipients: Attribute.Relation<'plugin::users-permissions.user', 'oneToMany', 'api::order.recipient'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private
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
        items: Attribute.Relation<'api::cart.cart', 'manyToMany', 'api::cart.item'>
        price: Attribute.Float & Attribute.DefaultTo<0>
        count: Attribute.Integer & Attribute.DefaultTo<0>
        order: Attribute.Relation<'api::cart.cart', 'oneToOne', 'api::order.order'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::cart.cart', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::cart.cart', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiCartItem extends Schema.CollectionType {
    collectionName: 'items'
    info: {
        singularName: 'item'
        pluralName: 'items'
        displayName: 'Cart Item'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        count: Attribute.Integer & Attribute.DefaultTo<1>
        carts: Attribute.Relation<'api::cart.item', 'manyToMany', 'api::cart.cart'>
        totalPrice: Attribute.Decimal & Attribute.DefaultTo<0>
        variant: Attribute.Relation<'api::cart.item', 'manyToOne', 'api::printful.printful-variant'>
        product: Attribute.Relation<'api::cart.item', 'manyToOne', 'api::printful.printful-product'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::cart.item', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::cart.item', 'oneToOne', 'admin::user'> & Attribute.Private
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
        sub_categories: Attribute.Relation<'api::category.category', 'manyToMany', 'api::category.category'>
        parent_categories: Attribute.Relation<'api::category.category', 'manyToMany', 'api::category.category'>
        type: Attribute.String & Attribute.DefaultTo<'category'>
        icon: Attribute.Media
        banner: Attribute.Media
        cover: Attribute.Media
        products: Attribute.Relation<'api::category.category', 'manyToMany', 'api::printful.printful-product'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::category.category', 'oneToOne', 'admin::user'> & Attribute.Private
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
        recipient: Attribute.Relation<'api::order.order', 'manyToOne', 'api::order.recipient'>
        printful_order: Attribute.Relation<'api::order.order', 'oneToOne', 'api::printful.printful-order'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::order.order', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::order.order', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiOrderRecipient extends Schema.CollectionType {
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
        name: Attribute.String
        company: Attribute.String
        address1: Attribute.String
        address2: Attribute.String
        city: Attribute.String
        state_code: Attribute.String
        state_name: Attribute.String
        country_code: Attribute.String
        country_name: Attribute.String
        zip: Attribute.String
        phone: Attribute.String
        email: Attribute.String
        tax_number: Attribute.String
        user: Attribute.Relation<'api::order.recipient', 'manyToOne', 'plugin::users-permissions.user'>
        orders: Attribute.Relation<'api::order.recipient', 'oneToMany', 'api::order.order'>
        title: Attribute.String & Attribute.Required
        isActive: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::order.recipient', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::order.recipient', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiPrintfulPrintfulColor extends Schema.CollectionType {
    collectionName: 'printful_colors'
    info: {
        singularName: 'printful-color'
        pluralName: 'printful-colors'
        displayName: 'Printful Color'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        name: Attribute.String & Attribute.Required
        hex: Attribute.String & Attribute.Required & Attribute.Unique
        variants: Attribute.Relation<'api::printful.printful-color', 'oneToMany', 'api::printful.printful-variant'>
        products: Attribute.Relation<'api::printful.printful-color', 'oneToMany', 'api::printful.printful-product'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::printful.printful-color', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::printful.printful-color', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiPrintfulPrintfulOrder extends Schema.CollectionType {
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
        order: Attribute.Relation<'api::printful.printful-order', 'oneToOne', 'api::order.order'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::printful.printful-order', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::printful.printful-order', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiPrintfulPrintfulProduct extends Schema.CollectionType {
    collectionName: 'printful_products'
    info: {
        singularName: 'printful-product'
        pluralName: 'printful-products'
        displayName: 'Printful Product'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        name: Attribute.String
        description: Attribute.Text
        image: Attribute.String
        price: Attribute.Float
        printful_id: Attribute.BigInteger
        slug: Attribute.String & Attribute.Unique
        video: Attribute.Media
        product_id: Attribute.Integer
        variants: Attribute.Relation<'api::printful.printful-product', 'oneToMany', 'api::printful.printful-variant'>
        sizes: Attribute.Relation<'api::printful.printful-product', 'manyToOne', 'api::printful.printful-size'>
        colors: Attribute.Relation<'api::printful.printful-product', 'manyToOne', 'api::printful.printful-color'>
        items: Attribute.Relation<'api::printful.printful-product', 'oneToMany', 'api::cart.item'>
        wishlists: Attribute.Relation<'api::printful.printful-product', 'manyToMany', 'api::wishlist.wishlist'>
        categories: Attribute.Relation<'api::printful.printful-product', 'manyToMany', 'api::category.category'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::printful.printful-product', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::printful.printful-product', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiPrintfulPrintfulSize extends Schema.CollectionType {
    collectionName: 'printful_sizes'
    info: {
        singularName: 'printful-size'
        pluralName: 'printful-sizes'
        displayName: 'Printful Size'
    }
    options: {
        draftAndPublish: false
        comment: ''
    }
    attributes: {
        value: Attribute.String & Attribute.Required & Attribute.Unique
        variants: Attribute.Relation<'api::printful.printful-size', 'oneToMany', 'api::printful.printful-variant'>
        products: Attribute.Relation<'api::printful.printful-size', 'oneToMany', 'api::printful.printful-product'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::printful.printful-size', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::printful.printful-size', 'oneToOne', 'admin::user'> & Attribute.Private
    }
}

export interface ApiPrintfulPrintfulVariant extends Schema.CollectionType {
    collectionName: 'printful_variants'
    info: {
        singularName: 'printful-variant'
        pluralName: 'printful-variants'
        displayName: 'Printful Variant'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        image: Attribute.String
        price: Attribute.Float
        printful_id: Attribute.BigInteger
        variant_id: Attribute.Integer
        size: Attribute.Relation<'api::printful.printful-variant', 'manyToOne', 'api::printful.printful-size'>
        color: Attribute.Relation<'api::printful.printful-variant', 'manyToOne', 'api::printful.printful-color'>
        product: Attribute.Relation<'api::printful.printful-variant', 'manyToOne', 'api::printful.printful-product'>
        status: Attribute.JSON
        items: Attribute.Relation<'api::printful.printful-variant', 'oneToMany', 'api::cart.item'>
        createdAt: Attribute.DateTime
        updatedAt: Attribute.DateTime
        createdBy: Attribute.Relation<'api::printful.printful-variant', 'oneToOne', 'admin::user'> & Attribute.Private
        updatedBy: Attribute.Relation<'api::printful.printful-variant', 'oneToOne', 'admin::user'> & Attribute.Private
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

export interface ApiWishlistWishlist extends Schema.CollectionType {
    collectionName: 'wishlists'
    info: {
        singularName: 'wishlist'
        pluralName: 'wishlists'
        displayName: 'Wishlist'
        description: ''
    }
    options: {
        draftAndPublish: false
    }
    attributes: {
        user: Attribute.Relation<'api::wishlist.wishlist', 'oneToOne', 'plugin::users-permissions.user'>
        items: Attribute.Relation<'api::wishlist.wishlist', 'manyToMany', 'api::printful.printful-product'>
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
            'api::cart.cart': ApiCartCart
            'api::cart.item': ApiCartItem
            'api::category.category': ApiCategoryCategory
            'api::order.order': ApiOrderOrder
            'api::order.recipient': ApiOrderRecipient
            'api::printful.printful-color': ApiPrintfulPrintfulColor
            'api::printful.printful-order': ApiPrintfulPrintfulOrder
            'api::printful.printful-product': ApiPrintfulPrintfulProduct
            'api::printful.printful-size': ApiPrintfulPrintfulSize
            'api::printful.printful-variant': ApiPrintfulPrintfulVariant
            'api::wallet.wallet': ApiWalletWallet
            'api::wishlist.wishlist': ApiWishlistWishlist
        }
    }
}
