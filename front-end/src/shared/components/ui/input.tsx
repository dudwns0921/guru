import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full rounded-md border px-3 py-1 text-base outline-none text-sub dark:text-sub bg-transparent',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
