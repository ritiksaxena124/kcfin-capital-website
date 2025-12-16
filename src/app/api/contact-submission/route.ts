import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const response = await fetch('https://script.google.com/macros/s/AKfycbz2HFWqZ1IBHFuHgwKkiz8xb4TaDvizxBr9q-cGcoXQ9AxVJXoIUZiIgF2M_OVZA5AYQg/exec', {
            method: 'POST',
            body: JSON.stringify(body)
        })
        console.log('Response from sheet', response.formData)
        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: 'failed' })
        }
    } catch (error) {
        console.error("Google Sheet Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to save data" },
            { status: 500 }
        );
    }
}
