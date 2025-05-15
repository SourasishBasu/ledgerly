import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import {  } from "@tabler/icons-react"



export default function Footer() {
    return (
        <footer className="m-1 rounded-3xl border">
            <div className="mx-auto max-w-5xl space-y-4 px-5 py-16">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-8">
                    <Link
                        href="/"
                        aria-label="go home">
                        <Logo />
                    </Link>
                    <div className="flex gap-3">
                        <Link
                            href="https://github.com/sourasishbasu"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-muted-foreground hover:text-primary block">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                        </Link>
                        <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="text-muted-foreground hover:text-primary block">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/sourasish-basu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-muted-foreground hover:text-primary block">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" /></svg>
                        </Link>
                    </div>
                </div>
                <div className="bg-muted flex items-center justify-between rounded-md p-4 px-6 py-3">
                    <span className="text-title">&copy; sourasish basu 2025 - Present</span>
                    <Link
                        href="https://opensource.org/license/mit"
                        className="text-muted-foreground hover:text-primary text-sm">
                        Licence
                    </Link>
                </div>
            </div>
        </footer>
    )
}
