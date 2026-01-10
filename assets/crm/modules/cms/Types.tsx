
export interface ApiResponse<D = any> {
    data?: D;
    error?: any;
    message?: any;
    meta?: any;
}

export interface CmsPageApi {
    content: string;
    locale: string;
    id: number;
    isActive: boolean;
    slug: string;
    title: string;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
}

export interface CmsWidgetApi {
    id: number;
    name: string;
    title: string;
}

export interface CmsWidgetMetaApi {
    items: {
        types: string[];
    }
}

interface CmsWidgetItemContentTextApi {
    id: number;
    plainText: string;
}

interface CmsWidgetItemContentHtmlApi {
    id: number;
    content: string;
}

interface CmsWidgetItemContentImageApi {
    id: number;
    alt: string;
    path: string;
}

export interface CmsWidgetItemApi {
    id: number;
    position: number;
    type: string;
    content: CmsWidgetItemContentTextApi & CmsWidgetItemContentHtmlApi & CmsWidgetItemContentImageApi
}