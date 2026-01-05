
import { z } from 'zod';
import { useState, useEffect } from 'react';

interface ApiResponse<T = any> {
    data?: T | null;
    error?: string | null;
    message?: string;
    meta?: unknown;
    [key: string]: unknown;
}

const ApiResponseBaseSchema = z.object({
    data: z.any().optional().nullable(),
    error: z.string().nullable().optional().nullable(),
    message: z.string().optional().nullable(),
    meta: z.any().optional().nullable(),
});

async function fetchJson<T>(
    input: RequestInfo,
    init?: RequestInit,
    dataSchema?: z.ZodType<T>
): Promise<ApiResponse<T>> {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    const baseParse = ApiResponseBaseSchema.safeParse(json);
    if (!baseParse.success) throw new Error('Invalid API response shape');

    if (dataSchema && json.data != null) {
        const dataParse = dataSchema.safeParse(json.data);
        if (!dataParse.success) throw new Error('Invalid API data shape');
        return { ...json, data: dataParse.data } as ApiResponse<T>;
    }

    return json as ApiResponse<T>;
}

export const useApiService = <T = any>(url?: string, options?: RequestInit) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(!!url);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (url: string, options?: RequestInit): Promise<ApiResponse<T>> => {
        setLoading(true);

        if (!options) {
            options = {};
        }

        options.headers = {
            ...(options.headers ?? {}), ...{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        try {
            const result = await fetchJson<T>(`/crm/api${url}`, options);
            setData(result.data ?? null);
            setError(result.error ?? null);
            return result;
        } catch (err: any) {
            setError(err?.message ?? String(err));
            return { data: null, error: err?.message ?? String(err) } as ApiResponse<T>;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (url) {
            fetchData(url, options);
        }
    }, [url]);

    return { data, loading, error, refetch: fetchData };
};