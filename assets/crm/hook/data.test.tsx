import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { server } from '../../../tests/setupTests'
import { useApiService } from './data'

import { http, HttpResponse } from 'msw'


function TestComponent<T>({ url }: { url: string }) {
    const { data, loading, error } = useApiService<T[]>(url)
    if (loading) return <div>loading</div>
    if (error) return <div role="alert">error: {String(error)}</div>
    if (!data) return <div>no-data</div>
    return (
        <div>
            {data.map((u: T, i:number) => (
                <div key={i}>{JSON.stringify(u)}</div>
            ))}
        </div>
    )
}

test('fetch error', async () => {

    server.use(
        http.get('/crm/api/test', () => {
            return HttpResponse.error()
        }
        )
    )

    render(<TestComponent<any> url="/test" />)
    expect(screen.getByText('loading')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
})

test('fetches and renders data', async () => {
    server.use(
        http.get('/crm/api/users', () => {
            return HttpResponse.json({ data: [{ id: 1, name: 'Alice' }] })
        }
        )
    )

    render(<TestComponent<{ id: number; name: string }> url="/users" />)
    expect(screen.getByText('loading')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText(/Alice/)).toBeInTheDocument())
})

test('handles server error', async () => {
    server.use(
        http.get('/crm/api/users', () => {
            return new HttpResponse('', {
                status: 500,
            })
        }
        )
    )

    render(<TestComponent url="/users" />)
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/Internal|HTTP 500/i))
})