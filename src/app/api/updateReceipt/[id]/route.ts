import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function PATCH(req: NextRequest) {
  // Extract ID from URL
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract ID from the pathname

  // Define the path to your JSON file
  const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'receipt.json');

  try {
    // Read the content of the JSON file
    const data = await fs.readFile(filePath, 'utf-8');
    let receipts;

    try {
      receipts = JSON.parse(data);
    } catch (jsonError) {
      return NextResponse.json({ error: 'Invalid JSON format in file' }, { status: 500 });
    }

    // Ensure receipts is an array
    if (!Array.isArray(receipts)) {
      return NextResponse.json({ error: 'Data format is incorrect' }, { status: 500 });
    }

    // Find the receipt to update
    const receiptIndex = receipts.findIndex((item: { id: string }) => item.id === id);
    if (receiptIndex === -1) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });
    }

    // Parse the request body for updates
    const requestBody = await req.json();
    const updatedReceipt = { ...receipts[receiptIndex], ...requestBody };

    // Update the receipt in the array
    receipts[receiptIndex] = updatedReceipt;

    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(receipts, null, 2));

    // return NextResponse.json({ message: 'Receipt updated successfully', receipt: updatedReceipt });
    return NextResponse.json({ message: 'Receipt updated successfully' });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Failed to update receipt', error: error }, { status: 500 });
  }
}
