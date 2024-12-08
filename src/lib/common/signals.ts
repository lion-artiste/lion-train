import type { Signal } from "@prisma/client";

export const saveSignal = async (code: string, value: string | null) => {

    let newSignal: Signal | null = await fetch("/api/public/signal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            code,
            value,
        })
    }).then((response) => response.json()).catch( () => null);

    return newSignal;

}