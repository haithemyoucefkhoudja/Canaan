// tests/hooks/useUsers.test.tsx
import { renderHook, waitFor } from '@testing-library/react'
import { useUserProfile } from '@/hooks/useUsers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as db from '@/lib/db/users'

// Mock the database function
jest.mock('@/lib/db/users')

const mockGetUserProfile = db.getUserProfile as jest.Mock

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useUserProfile', () => {
  it('should return user data on success', async () => {
    const mockUser = { id: '1', display_name: 'Test User', email: 'test@example.com', xp: 100 }
    mockGetUserProfile.mockResolvedValue(mockUser)

    const { result } = renderHook(() => useUserProfile('1'), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockUser)
  })
})