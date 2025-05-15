import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings2, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section className="py-16 md:py-32">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Built to give you control</h2>
                    <p className="mt-4">Take charge of your finances with powerful features, full privacy, and smart insights—right at your fingertips</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 [--color-background:transparent] [--color-card:transparent] *:text-center md:mt-16">
                    <Card className="group border-0 shadow-none bg-transparent">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Zap
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Stats</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Get clear, actionable insights from your expenses to better manage your spending</p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 shadow-none bg-transparent">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Settings2
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Your data, Your rules</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm">Host on your own server and keep full control of your financial data.</p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 shadow-none bg-transparent">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Sparkles
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Powered By Gemini</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm">Use the built-in AI to automatically track expenses from receipts</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div
            aria-hidden
            className="bg-radial to-background absolute inset-0 from-transparent to-75%"
        />
        <div className="dark:bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t bg-white">{children}</div>
    </div>
)