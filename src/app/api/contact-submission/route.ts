import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const sheetUrl = process.env.SHEET_URL || '';

        const response = await fetch(sheetUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })

        const sheetResponse = await response.json();

        if (response.ok && sheetResponse.result === 'success') {
            return NextResponse.json({ success: true, sheetMessage: sheetResponse.result });
        } else {
            // Log the specific error message returned by the Apps Script catch block
            console.error("Sheet API Error:", sheetResponse.error || 'Unknown error');
            return NextResponse.json({
                success: 'failed',
                message: sheetResponse.error || 'Data saving failed on the sheet side'
            }, { status: 500 }) // Use a non-200 status for failure
        }
    } catch (error) {
        console.error("Google Sheet Fetch Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to save data due to network or parsing error" },
            { status: 500 }
        );
    }
}