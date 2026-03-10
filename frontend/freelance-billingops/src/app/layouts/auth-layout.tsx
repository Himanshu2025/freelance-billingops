import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#0b0f17]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

