import React, { useMemo, useState } from "react";
import BillingPanel from "./BillingPanel";
import AccountsPanel from "./AccountsPanel";

// ===== Styles =====
const styles = `
:root { --border:#d1d5db; --muted:#6b7280; --ink:#111827; --accent:#2563eb; --paper:#fff; }
* { box-sizing: border-box; }
body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial; background:#f3f4f6; }
.container { max-width: 1000px; margin: 24px auto; padding: 16px; }
.card { background: var(--paper); border:1px solid var(--border); border-radius: 12px; padding: 16px; }
header { display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px; }
h1 { font-size: 20px; margin:0; }
.muted { color: var(--muted); font-size: 12px; }
.tabs { display:flex; gap:8px; margin: 6px 0 16px; flex-wrap: wrap; }
.tab { padding:8px 12px; border:1px solid var(--border); border-radius:8px; background:#fff; cursor:pointer; font-size:14px; }
.tab.active { border-color: var(--accent); color:white; background: var(--accent); }
label { font-size:12px; color: var(--muted); display:block; margin-bottom:6px; }
input, select, textarea { font-size:14px; width:100%; padding:10px 12px; border:1px solid var(--border); border-radius:8px; background:#fff; }
textarea { resize: vertical; min-height: 76px; }
.row { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
.row-3 { display:grid; grid-template-columns: 1fr 1fr 1fr; gap:12px; }
.row-4 { display:grid; grid-template-columns: 1.3fr .9fr .9fr .9fr; gap:12px; }
.stack { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
.btn { padding:10px 14px; border:1px solid var(--border); background:white; border-radius:8px; cursor:pointer; }
.btn.primary { background: var(--accent); color:white; border-color: var(--accent); }
.btn.warn { border-color:#ef4444; color:#ef4444; }
table { width:100%; border-collapse: collapse; }
th, td { border-bottom:1px solid var(--border); padding:8px; text-align:left; vertical-align: top; }
th { font-size:12px; color:var(--muted); font-weight:600; }
.center { text-align:center; }
hr.sep { border:none; border-top:1px solid var(--border); margin: 14px 0; }
.small { font-size:12px; color: var(--muted); }
`;

const defaultCompany = {
  name: "P.KARTHIKEYAN STEEL",
  city: "Thiruvarur",
  state: "Tamil Nadu",
  stateCode: "33",
  gstin: "33AEFSR7230F1ZC",
  banks: [
    {
      id: 1,
      bankName: "TAMILNAD MERCANTILE BANK LTD",
      branch: "SRINIVASAN NAGAR",
      ifsc: "TMBL0000510",
      account: "610701054050002",
      isDefault: true,
    },
  ],
};

export default function App() {
  const [tab, setTab] = useState("billing");
  const [company] = useState(defaultCompany);

  const defaultBank = useMemo(() => {
    return company.banks?.find((b) => b.isDefault) || company.banks?.[0] || null;
  }, [company.banks]);

  return (
    <div className="container">
      <style>{styles}</style>

      <div className="card">
        <header>
          <h1>Steel Billing + Inventory</h1>
        </header>

        <div className="tabs">
          <button
            className={`tab ${tab === "billing" ? "active" : ""}`}
            onClick={() => setTab("billing")}
          >
            BILLING
          </button>
          <button className={`tab ${tab === "accounts" ? "active" : ""}`} onClick={() => setTab("accounts")}>
            Accounts
          </button>
          
        </div>
      </div>

      {tab === "billing" && (
        <BillingPanel company={company} defaultBank={defaultBank} />
      )}
      {tab === "accounts" && <AccountsPanel />}
    </div>
  );
}
