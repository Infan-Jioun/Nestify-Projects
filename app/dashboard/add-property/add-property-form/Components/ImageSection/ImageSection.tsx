import React from 'react'
import { FieldErrors, UseFormUnregister } from 'react-hook-form'
import { Inputs } from '../Inputs'
type ImageSectionProps = {
    register: UseFormUnregister<Inputs>
    errors: FieldErrors<Inputs>
}
export default function ImageSection() {
    return (
        <div>ImageSection</div>
    )
}

