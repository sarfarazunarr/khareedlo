import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order.model";
import ConnectDB from "@/utils/ConnectDB";
import Product from "@/models/Product.model";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
    await ConnectDB();

    const data = await req.json();
    const { customerName, customerEmail, customerPhone, deliveryAddress, billingAddress, products, amount, paymentStatus, orderStatus, paymentMethod } = data;
    let { user_id } = data;

    if (!user_id) {
        user_id = nanoid(10);
        const isIdExist = await Order.findOne({ user_id });
        if (isIdExist) {
            user_id = nanoid(11);
        }
    }
    const order_id = nanoid(10);
    try {
        const order = new Order({
            user_id,
            order_id,
            customerName,
            customerEmail,
            customerPhone,
            deliveryAddress,
            billingAddress,
            products,
            amount,
            paymentStatus,
            orderStatus,
            paymentMethod
        });
        await order.save();

        return NextResponse.json({ success: true, data: order, user_id: user_id }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    await ConnectDB();
    const randomUserID = req.nextUrl.searchParams.get("user_id");
    const orderID = req.nextUrl.searchParams.get("orderID");
    try {
        if (randomUserID && orderID) {
            let order;
            order = await Order.findById(orderID);
            if(!order){
                order = await Order.findOne({order_id: orderID});
                if(!order){
                    return NextResponse.json({message: "Order Not Found"}, {status: 404})
                }
            }
            const products = await Product.find({ _id: { $in: order.products.map((item: { productId: string, qty: number }) => item.productId) } });
            return NextResponse.json({ success: true, data: order, products: products }, { status: 200 });
        }
        const orders = await Order.find({ user_id: randomUserID });
        return NextResponse.json({ success: true, data: orders }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}