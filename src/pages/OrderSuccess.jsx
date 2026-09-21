import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, Mail, Home, ShoppingBag } from "lucide-react";

export default function OrderSuccess() {
  const orderNumber = `BK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-icon-wrapper">
            <CheckCircle size={64} className="success-icon" />
          </div>
          
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase. Your order has been successfully placed and is being processed.</p>
          
          <div className="order-number-box">
            <span className="order-label">Order Number</span>
            <span className="order-number">{orderNumber}</span>
          </div>

          <div className="order-timeline">
            <div className="timeline-item">
              <div className="timeline-icon completed">
                <Package size={20} />
              </div>
              <div className="timeline-content">
                <strong>Order Placed</strong>
                <small>Your order has been received</small>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon pending">
                <Truck size={20} />
              </div>
              <div className="timeline-content">
                <strong>Processing</strong>
                <small>Preparing your items for shipment</small>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon pending">
                <Mail size={20} />
              </div>
              <div className="timeline-content">
                <strong>Shipped</strong>
                <small>On the way to your location</small>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon pending">
                <Home size={20} />
              </div>
              <div className="timeline-content">
                <strong>Delivered</strong>
                <small>Estimated delivery: 3-5 business days</small>
              </div>
            </div>
          </div>

          <div className="order-info">
            <div className="info-item">
              <strong>Confirmation Email</strong>
              <small>We've sent a confirmation email with your order details</small>
            </div>
            <div className="info-item">
              <strong>Payment Status</strong>
              <small className="status-success">Paid Successfully</small>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/shop" className="btn btn-outline">
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>
            <Link to="/account" className="btn btn-accent">
              View Order Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
