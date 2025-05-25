import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body as JSON
    const { id, products } = await req.json();

    // Define the path to your JSON file
    const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'receipt.json');

    // Read the current content of the JSON file
    const data = await fs.readFile(filePath, 'utf-8');
    const receipts = JSON.parse(data);

    // Determine if the ID is provided or generate a new one
    const newReceiptId = id;

    // Check if the ID already exists
    const existingReceipt = receipts.find((receipt: { id: string; }) => receipt.id === newReceiptId);
    if (existingReceipt) {
      return NextResponse.json({ message: 'Receipt ID already exists' }, { status: 400 });
    }

    // Create a new receipt with the provided or generated ID and the received products
    const newReceipt = {
      id: newReceiptId,
      products
    };

    // Add the new receipt to the receipts array
    receipts.push(newReceipt);

    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(receipts, null, 2));

    return NextResponse.json({ message: 'Receipts added successfully', receiptsId: newReceiptId });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Failed to add receipt' }, { status: 500 });
  }
}
