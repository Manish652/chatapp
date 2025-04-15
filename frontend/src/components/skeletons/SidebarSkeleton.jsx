import React from 'react'

function SidebarSkeleton() {
  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header Skeleton */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-base-300 animate-pulse" />
            <div className="hidden lg:block w-16 h-5 rounded-lg bg-base-300 animate-pulse" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-base-300 animate-pulse" />
        </div>

        {/* Search and Filter Skeleton */}
        <div className="space-y-2">
          <div className="w-full h-10 rounded-lg bg-base-300 animate-pulse" />
          <div className="w-24 h-8 rounded-lg bg-base-300 animate-pulse" />
        </div>
      </div>

      {/* User List Skeleton */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex items-center gap-3 p-2">
            {/* Avatar Skeleton */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse" />
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-base-300 animate-pulse" />
            </div>

            {/* User Info Skeleton */}
            <div className="hidden lg:block flex-1 space-y-1">
              <div className="w-24 h-4 rounded-lg bg-base-300 animate-pulse" />
              <div className="w-16 h-3 rounded-lg bg-base-300 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SidebarSkeleton