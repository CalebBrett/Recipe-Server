"use client";

import { useForm, SubmitHandler } from 'react-hook-form';

export default function ImageUpload({ name }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit: SubmitHandler = async (data) => {
        const formData = new FormData();
        formData.append('files', data.files);

        await fetch('../api/imageUpload', {
            method: 'POST',
            body: formData,
        });

        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="file" />
            <input type="submit" value="Confirm Edit" className="submitButton" />
        </form>
    );
}