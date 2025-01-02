import { db } from "@vercel/postgres";

const client = await db.connect();

async function listInvoices() {
    return await client.sql`
        SELECT invoices.amount, customers.name
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        WHERE invoices.amount = 666;
    `;
}

async function listRevenues() {
    return await client.sql`
        SELECT *
        FROM revenue;
    `;
}

export async function GET() {
    try {
        const returnedInvoices = await listInvoices();
        const returnedRevenues = await listRevenues();
        return Response.json({ returnedInvoices, returnedRevenues });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
