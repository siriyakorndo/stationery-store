import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  // Define the path to your JSON file
  const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'product.json');

  try {
    // Read the content of the JSON file
    const data = await fs.readFile(filePath, 'utf-8');
    
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    
    // Return the content as JSON
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ message: 'Error reading file' }, { status: 500 });
  }
}
