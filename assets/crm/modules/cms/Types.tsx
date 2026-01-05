
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