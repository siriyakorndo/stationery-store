import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
  // Define the path to your JSON file
  const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'receipt.json');

  // Extract the query parameters from the request URL
  const url = new URL(req.url);
  const id = url.searchParams.get('id'); // Get the 'id' query parameter

  try {
    // Read the content of the JSON file
    const data = await fs.readFile(filePath, 'utf-8');
    
    // Parse the JSON data
    const receipts = JSON.parse(data);
    
    // If 'id' is provided, filter receipts by that ID
    if (id) {

      const receipt = receipts.find((receipt: { id: string }) => receipt.id === id);
      
      if (!receipt) {
        return NextResponse.json({ message: 'Receipt not found' }, { status: 404 });
      }

      return NextResponse.json(receipt); // Return the single receipt object
    }

    // If no ID is provided, return all receipts
    return NextResponse.json(receipts);
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ message: 'Error reading file' }, { status: 500 });
  }
}
