import { CartItem } from "@/_types/cart-types";

interface OrderEmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
  items: CartItem[];
  totalPrice: number;
  orderNumber: string;
  recipientType: "staff" | "customer";
}

export const orderEmailTemplate = ({
  name,
  email,
  phone,
  addressLine1,
  addressLine2,
  city,
  province,
  postalCode,
  notes,
  items,
  totalPrice,
  orderNumber,
  recipientType,
}: OrderEmailTemplateProps) => {
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 0.5rem; border-bottom: 1px solid #e5e5e5;">
          <strong style="color: #353535;">${item.name}</strong>
        </td>
        <td style="padding: 0.5rem; border-bottom: 1px solid #e5e5e5; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 0.5rem; border-bottom: 1px solid #e5e5e5; text-align: right;">
          R${item.price.toFixed(2)}
        </td>
        <td style="padding: 0.5rem; border-bottom: 1px solid #e5e5e5; text-align: right;">
          R${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  const isCustomer = recipientType === "customer";
  const title = isCustomer
    ? "Clone Kings - Order Confirmation"
    : "Clone Kings - New Order";

  return `<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 1rem; color: #353535;">
    <table style="width: 100%; background-color: #FAB121;">
      <tr>
        <td>
          <div style="padding: 0.5rem 0; text-align: center;">
            <img src="/logo/clone-kings-logo-small.png" width="200" style="width:200px; max-width:200px; height:auto; display:inline-block;" alt="Clone Kings" />
          </div>
          <h1 style="padding: 0 1rem; color: #353535">${title}</h1>
          <p style="padding: 0 1rem; margin-top: -0.5rem; color: #353535; font-weight: bold;">Order Number: ${orderNumber}</p>
        </td>
      </tr>
    </table>

    ${
      isCustomer
        ? `
    <table style="width: 100%; padding: 1rem;">
      <tr>
        <td>
          <p style="font-size: 1rem; color: #353535; margin-bottom: 1.5rem;">
            Thank you for your order, ${
              name.split(" ")[0]
            }! We've received your order and will be in touch soon to confirm availability and arrange payment.
          </p>
          <h3 style="font-size: 1.25rem; color: #353535; margin-bottom: 1rem;">Payment Instructions</h3>
          <div style="background-color: #f9f9f9; border: 1px solid #e0e0e0; padding: 1rem; margin-bottom: 1.5rem; border-radius: 4px;">
            <p style="font-size: 1rem; font-weight: 500; color: #353535; margin: 0;">
              <strong>Payment Method:</strong> EFT Only<br />
              <strong>Reference:</strong> ${orderNumber}<br />
              <strong>Important:</strong> Use your order number as the payment reference. Our team will contact you with banking details once stock availability is confirmed.
            </p>
          </div>
        </td>
      </tr>
    </table>
    `
        : `
    <table style="width: 100%; padding: 1rem;">
      <tr>
        <td>
          <h3 style="font-size: 1.25rem; color: #353535; margin-bottom: 1.5rem;">Customer Details</h3>
          <p style="font-size: 1rem; margin-top: 0.5rem; font-weight: 500; color: #353535;">
            Name: <span style="font-weight: 200; font-style: italic;">${name}</span>
          </p>
          <p style="font-size: 1rem; font-weight: 500; color: #353535;">
            Email: <span style="font-weight: 200; font-style: italic;">${email}</span>
          </p>
          <p style="font-size: 1rem; font-weight: 500; color: #353535;">
            Phone: <span style="font-weight: 200; font-style: italic;">${phone}</span>
          </p>
          <p style="font-size: 1rem; font-weight: 500; color: #353535;">
            Address: <span style="font-weight: 200; font-style: italic;">${addressLine1}${
            addressLine2 ? `, ${addressLine2}` : ""
          }, ${city}, ${province}, ${postalCode}</span>
          </p>
          ${
            notes
              ? `
              <p style="font-size: 1rem; font-weight: 500; color: #353535;">
                Order Notes:
                <br />
                <span style="font-weight: 200; font-style: italic;">${notes}</span>
              </p>
              `
              : ""
          }
        </td>
      </tr>
    </table>
    `
    }
    <table style="width: 100%; padding: 1rem;">
      <tr>
        <td style="padding-top: 2rem;">
          <h3 style="font-size: 1.25rem; color: #353535; margin-bottom: 1rem;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 0.5rem; text-align: left; color: #353535;">Strain</th>
                <th style="padding: 0.5rem; text-align: center; color: #353535;">Quantity</th>
                <th style="padding: 0.5rem; text-align: right; color: #353535;">Unit Price</th>
                <th style="padding: 0.5rem; text-align: right; color: #353535;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr>
                <td colspan="3" style="padding: 1rem 0.5rem; text-align: right; font-weight: bold; color: #353535;">
                  Total:
                </td>
                <td style="padding: 1rem 0.5rem; text-align: right; font-weight: bold; color: #353535; font-size: 1.25rem;">
                  R${totalPrice.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      ${
        isCustomer
          ? `
      <tr>
        <td style="padding-top: 2rem;">
          <div style="background-color: #f9f9f9; border: 1px solid #e0e0e0; padding: 1rem; border-radius: 4px;">
            <h3 style="font-size: 1.25rem; color: #353535; margin-top: 0; margin-bottom: 1rem;">Next Steps</h3>
            <p style="font-size: 1rem; color: #353535; margin: 0.5rem 0;">
              1. We'll confirm stock availability within 24 hours<br />
              2. Once confirmed, we'll send you banking details for payment<br />
              3. Delivery takes a minimum of 14 days after payment clears<br />
              4. Use your order number <strong>${orderNumber}</strong> as your payment reference
            </p>
            <p style="font-size: 1rem; color: #353535; margin-top: 1rem; margin-bottom: 0;">
              <strong>Questions?</strong> Feel free to reply to this email.
            </p>
          </div>
        </td>
      </tr>
      `
          : ""
      }
    </table>
  </body>
</html>
`;
};
