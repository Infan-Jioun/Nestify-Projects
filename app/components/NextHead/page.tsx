"use client"
import usePageTitle from '@/app/hook/usePageTitle'
import Head from 'next/head'
import React from 'react'

interface Props {
    title: string,

}
export default function NextHead({ title }: Props) {
    usePageTitle(title)

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
        </div>
    )
}
