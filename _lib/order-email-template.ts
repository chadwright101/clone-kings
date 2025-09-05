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

  return `<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Clone Kings - Order Submission</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 1rem; color: #353535;">
    <table style="width: 100%; background-color: #FAB121;">
      <tr>
        <td>
          <h1 style="padding: 0 1rem; color: #353535">Clone Kings - New Order</h1>
        </td>
      </tr>
    </table>

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
            Address: <span style="font-weight: 200; font-style: italic;">${addressLine1}${addressLine2 ? `, ${addressLine2}` : ''}, ${city}, ${province}, ${postalCode}</span>
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
    </table>
  </body>
</html>
`;
};