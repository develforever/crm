// assets/crm/hook/data.test.tsx
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { server } from '../../../tests/setupTests'
import { useApiService } from './data'

import { http, HttpResponse } from 'msw'


function TestComponent({ url }: { url: string }) {
    const { data, loading, error } = useApiService<any[]>(url)
    if (loading) return <div>loading</div>
    if (error) return <div role="alert">error: {String(error)}</div>
    if (!data) return <div>no-data</div>
    return (
        <div>
            {data.map((u: any) => (
                <div key={u.id}>{u.name}</div>
            ))}
        </div>
    )
}

test('fetches and renders data', async () => {
    server.use(
        http.get('/crm/api/users', () => {
            return HttpResponse.json({ data: [{ id: 1, name: 'Alice' }] })
        }
        )
    )

    render(<TestComponent url="/users" />)
    expect(screen.getByText('loading')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Alice')).toBeInTheDocument())
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