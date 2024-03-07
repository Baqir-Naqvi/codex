// pages/api/convert.js


export async function GET() {
    try {
     
    } catch (error) {
        console.error('Error fetching currency conversion:', error);
        return Response.json({ status: 500, message: 'Unable to fetch currency conversion' });
    }
}
