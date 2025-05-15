import { cn } from '../lib/utils'

export const Logo = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <svg
            viewBox="0 0 93 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('text-foreground h-5 w-auto', className)}>
            {/* Rounded orange square with brown L */}
            <rect x="0" y="0" width="18" height="18" rx="4" fill="#FF8C00" />
            <path
                d="M5 3.5H8V14.5H14V11.5V14.5H5V3.5Z"
                fill="#8B4513"
                stroke="#8B4513"
                strokeWidth="1"
            />
            
            {/* Ledgerly text */}
            <text x="24" y="14" fill="currentColor" fontSize="17" fontWeight="500" fontFamily="Inter, sans-serif">Ledgerly</text>
        </svg>
    )
}

export const LogoIcon = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('size-5', className)}>
            {/* Rounded orange square with brown L */}
            <rect x="0" y="0" width="18" height="18" rx="4" fill="#FF8C00" />
            <path
                d="M5 3.5H8V14.5H14V11.5V14.5H5V3.5Z"
                fill="#8B4513"
                stroke="#8B4513"
                strokeWidth="1"
            />
        </svg>
    )
}

export const LogoStroke = ({ className }: { className?: string }) => {
    return (
        <svg
            className={cn('size-7 w-7', className)}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {/* Rounded square outline with L */}
            <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path
                d="M5 3.5H8V14.5H14V11.5V14.5H5V3.5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
            />
        </svg>
    )
}
