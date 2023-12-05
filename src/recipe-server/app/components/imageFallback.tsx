import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageWithFallback({
    alt,
    src,
    ...props
}) {
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
    }, [src]);

    return (
        <Image
            alt={alt}
            onError={setError}
            src={error ? "/icons/fallbackFood.jpg" : src}
            {...props}
        />
    );
};