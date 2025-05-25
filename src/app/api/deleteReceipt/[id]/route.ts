import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const rawId = url.pathname.split('/').pop() || '';
  const id = decodeURIComponent(rawId);

  const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'receipt.json');

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    let receipts = JSON.parse(data);

    if (!Array.isArray(receipts)) {
      return NextResponse.json({ error: 'Data format is incorrect' }, { status: 500 });
    }

    console.log('Deleting receipt with id:', id);

    const updatedReceipts = receipts.filter(item => item.id.toString() !== id.toString());

    await fs.writeFile(filePath, JSON.stringify(updatedReceipts, null, 2));

    return NextResponse.json({ message: 'Receipt deleted successfully' });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Failed to delete receipt', error: error }, { status: 500 });
  }
}
