// Invoice.js
import React, { useMemo } from "react";
import { useGetStoreStatusQuery } from "../redux/queries/maintenanceApi";

const formatKD = (n) => `${Number(n || 0).toFixed(3)} KD`;

const safe = (v, fallback = "—") => {
  const s = String(v ?? "").trim();
  return s ? s : fallback;
};

const formatDateOnly = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return String(d).substring(0, 10);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
};

const Invoice = ({ order }) => {
  const { data: store } = useGetStoreStatusQuery();
  const storeInfo = store?.[0];

  const rows = useMemo(() => (Array.isArray(order?.orderItems) ? order.orderItems : []), [order]);

  const created = useMemo(() => formatDateOnly(order?.createdAt), [order?.createdAt]);

  const subtotal = useMemo(() => {
    const v = rows.reduce(
      (total, item) => total + Number(item?.qty || 0) * Number(item?.price || 0),
      0,
    );
    return Number(v.toFixed(3));
  }, [rows]);

  const shipping = Number(order?.shippingPrice || 0);
  const discount = Number(order?.discountAmount || 0);

  const total = useMemo(() => {
    if (order?.totalPrice != null) return Number(order.totalPrice || 0);
    return Number(Math.max(subtotal - discount + shipping, 0).toFixed(3));
  }, [order?.totalPrice, subtotal, discount, shipping]);

  const getVariantLabel = (item) => {
    const color =
      item?.variantColor || item?.color || item?.variant?.color || item?.selectedColor || "";
    const size = item?.variantSize || item?.size || item?.variant?.size || item?.selectedSize || "";
    if (color && size) return `${color} / ${size}`;
    if (color) return color;
    if (size) return size;
    return "—";
  };

  const address = order?.shippingAddress || {};
  const customer = order?.user || {};

  const lineItems = useMemo(() => {
    return rows.map((item) => {
      const qty = Number(item?.qty || 0);
      const unit = Number(item?.price || 0);
      const lineTotal = Number((qty * unit).toFixed(3));
      return { item, qty, unit, lineTotal };
    });
  }, [rows]);

  return (
    <div className="bg-white text-neutral-900">
      <div className="p-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.18em] text-neutral-500 uppercase">Invoice</div>
            <div className="mt-2 text-lg font-semibold text-neutral-900 truncate">
              {safe(storeInfo?.storeName, "Store")}
            </div>

            <div className="mt-2 text-xs text-neutral-600 space-y-0.5">
              {storeInfo?.email ? <div>{storeInfo.email}</div> : null}
              {storeInfo?.phoneNumber ? <div>{storeInfo.phoneNumber}</div> : null}
            </div>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-xs text-neutral-500">Date</div>
            <div className="mt-1 text-sm font-semibold">{created}</div>

            <div className="mt-3 text-xs text-neutral-500">Order</div>
            <div className="mt-1 text-sm font-semibold">{order?._id ? `#${order._id}` : "—"}</div>
          </div>
        </div>

        <div className="my-6 h-px bg-neutral-200" />

        {/* Bill to / Ship to */}
        <div className="grid grid-cols-2 gap-6">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.18em] text-neutral-500 uppercase">Bill to</div>
            <div className="mt-2 text-sm font-semibold text-neutral-900 truncate">
              {safe(customer?.name)}
            </div>
            <div className="mt-1 text-xs text-neutral-600 truncate">{safe(customer?.email)}</div>
            <div className="mt-1 text-xs text-neutral-600 truncate">{safe(customer?.phone)}</div>
          </div>

          <div className="min-w-0 text-right">
            <div className="text-[11px] tracking-[0.18em] text-neutral-500 uppercase">Ship to</div>
            <div className="mt-2 text-xs text-neutral-700">
              <div className="truncate">
                {[
                  address?.governorate,
                  address?.city,
                  address?.block,
                  address?.street,
                  address?.house,
                ]
                  .filter(Boolean)
                  .join(", ") || "—"}
              </div>
            </div>
          </div>
        </div>

        <div className="my-6 h-px bg-neutral-200" />

        {/* Items table */}
        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] tracking-[0.12em] text-neutral-500 uppercase">
                <th className="text-left font-semibold py-2">Item</th>
                <th className="text-left font-semibold py-2">Variant</th>
                <th className="text-right font-semibold py-2">Qty</th>
                <th className="text-right font-semibold py-2">Unit</th>
                <th className="text-right font-semibold py-2">Amount</th>
              </tr>
            </thead>

            <tbody className="text-neutral-900">
              {lineItems.map(({ item, qty, unit, lineTotal }, idx) => (
                <tr
                  key={item?._id || `${item?.name}-${idx}`}
                  className="border-t border-neutral-200">
                  <td className="py-3 pr-3">
                    <div className="font-semibold truncate">{safe(item?.name)}</div>
                    {(item?.sku || item?.productId) && (
                      <div className="mt-1 text-[11px] text-neutral-500">
                        {item?.sku ? `SKU: ${item.sku}` : null}
                        {item?.sku && item?.productId ? " • " : null}
                        {item?.productId ? `ID: ${item.productId}` : null}
                      </div>
                    )}
                  </td>

                  <td className="py-3 pr-3 text-neutral-700">{getVariantLabel(item)}</td>

                  <td className="py-3 text-right tabular-nums">{qty}</td>
                  <td className="py-3 text-right tabular-nums text-neutral-700">
                    {formatKD(unit)}
                  </td>
                  <td className="py-3 text-right tabular-nums font-semibold">
                    {formatKD(lineTotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="my-6 h-px bg-neutral-200" />

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full max-w-sm space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-semibold tabular-nums">{formatKD(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">
                  Discount{order?.coupon?.code ? ` (${order.coupon.code})` : ""}
                </span>
                <span className="font-semibold tabular-nums">-{formatKD(discount)}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Shipping</span>
              <span className="font-semibold tabular-nums">{formatKD(shipping)}</span>
            </div>

            <div className="h-px bg-neutral-200 my-2" />

            <div className="flex items-center justify-between">
              <span className="text-neutral-900 font-semibold">Total</span>
              <span className="text-base font-semibold tabular-nums">{formatKD(total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-[11px] text-neutral-500">
          <div className="h-px bg-neutral-200 mb-4" />
          <div className="flex items-center justify-between">
            <span>Thank you.</span>
            <span className="tabular-nums">{order?._id ? `Order #${order._id}` : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
